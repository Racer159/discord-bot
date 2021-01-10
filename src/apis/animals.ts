import request = require('request-promise');
import config = require('config');

const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');

export async function dog(): Promise<string> {
    try {
        const response = JSON.parse(await request('https://random.dog/woof.json?ref=apilist.fun'));

        if (response.url) {
            return response.url;
        } else {
            return 'No more dogs...  Looks like you killed them all!';
        }
    } catch (err) {
        console.error(err);
        if (err.statusCode === 429) {
            return RATELIMITRESPONSE;
        } else {
            return 'An error with the Random Dog API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
        }
    }
}

export async function cat(): Promise<string> {
    try {
        const response = JSON.parse(await request('https://aws.random.cat/meow?ref=apilist.fun'));

        if (response.file) {
            return response.file;
        } else {
            return 'No more cats...  Good.';
        }
    } catch (err) {
        console.error(err);
        if (err.statusCode === 429) {
            return RATELIMITRESPONSE;
        } else {
            return 'An error with the Random Cat API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
        }
    }
}

export async function fox(): Promise<string> {
    try {
        const response = JSON.parse(await request('https://randomfox.ca/floof/?ref=apilist.fun'));

        if (response.image) {
            return response.image;
        } else {
            return 'What happened to the foxes?  None were found...';
        }
    } catch (err) {
        console.error(err);
        if (err.statusCode === 429) {
            return RATELIMITRESPONSE;
        } else {
            return 'An error with the Random Fox API occurred. ' + (err.error ? err.error : 'Check the logs for more information');
        }
    }
}
