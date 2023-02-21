const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getSuggestions } = require('./text_prompt');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});



client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        // const notes_group = chats.filter((chat) => chat.name === 'Notes')
        // console.log(notes_group);
        // if(notes_group[0].name==='Notes'){
        //     client.sendMessage(notes_group[0].id._serialized, "Test Message")
        // }
        
    });
});

client.initialize();
client.on('message_create', message => {
    if(message.includes('ms/')) {
        console.log("attempting to search!")
        const searchQur = message.split("ms/")[1];
        if(searchQur){
            getSuggestions(searchQur).then((result) =>
            console.log(result.data.choices));
        }
    }
});
 

