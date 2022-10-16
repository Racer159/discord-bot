import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { UrbanDictionaryResponse } from '../types/response.js';
import * as utilities from '../util/utils.js';

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function urban(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(tokens.join('+')));

    if (response.ok) {
      const data = (await response.json()) as UrbanDictionaryResponse;
      if (data.list && data.list.length) {
        utilities.shuffle(data.list);
          let definition = data.list[0].definition;

          if (definition.length > 450) {
              definition = definition.substring(0, 439) + ' (cont) ...';
          }

          return definition;
      } else {
        return 'I don\'t know what that is.';
      }
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Urban Dictionary API', e);
  }
}
