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
            if(notes_group[0].name==='Notes'){
                client.sendMessage(notes_group[0].id._serialized, "ms/good scifi novels over a weekend suggestions?")   
            }
        });
    });
    client.on('message_create', message => {
        console.log("message created!!")
        console.log(message)
        if (message.body.includes('ms/')) {
            console.log("attempting to search!")
            const searchQur = message.body.split("ms/")[1];
            if (searchQur) {
                console.log("your search query is = ", searchQur)
                // const sampleRespose = [
                //     {
                //       text: '\n\nThe Prime Minister of India is Narendra Modi.',
                //       index: 0,
                //       logprobs: null,
                //       finish_reason: 'stop'
                //     }
                //   ]
                // client.getChats().then((chats) => {
                //     const notes_group = chats.filter((chat) => chat.name === 'Notes')
                //     console.log("*******", notes_group);
                //     if (notes_group[0].name === 'Notes') {
                //         client.sendMessage(notes_group[0].id._serialized, sampleRespose[0].text)
                //     }
                // });
    
                getSuggestions(searchQur).then((result) => {
                    console.log(result.data.choices)
                    client.getChats().then((chats) => {
                        const notes_group = chats.filter((chat) => chat.name === 'Notes')
                        console.log("========>>>>>>>>", notes_group);
                        if (notes_group[0].name === 'Notes') {
                            client.sendMessage(notes_group[0].id._serialized, result.data.choices[0].text)
                        }
                    });
                }
                );
            }
        }
    });
});


 