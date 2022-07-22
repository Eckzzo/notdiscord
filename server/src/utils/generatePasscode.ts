const spongeBobCharacters = [
  'spongebob',
  'patrick',
  'sandy',
  'squidward',
  'mrkrabs',
  'gary',
  'plankton',
  'mspuff',
  'barnacleboy',
  'mermaidman',
  'dutchman',
  'jellyfish',
  'karen',
  'pearl',
  'patchy',
  'larry',
  'potty',
  'narrator',
  'neptune',
  'perch',
];

function getMultipleRandom(arr: string[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function generatePasscode() {
  const randomNumToString = Math.floor(Math.random() * 100000).toString();
  const passcodeWords = [...getMultipleRandom(spongeBobCharacters, 3), randomNumToString];
  return passcodeWords.reduce((prev, curr) => {
    return `${prev}-${curr}`;
  });
}

export { generatePasscode };
