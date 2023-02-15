const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');



// Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
// let sessionData;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});



client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        const notes_group = chats.filter((chat) => chat.name === 'Notes')
        console.log(notes_group);
        client.sendMessage(notes_group[0].id._serialized, "pongy pong!")
    });
});

client.initialize();


client.on('message', message => {
    console.log("message arrived", message);
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 

