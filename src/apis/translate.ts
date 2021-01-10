import request = require('request-promise');
import _ = require('underscore');
import config = require('config');

const FUNTRANSLATIONSLANGUAGE = config.get<string>('FUNTRANSLATIONSLANGUAGE');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function say(tokens: string[]): Promise<string> {
  try {
    const response = JSON.parse(await request('http://api.funtranslations.com/translate/' + FUNTRANSLATIONSLANGUAGE + '.json?text=' + escape(tokens.join('+'))));

    return response.contents.translated;
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
        return RATELIMITRESPONSE;
    } else {
        return 'An error with the Fun Translations API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}
