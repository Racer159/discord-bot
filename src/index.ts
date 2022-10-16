// Import External Libraries
import * as Discord from 'discord.js';
import fortune from 'fortune-teller';
import * as cowsay from 'cowsay';
import config from 'config';

// Import Internal Modules
import * as words from './util/words.js';
import * as internal from './apis/internal.js';
import * as animals from './apis/animals.js';
import * as comics from './apis/comics.js';
import * as definitions from './apis/definitions.js';
import * as giphy from './apis/giphy.js';
import * as nutrition from './apis/nutrition.js';
import * as translate from './apis/translate.js';
import * as weather from './apis/weather.js';
import * as wolfram from './apis/wolfram.js';
import * as norris from './apis/norris.js';

// Setup Discord
const client = new Discord.Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent'] });
const DISCORDTOKEN = config.get<string>('DISCORDTOKEN');
const BOTNAME = config.get<string>('BOTNAME');

client.on('ready', () => {
  console.log(BOTNAME + ' is ready using user: ' + client.user?.username);
});

// Handle an incoming message
client.on('messageCreate', async (msg) => {
  if (msg.author.id !== client.user?.id) {
    let tokens = words.tokenizer.tokenize(msg.content);
    let reply = '';

    tokens = tokens.map(function(t) { return t.toLowerCase(); });

    if (tokens[0] === BOTNAME || tokens[0] === client.user?.id) {
      console.log('processing message from: ' + msg.author.username);
      tokens = tokens.splice(1);

      if (words.check(`ping`, tokens )) {
        reply = 'pong';
      } else if (words.check(`xkcd`, tokens )) {
        reply = await comics.xkcd();
      } else if (words.check(`eight ball`, tokens )) {
        reply = internal.eightball();
      } else if (words.check(`what is`, tokens ) || words.check(`define`, tokens )) {
        if (tokens.length > 1 && tokens[1] === 'is') { tokens = tokens.splice(2); } else { tokens = tokens.splice(1); }
        reply = await definitions.urban(tokens);
      } else if (words.check(`gif me`, tokens ) || words.check(`gif`, tokens )) {
        if (tokens.length > 1 && tokens[1] === 'me') { tokens = tokens.splice(2); } else { tokens = tokens.splice(1); }
        reply = await giphy.gif(tokens);
      } else if (words.check(`translate`, tokens )) {
        tokens = tokens.splice(1);
        reply = await giphy.translate(tokens);
      } else if (words.check(`lunch`, tokens )) {
        reply = internal.lunch();
      } else if (words.check(`calories`, tokens )) {
        tokens = tokens.splice(1);
        reply = await nutrition.calories(tokens);
      } else if (words.check(`metar me`, tokens ) || words.check(`metar`, tokens )) {
        if (tokens.length > 1 && tokens[1] === 'me') { tokens = tokens.splice(2); } else { tokens = tokens.splice(1); }
        reply = await weather.metar(tokens);
      } else if (words.check(`space weather`, tokens )) {
        reply = await weather.space();
      } else if (words.check(`help`, tokens )) {
        reply = internal.help();
      } else if (words.check(`fortune`, tokens )) {
        reply = fortune.fortune();
      } else if (words.check(`cowsay`, tokens )) {
        tokens = tokens.splice(1);
        reply = '```' + cowsay.say({ text: tokens.join(' ') }) + '```';
      } else if (words.check(`say`, tokens )) {
        tokens = tokens.splice(1);
        reply = await translate.say(tokens);
      } else if (words.check(`random dog`, tokens )) {
        reply = await animals.dog();
      } else if (words.check(`random cat`, tokens )) {
        reply = await animals.cat();
      } else if (words.check(`random fox`, tokens )) {
        reply = await animals.fox();
      } else if (words.check(`norris`, tokens )){
        reply = await norris.norris();
      } else if (words.check(`insult`, tokens )) {
        tokens = tokens.splice(1);
        reply = internal.insult(tokens, msg.author.id);
      } else if (words.check(`decide`, tokens )) {
        tokens = tokens.splice(1);
        reply = internal.decide(tokens);
      }  else {
        reply = await wolfram.search(tokens);
      }

      msg.channel.send(reply);
    }
  }
});

client.login(DISCORDTOKEN);
