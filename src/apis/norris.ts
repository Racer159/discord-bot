import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { ChuckNorrisResponse } from '../types/response.js';

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function norris(): Promise<string>{
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');

    if (response.ok) {
      const data = (await response.json()) as ChuckNorrisResponse;
      return data.value;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Chuck Norris API', e);
  }
}
