# Discord-Bot

[![CI](https://github.com/Racer159/discord-bot/actions/workflows/main.yml/badge.svg)](https://github.com/Racer159/discord-bot/actions/workflows/main.yml)

A Discord bot written in TypeScript for use with you and your friends.

## Configuration

Configuration is located in the `config/` dirrectory and can be changed according to the `config` docs [here](https://www.npmjs.com/package/config).

```js
{
    // The token to be used by your Discord bot
    "DISCORDTOKEN": "",
    // The giphy token to lookup and translate gifs
    "GIPHYTOKEN": "",
    // The nutritionix token to lookup calorie information
    "NUTRITIONIXTOKEN": "",
    // The wolfram alpha token to lookup wolfram information
    "WOLFRAMTOKEN": "",
    // The name to which your bot will respond in the chat
    "BOTNAME": "bot",
    // The language your bot uses with the `say` command (more available here: https://funtranslations.com/api/)
    "FUNTRANSLATIONSLANGUAGE": "valspeak",
    // The response the bot gives when it gets rate limited by an API
    "RATELIMITRESPONSE": "I don t know what you're talkin' about my dude! Get back to me in an hour!"
}
```

## Building

Building the bot is simple.  From the root folder, just run the following:

```bash
$ npm install
$ npm run build
```

## Running

After you have successfully built the bot, you can run it using the following:

```bash
$ npm start
```

## Linting

If you make changes to the bot, linting can be ran with the following:

```bash
$ npm run lint
```

## Note

This bot has some NSFW features.  If you are concerned about this please review the code and fork if necessary for your use case.
