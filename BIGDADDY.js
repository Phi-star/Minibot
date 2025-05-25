/* PhistarBotInc - Complete WhatsApp Bot with Telegram Integration */
const fs = require('fs');
const path = require('path');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    Browsers,
    downloadContentFromMessage,
    getContentType,
    jidDecode,
    proto
} = require('@whiskeysockets/baileys'); 
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');
const FileType = require('file-type');
const pm2 = require('pm2');
const { parsePhoneNumber } = require('libphonenumber-js');
const formattedNumber = parsePhoneNumber("+1234567890").formatInternational();
const PhoneNumber = require('awesome-phonenumber');
const BigDaddyHandler = require("./BigDaddy 1.js");
const axios = require('axios');

// ==================== Configuration ====================
const config = {
    telegramToken: '7817029270:AAF_CLC-ZuPZAF-81r8J13OZMj_so0LaNz8',
    ownerId: '6300694007',
    sessionDir: path.join(__dirname, 'phistar_sessions'),
    mediaDir: path.join(__dirname, 'phistar-media'),
    prefix: '!',
    maxFileSize: 100 * 1024 * 1024, // 100MB
    reconnectDelay: 5000,
    browser: Browsers.windows('Firefox')
};

// ==================== Store Implementation ====================
const store = {
    messages: new Map(),
    contacts: new Map(),
    groupMetadata: new Map(),
    
    loadMessage: async (jid, id) => {
        return store.messages.get(`${jid}:${id}`) || null;
    },
    
    bind: (ev) => {
        ev.on('messages.upsert', ({ messages }) => {
            messages.forEach(msg => {
                store.messages.set(`${msg.key.remoteJid}:${msg.key.id}`, msg);
            });
        });
    }
};

// ==================== Main Bot Implementation ====================
const bot = new TelegramBot(config.telegramToken, { polling: true });
const activePhistarBots = new Map();
const commandCache = new NodeCache({ stdTTL: 600 });
let isFirstLog = true;

async function PhistarBotIncStart(phoneNumber, telegramChatId = null) {
    // Baileys version check
    try {
        const { version, isLatest } = await fetchLatestBaileysVersion();
        if (isFirstLog) {
            console.log(`Using Baileys version: ${version} (Latest: ${isLatest})`);
            isFirstLog = false;
        }
    } catch (e) {
        console.log('Could not fetch latest Baileys version', e);
    }

    // Check if session exists and is active
    const sessionPath = path.join(config.sessionDir, `session_${phoneNumber}`);
    if (!fs.existsSync(sessionPath)) {
        fs.mkdirSync(sessionPath, { recursive: true });
    }

    if (activePhistarBots.has(phoneNumber)) {
        const existingConn = activePhistarBots.get(phoneNumber).PhistarBotInc;
        if (existingConn && existingConn.user) {
            if (telegramChatId) {
                bot.sendMessage(telegramChatId, `⚠️ ${phoneNumber} is already connected to Big Daddy V1mini use /delpair to disconnect!`);
            }
            return existingConn;
        } else {
            activePhistarBots.delete(phoneNumber);
        }
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const msgRetryCounterCache = new NodeCache();
    
    const PhistarBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: config.browser,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
        getMessage: async (key) => {
            return store.loadMessage(key.remoteJid, key.id);
        }
    });

    // Store the active instance with new connection flag
    activePhistarBots.set(phoneNumber, { 
        PhistarBotInc, 
        telegramChatId,
        isNewConnection: true 
    });
    store.bind(PhistarBotInc.ev);

    // Connection update handler
    PhistarBotInc.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        const botData = activePhistarBots.get(phoneNumber);

        if (connection === 'open') {
            await saveCreds();
            
            // Only send success message for new connections
            if (telegramChatId && botData.isNewConnection) {
                bot.sendMessage(telegramChatId, `
╭⭑━━━➤ PHISTAR BOT INC
┣ ◁️ Connected successfully to
┣ ◁️ ${phoneNumber} 
╰━━━━━━━━━━━━━━━━━━━╯
`);
                botData.isNewConnection = false;
                activePhistarBots.set(phoneNumber, botData);
            }
        } 
        else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            
            if ([
                DisconnectReason.connectionClosed,
                DisconnectReason.connectionLost,
                DisconnectReason.connectionReplaced,
                DisconnectReason.restartRequired,
                DisconnectReason.timedOut
            ].includes(reason)) {
                setTimeout(() => PhistarBotIncStart(phoneNumber, telegramChatId), config.reconnectDelay);
            } 
            else if (reason === DisconnectReason.loggedOut || reason === DisconnectReason.badSession) {
                if (fs.existsSync(sessionPath)) {
                    fs.rmSync(sessionPath, { recursive: true });
                }
                if (telegramChatId) {
                    bot.sendMessage(telegramChatId, `⚠️ Session for ${phoneNumber} was removed (reason: ${DisconnectReason[reason]})`);
                }
                activePhistarBots.delete(phoneNumber);
            }
        }
    });

    // Pairing logic
    if (!PhistarBotInc.authState.creds.registered && telegramChatId) {
        const pairingTimeout = setTimeout(async () => {
            try {
                const code = await PhistarBotInc.requestPairingCode(phoneNumber);
                const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
                bot.sendMessage(telegramChatId, `Pairing code for ${phoneNumber}:\n${formattedCode}`);
            } catch (err) {
                console.error('Pairing error:', err);
            }
        }, 3000);

        // Clean up pairing timeout if connection succeeds quickly
        PhistarBotInc.ev.on('connection.update', (update) => {
            if (update.connection === 'open') {
                clearTimeout(pairingTimeout);
            }
        });
    }

    PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        if (!mek.message) return;

        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
            ? mek.message.ephemeralMessage.message
            : mek.message;

        if (mek.key.remoteJid === 'status@broadcast') return;
        if (!PhistarBotInc.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;

        // IMPORTANT FIX HERE:
        const currentBotNumber = PhistarBotInc.user.id.split(':')[0];

        // Only proceed if the session is active
        if (!activePhistarBots.has(currentBotNumber)) return;

        const m = smsg(PhistarBotInc, mek, store);
        BigDaddyHandler(PhistarBotInc, m, chatUpdate, store);
    } catch (err) {
        console.log('Message processing error:', err);
    }
});

    // Creds update handler
    PhistarBotInc.ev.on('creds.update', saveCreds);

    // Utility functions
    PhistarBotInc.decodeJid = (jid = '') => {
    if (!jid) return jid;
    const decoded = jidDecode(jid);
    if (decoded?.user && decoded?.server) {
        return `${decoded.user}@${decoded.server === 'lid' ? 's.whatsapp.net' : decoded.server}`;
    }
    return jid;
};
  
    PhistarBotInc.getName = (jid, withoutContact = false) => {
        const id = PhistarBotInc.decodeJid(jid);
        withoutContact = PhistarBotInc.withoutContact || withoutContact;
        let v;
        
        if (id.endsWith("@g.us")) {
            return new Promise(async (resolve) => {
                v = store.contacts.get(id) || {};
                if (!(v.name || v.subject)) {
                    v = await PhistarBotInc.groupMetadata(id) || {};
                }
                const number = id.replace('@s.whatsapp.net', '').replace(/\D/g, '');
                try {
                    const formatted = number ? parsePhoneNumber('+' + number).formatInternational() : 'Unknown';
                    resolve(v.name || v.subject || formatted);
                } catch {
                    resolve(v.name || v.subject || '+' + number);
                }
            });
        } else {
            v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === PhistarBotInc.decodeJid(PhistarBotInc.user.id) ?
                PhistarBotInc.user :
                (store.contacts.get(id) || {});
            
            const number = jid.replace('@s.whatsapp.net', '').replace(/\D/g, '');
            try {
                const formatted = number ? parsePhoneNumber('+' + number).formatInternational() : 'Unknown';
                return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || formatted;
            } catch {
                return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || '+' + number;
            }
        }
    };

    PhistarBotInc.public = true;
    PhistarBotInc.serializeM = (m) => smsg(PhistarBotInc, m, store);

    // Media and message functions
    PhistarBotInc.sendText = (jid, text, quoted = '', options) => 
        PhistarBotInc.sendMessage(jid, { text: text, ...options }, { quoted });

    PhistarBotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        try {
            const quoted = message.msg ? message.msg : message;
            const mime = (message.msg || message).mimetype || '';
            const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await downloadContentFromMessage(quoted, messageType);
            
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            const type = await FileType.fromBuffer(buffer);
            if (!fs.existsSync(config.mediaDir)) {
                fs.mkdirSync(config.mediaDir, { recursive: true });
            }
            
            const trueFileName = attachExtension 
                ? path.join(config.mediaDir, `${filename}.${type.ext}`) 
                : path.join(config.mediaDir, filename);
                
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        } catch (error) {
            console.error('Media download error:', error);
            throw error;
        }
    };

    PhistarBotInc.getFile = async (PATH, save) => {
        try {
            let data = await getBuffer(PATH);
            if (data.length > config.maxFileSize) {
                throw new Error(`File size exceeds ${config.maxFileSize} bytes limit`);
            }
            
            const type = await FileType.fromBuffer(data) || {
                mime: 'application/octet-stream',
                ext: '.bin'
            };
            
            const filename = path.join(__dirname, 'temp', `${Date.now()}.${type.ext}`);
            if (save) {
                if (!fs.existsSync(path.dirname(filename))) {
                    fs.mkdirSync(path.dirname(filename), { recursive: true });
                }
                await fs.promises.writeFile(filename, data);
            }
            
            return {
                filename,
                size: data.length,
                ...type,
                data
            };
        } catch (error) {
            console.error('File processing error:', error);
            throw error;
        }
    };
    
    PhistarBotInc.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        try {
            const type = await PhistarBotInc.getFile(path, true);
            let { data: file } = type;
            
            const opt = { filename };
            if (quoted) opt.quoted = quoted;
            if (!type) options.asDocument = true;

            let mtype = '';
            let mimetype = type.mime;
            let convert;

            if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) {
                mtype = 'sticker';
            } else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) {
                mtype = 'image';
            } else if (/video/.test(type.mime)) {
                mtype = 'video';
            } else if (/audio/.test(type.mime)) {
                convert = await (ptt ? toPTT : toAudio)(file, type.ext);
                file = convert.data;
                mtype = 'audio';
                mimetype = 'audio/ogg; codecs=opus';
            } else {
                mtype = 'document';
            }

            if (options.asDocument) mtype = 'document';

            const cleanOptions = { ...options };
            ['asSticker', 'asLocation', 'asVideo', 'asDocument', 'asImage'].forEach(prop => delete cleanOptions[prop]);

            const message = { 
                ...cleanOptions, 
                caption, 
                ptt, 
                [mtype]: { url: type.filename }, 
                mimetype 
            };

            try {
                return await PhistarBotInc.sendMessage(jid, message, { ...opt, ...cleanOptions });
            } catch (e) {
                console.error('Send file error:', e);
                return await PhistarBotInc.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...cleanOptions });
            }
        } catch (error) {
            console.error('File send error:', error);
            throw error;
        }
    };

    PhistarBotInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => 
        PhistarBotInc.sendMessage(jid, { 
            text: text, 
            mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), 
            ...options 
        }, { quoted });

    PhistarBotInc.downloadMediaMessage = async (message) => {
        try {
            const mime = (message.msg || message).mimetype || '';
            const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await downloadContentFromMessage(message, messageType);
            
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            return buffer;
        } catch (error) {
            console.error('Media download error:', error);
            throw error;
        }
    };

    return PhistarBotInc;
}

function smsg(PhistarBotInc, m, store) {
    if (!m) return m;
    let M = proto.WebMessageInfo;

    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');

        // FIXED: Proper sender detection
        const actualSender = m.isGroup
            ? m.key.participant || m.participant || ''
            : m.key.remoteJid;

        m.sender = PhistarBotInc.decodeJid(m.fromMe ? PhistarBotInc.user.id : actualSender);
        if (m.isGroup) {
            m.participant = PhistarBotInc.decodeJid(actualSender);
        }
    }

    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = m.mtype === 'viewOnceMessage'
            ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
            : m.message[m.mtype];

        m.body =
            m.message.conversation ||
            m.msg.caption ||
            m.msg.text ||
            (m.mtype === 'listResponseMessage' && m.msg.singleSelectReply.selectedRowId) ||
            (m.mtype === 'buttonsResponseMessage' && m.msg.selectedButtonId) ||
            (m.mtype === 'viewOnceMessage' && m.msg.caption) ||
            m.text;

        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];

        if (m.msg.caption) {
            m.caption = m.msg.caption;
        }

        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage || null;
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = quoted[type];

            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = m.quoted[type];
            }

            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id?.startsWith('BAE5') && m.quoted.id.length === 16;
            m.quoted.sender = PhistarBotInc.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === PhistarBotInc.decodeJid(PhistarBotInc.user.id);
            m.quoted.text =
                m.quoted.text ||
                m.quoted.caption ||
                m.quoted.conversation ||
                m.quoted.contentText ||
                m.quoted.selectedDisplayText ||
                m.quoted.title ||
                '';
            m.quoted.mentionedJid = m.msg.contextInfo?.mentionedJid || [];

            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false;
                let q = await store.loadMessage(m.chat, m.quoted.id, PhistarBotInc);
                return smsg(PhistarBotInc, q, store);
            };

            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id,
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {}),
            });

            m.quoted.delete = () => PhistarBotInc.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
                PhistarBotInc.copyNForward(jid, vM, forceForward, options);
            m.quoted.download = () => PhistarBotInc.downloadMediaMessage(m.quoted);
        }
    }

    if (m.msg?.url) {
        m.download = () => PhistarBotInc.downloadMediaMessage(m.msg);
    }

    m.text =
        m.msg?.text ||
        m.msg?.caption ||
        m.message?.conversation ||
        m.msg?.contentText ||
        m.msg?.selectedDisplayText ||
        m.msg?.title ||
        '';

    m.reply = (text, chatId = m.chat, options = {}) =>
        Buffer.isBuffer(text)
            ? PhistarBotInc.sendMedia(chatId, text, 'file', '', m, { ...options })
            : PhistarBotInc.sendText(chatId, text, m, { ...options });

    m.copy = () => smsg(PhistarBotInc, M.fromObject(M.toObject(m)));

    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
        PhistarBotInc.copyNForward(jid, m, forceForward, options);

    return m;
}
// Telegram Commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send messages with video and channel buttons
  bot.sendPhoto(chatId, "https://files.catbox.moe/p0gguf.jpg", {
    caption: `
╭⭑━━━➤ ʙɪɢ ᴅᴀᴅᴅʏ ᴠ1 ᴍɪɴɪ
┣ ◁️  💥 ᴄᴏᴍᴍᴀɴᴅꜱ:
┣ ◁️  /pair <ᴘᴀɪʀ ɴᴜᴍʙᴇʀ ᴛᴏ ʙᴏᴛ>
┣ ◁️  /delpair <ᴅᴇʟᴇᴛᴇ ᴘᴀɪʀᴇᴅ ɴᴜᴍʙᴇʀ>
┣ ◁️  /listpair <ɴᴏᴛ ᴀᴜᴛʜᴏʀɪᴢᴇᴅ>
╰━━━━━━━━━━━━━━━━━━━╯
`,
    reply_markup: {
      inline_keyboard: [
        [{ text: "Channel", url: "https://t.me/phistar" }],
      ],
    },
  });
});

bot.onText(/\/pair(?:\s+(\d+))?/, async (msg, match) => {
    const phoneNumber = match[1];
    const chatId = msg.chat.id;

    if (!phoneNumber) {
        return bot.sendMessage(chatId, `ℹ️ To connect a WhatsApp account, use:\n\n/pair 2349128019###\n\nReplace 2349128019### with your full phone number (without +).`);
    }

    if (!/^\d+$/.test(phoneNumber)) {
        return bot.sendMessage(chatId, '⚠️ Invalid phone number format. Use numbers only like 2349128019###');
    }

    if (activePhistarBots.has(phoneNumber)) {
        const existingConn = activePhistarBots.get(phoneNumber).PhistarBotInc;
        if (existingConn && existingConn.user) {
            return bot.sendMessage(chatId, `⚠️ ${phoneNumber} is already connected to Big Daddy V1mini. Use /delpair to disconnect first!`);
        } else {
            activePhistarBots.delete(phoneNumber);
        }
    }

    bot.sendMessage(chatId, `🔄 Initializing PhistarBotInc for ${phoneNumber}...`);

    try {
        await PhistarBotIncStart(phoneNumber, chatId);
    } catch (err) {
        console.error('Pair command error:', err);
        bot.sendMessage(chatId, `❌ Failed to create session: ${err.message}`);
    }
});

bot.onText(/\/delpair(?:\s+(\d+))?/, async (msg, match) => {
    const phoneNumber = match[1];
    const chatId = msg.chat.id;

    if (!phoneNumber) {
        return bot.sendMessage(chatId, `ℹ️ To disconnect a WhatsApp account, use:\n\n/delpair 2349128019###\n\nReplace 2349128019### with your full phone number (without +).`);
    }

    if (!/^\d+$/.test(phoneNumber)) {
        return bot.sendMessage(chatId, '⚠️ Invalid phone number format. Use numbers only like 2349128019###');
    }

    try {
        if (activePhistarBots.has(phoneNumber)) {
            activePhistarBots.get(phoneNumber).PhistarBotInc.ws.close();
            activePhistarBots.delete(phoneNumber);
        }

        const sessionPath = path.join(config.sessionDir, `session_${phoneNumber}`);
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            bot.sendMessage(chatId, `✅ Deleted PhistarBotInc session for ${phoneNumber}`);
        } else {
            bot.sendMessage(chatId, `⚠️ No session found for ${phoneNumber}`);
        }
    } catch (err) {
        console.error('Delpair command error:', err);
        bot.sendMessage(chatId, `❌ Failed to delete session: ${err.message}`);
    }
});

bot.onText(/\/listpair/, (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.from.id.toString() !== config.ownerId) {
        return bot.sendMessage(chatId, '❌ Unauthorized: This command is owner-only');
    }

    try {
        let response = '📱 Active PhistarBotInc Sessions:\n';
        activePhistarBots.forEach((session, number) => {
            response += `- ${number} (Chat ID: ${session.telegramChatId || 'N/A'})\n`;
        });
        bot.sendMessage(chatId, response || 'No active sessions');
    } catch (err) {
        console.error('Listpair command error:', err);
        bot.sendMessage(chatId, '❌ Failed to list sessions');
    }
});

// Initialize existing sessions on startup
async function initializePhistarBots() {
    try {
        if (!fs.existsSync(config.sessionDir)) {
            fs.mkdirSync(config.sessionDir, { recursive: true });
            console.log('Session directory created');
            return;
        }

        const sessions = fs.readdirSync(config.sessionDir)
            .filter(dir => dir.startsWith('session_'))
            .map(dir => dir.replace('session_', ''));
        
        if (sessions.length === 0) {
            console.log('No existing sessions found');
            return;
        }

        console.log(`Found ${sessions.length} session(s) to initialize`);
        
        const connectionPromises = sessions.map(number => 
            PhistarBotIncStart(number)
                .then(() => console.log(`✅ Auto-connected to ${number}`))
                .catch(() => {}) // Silent fail
        );

        await Promise.all(connectionPromises);
        
    } catch (error) {
        console.error('Initialization error:', error.message);
    }
}

// Start the system with minimal logging
initializePhistarBots().then(() => {
    console.log('🚀 PhistarBotInc ready');
});

// Optimized file watcher
const file = require.resolve(__filename);
fs.watchFile(file, { interval: 1000 }, () => {
    fs.unwatchFile(file);
    console.log('🔄 Reloading...');
    delete require.cache[file];
    require(file);
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err.message);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err.message);
    process.exit(1);
});