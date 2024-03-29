import config from 'config';

const BOTNAME = config.get<string>('BOTNAME');
const USERIDREGEX = new RegExp("^[0-9]{18}$");

export function lunch(): string {
  const preText = ['Get yourself some', 'Try some', 'Why not some', 'How about', 'Try', 'You should get some'];
  const lunchOptions = ['salad', 'pizza', 'sushi', 'liquid lunch', 'cheesesteaks', 'korean', 'mexican', 'chinese', 'vietnamese', 'italian', 'fast food', 'deli sandwiches'];
  return preText[Math.floor(Math.random() * preText.length)] + ' ' + lunchOptions[Math.floor(Math.random() * lunchOptions.length)] + '!';
}

export function insult(tokens: string[], userId: string): string {
  let targetName = '';
  if (tokens.length > 0) {
    if (USERIDREGEX.test(tokens[0])) {
      targetName = '<@' + tokens[0] + '>';
    } else if (tokens.indexOf('jesus') > -1 || tokens.indexOf('christ') > -1 || tokens.indexOf('god') > -1) {
      targetName = '<@' + userId + '>';
    } else {
      targetName = tokens.map(token => token.charAt(0).toUpperCase() + token.slice(1)).join(' ');
    }
  } else {
    targetName = '<@' + userId + '>';
  }

  const groupOne = ['lazy', 'stupid', 'insecure', 'idiotic', 'slimy',
    'slutty', 'smelly', 'pompous', 'communist', 'dicknose', 'pie-eating',
    'racist', 'elitist', 'white trash', 'drug-loving', 'butterface',
    'tone deaf', 'ugly', 'creepy'];
  const groupTwo = ['douche', 'ass', 'turd', 'rectum', 'butt', 'cock',
    'shit', 'crotch', 'bitch', 'turd', 'prick', 'slut', 'taint',
    'fuck', 'dick', 'boner', 'shart', 'nut', 'sphincter'];
  const groupThree = ['pilot', 'canoe', 'captain', 'pirate',
    'hammer', 'knob', 'box', 'jockey', 'nazi', 'waffle',
    'goblin', 'blossum', 'biscuit', 'clown', 'socket', 'monster',
    'hound', 'dragon', 'balloon'];

  const one = groupOne[Math.floor(Math.random() * groupOne.length)];
  const two = groupTwo[Math.floor(Math.random() * groupTwo.length)];
  const three = groupThree[Math.floor(Math.random() * groupThree.length)];

  return targetName + ' is a ' + one + ' ' + two + ' ' + three + '!';
}

export function decide(tokens: string[]): string {
  const orIndex = tokens.lastIndexOf('or');

  if (orIndex > 0) {
    const thing1 = tokens.splice(orIndex).splice(1).join(' ');
    const thing2 = tokens.join(' ');

    if (Math.floor(Math.random() * 2)) {
      return thing1;
    } else {
      return thing2;
    }
  } else {
    return 'What kind of decision is that!';
  }
}

export function eightball(): string {
  const eightBallOpts = [ 'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Do nOt count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful' ];
  return eightBallOpts[Math.floor(Math.random() * eightBallOpts.length)];
}

export function help(): string {
  return 'Ask me any of the following using `' + BOTNAME + '` followed by:\n\n```'
          + 'lunch [me]\ncalories <food>\nwhat is <term>\ndefine <term>\nhelp\nsay <phrase>\ngif [me] <phrase>\ntranslate <phrase>\nspace weather\n'
          + 'metar [me] <airport code>\ninsult <name>\nrandom dog|cat|fox\nfortune\ncowsay <phrase>\nping\ndecide <thing1> or <thing2>\nxkcd\neight ball\nnorris```\nπ'; // short_url
}
