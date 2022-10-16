import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { NutritionixResponse } from '../types/response.js';

const NUTRITIONIXTOKEN = config.get<string>('NUTRITIONIXTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function calories(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.nutritionix.com/v1_1/search/' + encodeURIComponent(tokens.join('+')) +
      '?results=0%3A1&cal_min=0&cal_max=5000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=' + NUTRITIONIXTOKEN);

    if (response.ok) {
      const data = (await response.json()) as NutritionixResponse;

      if (data.hits.length) {
        const cals = data.hits[0].fields.nf_calories;

        return 'A ' + tokens.join(' ') + ' is ' + cals + ' calories.';
      } else {
        return 'Sorry, couldn\'t find anything!';
      }
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Nutritionix API', e);
  }
}
