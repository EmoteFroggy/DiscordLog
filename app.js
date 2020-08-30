const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const log = require('./log.js');
const current_date = moment().format("DD-MM-YYYY");


if (!token){
    return log.err('No token given, please add a bot token in the config.json');
}

client.on('ready', () => {
    log.ready(`Currently in ${client.guilds.cache.size} server(s) | Current Log File: ${current_date}.txt`);
});


client.on('message', msg => {
    if (msg.attachments.size > 1 || msg.author.bot || msg.content == "" || msg.content.length > maxsize)
        return;
    let logged_message = '('+moment().format("DD-MM-YYYY HH:mm:ss")+') '+msg.author.tag+' - '+msg.content.replace(/(\r\n|\n|\r)/gm, " ");
    log.msg(logged_message);
    if (makefile)
        fs.appendFile(current_date+'.txt', logged_message+'\n', function(err){ if(err) throw err; });
});


client.on('warn', (msg) => { if (msg.includes('authentication')) { log.warn(msg) } });
client.on('error', (err) => log.err(err));
client.on('disconnect', () => log.log('disconnected from discord'));


client.login(process.env.token);
