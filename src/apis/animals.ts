import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { RandomCatJSONResponse, RandomDogJSONResponse, RandomFoxJSONResponse } from '../types/response.js';

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function dog(): Promise<string> {
  try {
    const response = await fetch('https://random.dog/woof.json');

    if (response.ok) {
      const data = (await response.json()) as RandomDogJSONResponse;
      return data.url;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Random Dog API', e);
  }
}

export async function cat(): Promise<string> {
  try {
    const response = await fetch('https://aws.random.cat/meow');

    if (response.ok) {
      const data = (await response.json()) as RandomCatJSONResponse;
      return data.file;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Random Cat API', e);
  }
}

export async function fox(): Promise<string> {
  try {
    const response = await fetch('https://randomfox.ca/floof/');

    if (response.ok) {
      const data = (await response.json()) as RandomFoxJSONResponse;
      return data.image;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Random Fox API', e);
  }
}
