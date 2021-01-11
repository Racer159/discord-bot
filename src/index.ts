// Import External Libraries
import Discord = require('discord.js');
import natural = require('natural');
import fortune = require('fortune-teller');
import cowsay = require('cowsay');
import _ = require('underscore');
import config = require('config');

// Import Internal Moduels
import words = require('./util/tokenizer');
import internal = require('./apis/internal');
import animals = require('./apis/animals');
import comics = require('./apis/comics');
import definitions = require('./apis/definitions');
import giphy = require('./apis/giphy');
import nutrition = require('./apis/nutrition');
import translate = require('./apis/translate');
import weather = require('./apis/weather');
import wolfram = require('./apis/wolfram');

// Setup the Tokenizer and Discord
const tokenizer = new natural.WordTokenizer();
const client = new Discord.Client();
const DISCORDTOKEN = config.get<string>('DISCORDTOKEN');
const BOTNAME = config.get<string>('BOTNAME');

client.on('ready', () => {
  console.log(BOTNAME + ' is ready using user: ' + client.user.username);
});

// Handle an incoming message
client.on('message', async (msg) => {
    if (msg.author.id !== client.user.id) {
        let tokens = tokenizer.tokenize(msg.content);
        let reply = '';

        tokens = _.map(tokens, function(t) { return t.toLowerCase(); });

        if (tokens.indexOf(BOTNAME) == 0) {
            console.log('processing message from: ' + msg.author.username);

            if (words.check(`${BOTNAME} ping`, tokens )) {
                reply = 'pong';
            } else if (words.check(`${BOTNAME} xkcd`, tokens )) {
                reply = await comics.xkcd();
            } else if (words.check(`${BOTNAME} eight ball`, tokens )) {
                reply = internal.eightball();
            }  else if (words.check(`${BOTNAME} what is`, tokens ) || words.check(`${BOTNAME} define`, tokens )) {
                if (tokens.length > 2 && tokens[2] === 'is') { tokens = tokens.splice(3); } else { tokens = tokens.splice(2); }
                reply = await definitions.urban(tokens);
            } else if (words.check(`${BOTNAME} gif me`, tokens ) || words.check(`${BOTNAME} gif`, tokens )) {
                if (tokens.length > 2 && tokens[2] === 'me') { tokens = tokens.splice(3); } else { tokens = tokens.splice(2); }
                reply = await giphy.gif(tokens);
            } else if (words.check(`${BOTNAME} translate`, tokens )) {
                tokens = tokens.splice(2);
                reply = await giphy.translate(tokens);
            } else if (words.check(`${BOTNAME} lunch`, tokens )) {
                reply = internal.lunch();
            } else if (words.check(`${BOTNAME} calories`, tokens )) {
                tokens = tokens.splice(2);
                reply = await nutrition.calories(tokens);
            } else if (words.check(`${BOTNAME} metar me`, tokens ) || words.check(`${BOTNAME} metar`, tokens )) {
                if (tokens.length > 2 && tokens[2] === 'me') { tokens = tokens.splice(3); } else { tokens = tokens.splice(2); }
                reply = await weather.metar(tokens);
            } else if (words.check(`${BOTNAME} space weather`, tokens )) {
                reply = await weather.space();
            } else if (words.check(`${BOTNAME} help`, tokens )) {
                reply = internal.help();
            } else if (words.check(`${BOTNAME} fortune`, tokens )) {
                reply = fortune.fortune();
            } else if (words.check(`${BOTNAME} cowsay`, tokens )) {
                tokens = tokens.splice(2);
                reply = '```' + cowsay.say({ text: tokens.join(' ') }) + '```';
            } else if (words.check(`${BOTNAME} say`, tokens )) {
                tokens = tokens.splice(2);
                reply = await translate.say(tokens);
            } else if (words.check(`${BOTNAME} wolf`, tokens )) {
                tokens = tokens.splice(2);
                reply = await wolfram.search(tokens);
            } else if (words.check(`${BOTNAME} random dog`, tokens )) {
                reply = await animals.dog();
            } else if (words.check(`${BOTNAME} random cat`, tokens )) {
                reply = await animals.cat();
            } else if (words.check(`${BOTNAME} random fox`, tokens )) {
                reply = await animals.fox();
            } else if (words.check(`${BOTNAME} insult`, tokens )) {
                tokens = tokens.splice(2);
                reply = internal.insult(tokens, msg.author.username);
            } else if (words.check(`${BOTNAME} decide`, tokens )) {
                tokens = tokens.splice(2);
                reply = internal.decide(tokens);
            } else {
                tokens = tokens.splice(1);

                const unk = ['I don\'t know what you\'re talking about.', 'Please try me again at a later time.', 
                    'I can\'t deal with you right now.', 'You have got to be kidding me with that.', 
                    'Please try \'tenisha help me\' to see what I can help you with.',
                    'You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.\nBy using this IS (which includes any device attached to this IS), you consent to the following conditions:\n\n- The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.\n- At any time, the USG may inspect and seize data stored on this IS.\n- Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG authorized purpose.\n- This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.\n- NOTICE: There is the potential that information presented and exported from the AF Portal contains FOUO or Controlled Unclassified Information (CUI). It is the responsibility of all users to ensure information extracted from the AF Portal is appropriately marked and properly safeguarded. If you are not sure of the safeguards necessary for the information, contact your functional lead or Information Security Officer.\n- Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.\n\n'
                    ];
                
                reply = unk[Math.floor(Math.random() * unk.length)];
            }
            
            msg.channel.send(reply);
        }
    }
});

client.login(DISCORDTOKEN);
