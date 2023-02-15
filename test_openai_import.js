const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { getSuggestions } = require('./text_prompt');



getSuggestions('how many moons does earth has?').then((result) =>
console.log(result.data.choices));




