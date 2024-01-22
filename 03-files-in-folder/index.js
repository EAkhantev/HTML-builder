const fs = require('fs');
const path = require('path');

const folderName = 'secret-folder';
const pathFolder = __dirname;
const fullPath = path.join(pathFolder, folderName);

fs.readdir(fullPath, {withFileTypes: true}, function (err, files) {
  if (err) throw err;
  files.forEach((elm) => {

    if (elm.isFile()) {
      const itemFileName = elm.name;
      const itemFilePath = path.join(fullPath, itemFileName);
      fs.stat(itemFilePath, (err, stats) => {
        if (err) throw err;
        const itemName = itemFileName.split('.')[0];
        const itemExtension = itemFileName.split('.')[1];
        const itemSize = stats.size;

        const itemInfo = `${itemName} - ${itemExtension} - ${itemSize} Bytes`;
        console.log(itemInfo);
      });
    }
  });
});