require('dotenv').config();
const { Client, Intents } = require('discord.js',);

const fs = require('fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let RAids = [];

const regexRA = /221\d{4}-006$/

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.includes('!verificar')) {
        let matches = regexRA.exec(message.content)
        if (matches !== null) {
            message.reply('Aluno Verificado!');
            message.member.roles.add('955885679240417321');
            RAids.push(message.content)
            console.log(RAids)
        } else {
            message.member.roles.cache.has('955885679240417321');
            message.reply(`${message.author} Você já foi verificado!`)
        }
    }

    //remover !verificar dos itens do array
    RAids.forEach(function(item, index) {
        RAids[index] = item.replace('!verificar ', '');
    });

    let raJson = JSON.stringify(RAids);
    //salvar JSON em arquivo com fs
    fs.writeFile('RAids.json', raJson, 'utf8', function(err) {
        if (err) throw err;
        console.log('RAids.json saved');
    });

    console.log(raJson);

    //lê arquivo JSON
fs.readFile('RAids.json', 'utf8', function (err, data) {
    if (err) throw err;
    console.log('RAids.json read');
    console.log(data);
    });
});

client.login(process.env.token);