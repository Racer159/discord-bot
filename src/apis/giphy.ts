import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { MultiResponse, SingleResponse } from 'giphy-api';
import * as utilities from '../util/utils.js';

const GIPHYTOKEN = config.get<string>('GIPHYTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function gif(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(tokens.join('+')) + '&api_key=' + GIPHYTOKEN);

    if (response.ok) {
      const data = (await response.json()) as MultiResponse;
      if (data.data.length) {
        utilities.shuffle(data.data);
        const id = data.data[0].id;
        const imageUrl = 'http://media3.giphy.com/media/' + id + '/giphy.gif';

        return imageUrl;
      } else {
        return 'Sorry, couldn\'t find any gifs!';
      }
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Giphy API', e);
  }
}

export async function translate(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?s=' + encodeURIComponent(tokens.join('+')) + '&api_key=' + GIPHYTOKEN);

    if (response.ok) {
      const data = (await response.json()) as SingleResponse;
      if (data.data.images) {
        return data.data.images.downsized_large.url;
      } else {
        return 'Sorry, couldn\'t find anything!';
      }
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Giphy API', e);
  }
}
