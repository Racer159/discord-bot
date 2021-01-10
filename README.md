# Discord-Bot
A Discord bot written in TypeScript for use with you and your friends.

## Configuration

Configuration is located in the `config/` dirrectory and can be changed according to the `config` docs [here](https://www.npmjs.com/package/config).

```json
{
    "DISCORDTOKEN": "", // The token to be used by your Discord bot
    "GIPHYTOKEN": "", // The giphy token to lookup and translate gifs
    "NUTRITIONIXTOKEN": "", // The nutritionix token to lookup calorie information
    "BOTNAME": "bot", // The name to which your bot will respond in the chat
    "FUNTRANSLATIONSLANGUAGE": "valspeak", // The language your bot uses with the say command (more available here: https://funtranslations.com/api/)
    "RATELIMITRESPONSE": "I don t know what you're talkin' about my dude! Get back to me in an hour!" // The response the bot gives when it gets rate limited by an API
}
```

## Building

Building the bot is simple.  From the root folder, just run the following:

```bash
$ npm install
$ npm run-script build
```

## Running

After you have successfully built the bot, you can run it using the following:

```bash
$ npm run-script run
```
