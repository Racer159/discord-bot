import { FetchError } from 'node-fetch';

export function handleError(api: string, e: any): string {
  console.log(e);

  let errText: string | undefined = 'Check the logs for more information';

  if (e.code !== undefined) {
    errText = (e as FetchError).code;
  } else if (e.statusText !== undefined) {
    errText = (e as Response).statusText;
  }

  return 'An error with the ' + api + ' occurred. ' + errText;
}
