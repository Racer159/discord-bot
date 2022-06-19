import request = require('request-promise');
import config = require('config');

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function metar(tokens: string[]): Promise<string> {
  try {
    if (tokens.length > 0) {
      const airportCode = tokens[0].toUpperCase();

      return await request('http://tgftp.nws.noaa.gov/data/observations/metar/stations/' + escape(airportCode) + '.TXT');
    } else {
      return 'Please provide a valid airport code.';
    }
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 404) {
      return 'Sorry, that is an invalid airport code.';
    } else if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the NOAA METAR API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}

export async function space(): Promise<string> {
  try {
    const response = JSON.parse(await request('http://services.swpc.noaa.gov/products/alerts.json'));

    if (response.length) {
      return response[0].message;
    } else {
      return 'Sorry, there was an error recieving space weather. No results found.';
    }
  } catch (err: any) {
    console.error(err);
    if (err.statusCode === 429) {
      return RATELIMITRESPONSE;
    } else {
      return 'An error with the NOAA Space Weather API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
    }
  }
}
