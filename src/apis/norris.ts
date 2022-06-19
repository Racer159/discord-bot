import request = require('request-promise');
import config = require('config');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function norris(): Promise<string>{
  try {
    const response = JSON.parse(await request('https://api.chucknorris.io/jokes/random'));
    if (response.value) {
      return response.value;
    } else {
      return 'Sorry, there was an error recieving norris joke. No results found.';
    }

  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the Norris API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}