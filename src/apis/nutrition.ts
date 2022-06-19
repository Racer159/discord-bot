import request = require('request-promise');
import _ = require('underscore');
import config = require('config');

const NUTRITIONIXTOKEN = config.get<string>('NUTRITIONIXTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function calories(tokens: string[]): Promise<string> {
  try {
    const response = JSON.parse(await request('https://api.nutritionix.com/v1_1/search/' + escape(tokens.join('+')) + '?results=0%3A1&cal_min=0&cal_max=5000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=' + NUTRITIONIXTOKEN));

    if (response.hits.length) {
      const data = _.shuffle(response.hits);
      const cals = data[0].fields.nf_calories;

      return "A " + tokens.join(' ') + " is " + cals + " calories.";
    } else {
      return 'Sorry, couldn\'t find anything!';
    }
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 429) {
        return RATELIMITRESPONSE;
    } else {
        return 'An error with the Nutritionix API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}
