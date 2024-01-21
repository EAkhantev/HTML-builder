const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const fileName = 'text.txt';
const pathFolder = __dirname;
const fullPathFile = path.join(pathFolder, fileName);


fs.open(fullPathFile, 'w', function (err) {
  if (err) throw err;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('What\'s up with it, Vanilla face?');

  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Bye bye');
      rl.close();
      return;
    };

    fs.appendFile(fullPathFile, input + '\n', (err) => {
      if (err) throw err;
    });
  });

  rl.on('SIGINT', () => {
    console.log('Bye bye');
    rl.close();
  });

});