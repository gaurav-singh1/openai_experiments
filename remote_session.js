console.log(">>>>>>>>>>>>>>>>>>>> running the main file now <<<<<<<<<<<<<<<<<<<<")
const { Client, RemoteAuth } = require('whatsapp-web.js');
const dotenv = require('dotenv');
dotenv.config();

const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { getSuggestions } = require('./text_prompt');

const notes_group_id = "120363039263622605@g.us"

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
    });
    client.on('message_create', message => {
        console.log("new message created!!")
        if (message.body.includes('ms/')) {
            console.log("attempting to search!")
            const searchQur = message.body.split("ms/")[1];
            if (searchQur) {
                console.log("your search query is = ", searchQur)
                getSuggestions(searchQur).then((result) => {
                    console.log(result.data.choices)
                    client.sendMessage(notes_group_id, result.data.choices[0].text)
                }
                );
            }
        }
    });
});


