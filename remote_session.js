const { Client, RemoteAuth } = require('whatsapp-web.js');
const dotenv = require('dotenv');
dotenv.config();

const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { getSuggestions } = require('./text_prompt');




// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

// Load the session data
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    console.log("store initialized")
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });    
    console.log("client declared")
    client.initialize();
    console.log("client initialized")
    client.on('ready', () => {
        console.log('Client is ready!');
        client.getChats().then((chats) => {
            const notes_group = chats.filter((chat) => chat.name === 'Notes')
            console.log(notes_group);
            // if(notes_group[0].name==='Notes'){
            //     client.sendMessage(notes_group[0].id._serialized, "Test Message")
            // }
    
        });
    });
});
 