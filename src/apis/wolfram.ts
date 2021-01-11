import request = require('request-promise');
import config = require('config');

const WOLFRAMTOKEN = config.get<string>('WOLFRAMTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function search(tokens: string[]): Promise<string> {
  try {
    const response = await request('http://api.wolframalpha.com/v1/result?appid=' + WOLFRAMTOKEN + '&i=' + escape(tokens.join('+')));

    return response;
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the Wolfram API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}