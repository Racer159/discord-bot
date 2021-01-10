import request = require('request-promise');
import _ = require('underscore');
import config = require('config');

const GIPHYTOKEN = config.get<string>('GIPHYTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function gif(tokens: string[]): Promise<string> {
  try {
    const response = JSON.parse(await request('http://api.giphy.com/v1/gifs/search?q=' + escape(tokens.join('+')) + '&api_key=' + GIPHYTOKEN));

    if (response.data.length) {
      const data = _.shuffle(response.data);
      const id = data[0].id;
      const imageUrl = 'http://media3.giphy.com/media/' + id + '/giphy.gif';

      return imageUrl;
    } else {
      return 'Sorry, couldn\'t find anything!';
    }
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the Giphy API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}

export async function translate(tokens: string[]): Promise<string> {
  try {
    const response = JSON.parse(await request('http://api.giphy.com/v1/gifs/translate?s=' + escape(tokens.join('+')) + '&api_key=' + GIPHYTOKEN));

    if (response.data.images) {
      return response.data.images.downsized_large.url;
    } else {
      return 'Sorry, couldn\'t find anything!';
    }
  } catch (err) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the Giphy API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}
