import request = require('request-promise');
import config = require('config');

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function xkcd(): Promise<string> {
  try {
    const response = JSON.parse(await request('https://xkcd.com/info.0.json'));

    if (response.img) {
      return response.img;
    } else {
      return 'Sorry, couldn\'t find anything!';
    }
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the XKCD API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}