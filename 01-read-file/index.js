const fs = require('fs');
const path = require('path');

const fileName = 'text.txt';
const pathFolder = __dirname;
const readStream = fs.createReadStream(path.join(pathFolder, fileName), 'utf-8');

readStream.on('data', function (data) {
  console.log(data);
});

readStream.on('error', function (error) {
  console.log(error.message);
});