import fetch from 'node-fetch';
import config from 'config';
import * as errors from '../util/errors.js';

const WOLFRAMTOKEN = config.get<string>('WOLFRAMTOKEN');
const RATELIMITRESPONSE = config.get<string>('RATELIMITRESPONSE');
const BOTNAME = config.get<string>('BOTNAME');

export async function search(tokens: string[]): Promise<string> {
  try {
    const response = await fetch('https://api.wolframalpha.com/v1/result?appid=' + WOLFRAMTOKEN + '&i=' + encodeURIComponent(tokens.join('+')));

    if (response.ok) {
      return response.text();
    } else if (response.status === 429) {
      return RATELIMITRESPONSE;
    } else if (await response.text() === 'Wolfram|Alpha did not understand your input') {
      return unknown();
    } else {
      throw response;
    }
  } catch (e) {
    return errors.handleError('Wolfram|Alpha API', e);
  }
}

function unknown(): string {
  const unk = [ 'I don\'t know what you\'re talking about.', 'Please try me again at a later time.', 
                'I can\'t deal with you right now.', 'You have got to be kidding me with that.', 
                'Please try \'' + BOTNAME +' help\' to see what I can help you with.',
                'You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.\nBy using this IS (which includes any device attached to this IS), you consent to the following conditions:\n\n- The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.\n- At any time, the USG may inspect and seize data stored on this IS.\n- Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG authorized purpose.\n- This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.\n- NOTICE: There is the potential that information presented and exported from the AF Portal contains FOUO or Controlled Unclassified Information (CUI). It is the responsibility of all users to ensure information extracted from the AF Portal is appropriately marked and properly safeguarded. If you are not sure of the safeguards necessary for the information, contact your functional lead or Information Security Officer.\n- Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.\n\n'
              ];
                
  return unk[Math.floor(Math.random() * unk.length)];
}
