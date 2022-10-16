import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';
import { SpaceWeatherResponse } from '../types/response.js';

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function metar(tokens: string[]): Promise<string> {
  try {
    if (tokens.length > 0) {
      const airportCode = tokens[0].toUpperCase();
      const response = await fetch('https://tgftp.nws.noaa.gov/data/observations/metar/stations/' + encodeURIComponent(airportCode) + '.TXT');

      if (response.ok) {
        return await response.text();
      } else if (response.status === 404) {
        return 'Sorry, that is an invalid airport code.';
      } else if (response.status === 429) {
        return RATELIMITRESPONSE;
      } else {
        throw response;
      }
    } else {
      return 'Please provide a valid airport code.';
    }
  } catch (e) {
    return errors.handleError('NOAA METAR API', e);
  }
}

export async function space(): Promise<string> {
  try {
    const response = await fetch('https://services.swpc.noaa.gov/products/alerts.json');

    if (response.ok) {
      const data = (await response.json()) as Array<SpaceWeatherResponse>;
      if (data.length) {
        return data[0].message;
      } else {
        return 'Sorry, there was an error recieving space weather. No results found.';
      }
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('NOAA Space Weather API', e);
  }
}
