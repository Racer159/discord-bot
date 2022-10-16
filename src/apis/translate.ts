import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { FunTranslationResponse } from '../types/response.js';

const FUNTRANSLATIONSLANGUAGE = config.get<string>('FUNTRANSLATIONSLANGUAGE');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function say(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.funtranslations.com/translate/' + FUNTRANSLATIONSLANGUAGE + '.json?text=' + encodeURIComponent(tokens.join(' ')));

    if (response.ok) {
      const data = (await response.json()) as FunTranslationResponse;
      return data.contents.translated;
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Fun Translations API', e);
  }
}
