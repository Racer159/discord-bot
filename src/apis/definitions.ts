import request = require('request-promise');
import _ = require('underscore');
import config = require('config');

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function urban(tokens: string[]): Promise<string> {
  try {
    const response = JSON.parse(await request('http://api.urbandictionary.com/v0/define?term=' + escape(tokens.join('+'))));

    console.log(response);
    if (response.list && response.list.length) {
        const list = _.shuffle(response.list);
        let definition = list[0].definition;

        if (definition.length > 450) {
            definition = definition.substring(0, 439) + ' (cont) ...';
        }

        return definition;
    } else {
      return 'I don\'t know what that is.';
    }
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
        return RATELIMITRESPONSE;
    } else {
        return 'An error with the Urban Dictionary API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}
