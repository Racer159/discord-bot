import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { XKCDJSONResponse } from '../types/response.js';

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function xkcd(): Promise<string> {
  try {
    const response = await fetch('https://xkcd.com/info.0.json');

    if (response.ok) {
      const data = (await response.json()) as XKCDJSONResponse;
      return data.img;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('XKCD API', e);
  }
}
