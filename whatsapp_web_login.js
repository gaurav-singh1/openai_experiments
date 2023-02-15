const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');


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
    console.log("message arrived", message);
});
 

