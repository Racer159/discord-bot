export function lunch(): string {
    const preText = ['Get yourself some', 'Try some', 'Why not some', 'How about', 'Try', 'You should get some'];
    const lunchOptions = ['salad', 'pizza', 'sushi', 'liquid lunch', 'cheesesteaks', 'korean', 'mexican', 'chinese', 'vietnamese', 'italian', 'fast food', 'deli sandwiches'];
    return preText[Math.floor(Math.random() * preText.length)] + " " + lunchOptions[Math.floor(Math.random() * lunchOptions.length)] + "!";
}

export function insult(tokens: string[], username: string): string {
    let targetName = '';
    if (tokens.length > 0) {
        targetName = tokens.map(token => token.charAt(0).toUpperCase() + token.slice(1)).join(' ');
    } else {
        targetName = username.charAt(0).toUpperCase() + username.slice(1);
    }

    var groupOne = ['lazy', 'stupid', 'insecure', 'idiotic', 'slimy',
        'slutty', 'smelly', 'pompous', 'communist', 'dicknose', 'pie-eating',
        'racist', 'elitist', 'white trash', 'drug-loving', 'butterface',
        'tone deaf', 'ugly', 'creepy'];
    var groupTwo = ['douche', 'ass', 'turd', 'rectum', 'butt', 'cock',
        'shit', 'crotch', 'bitch', 'turd', 'prick', 'slut', 'taint',
        'fuck', 'dick', 'boner', 'shart', 'nut', 'sphincter'];
    var groupThree = ['pilot', 'canoe', 'captain', 'pirate',
        'hammer', 'knob', 'box', 'jockey', 'nazi', 'waffle',
        'goblin', 'blossum', 'biscuit', 'clown', 'socket', 'monster',
        'hound', 'dragon', 'balloon'];

    var one = groupOne[Math.floor(Math.random() * groupOne.length)];
    var two = groupTwo[Math.floor(Math.random() * groupTwo.length)];
    var three = groupThree[Math.floor(Math.random() * groupThree.length)];

    return targetName + " is a " + one + " " + two + " " + three + "!";
}

export function help(): string {
    return "Ask me any of the following using my name followed by: "
                 + "lunch [me], calories <food>, what is <term>, define <term>, help, say <phrase>, gif [me] <phrase>, translate <phrase>, space weather, "
                 + "metar [me] <airport code>, insult <name>, random [dog|cat|fox]"; // short_url
}
