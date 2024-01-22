const fs = require('fs');
const path = require('path');

const folderNameWrite = 'project-dist';
const folderNameRead = 'styles';
const outputFileName = 'bundle.css'
const pathBase = __dirname;
const pathToWrite = path.join(pathBase, folderNameWrite);
const pathToRead = path.join(pathBase, folderNameRead);
const pathOutputFile = path.join(pathToWrite, outputFileName);

fs.open(pathOutputFile, 'w', function (err) {
  if (err) throw err;
});

fs.readdir(folderNameRead, function (err, files) {
  if(err) throw err;
  files.forEach((elm) => {
    const itemExtention = path.extname(elm);
    if (itemExtention === '.css') {
      const pathItem = path.join(pathToRead, elm);

      fs.readFile(pathItem, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(pathOutputFile, data + '\n', (err) => {
          if (err) throw err;
        });
      });
    }
  });
});