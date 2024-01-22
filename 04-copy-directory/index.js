const fs = require('fs');
const path = require('path');

const folderSourceName = 'files';
const folderToCopyName = 'files-copy';
const pathBase = __dirname;
const pathSource = path.join(pathBase, folderSourceName);
const pathToCopy = path.join(pathBase, folderToCopyName);

fs.mkdir(pathToCopy, { recursive: true }, (err) =>{
  if (err) throw err;
});

fs.readdir(pathSource, function (err, files) {
  if(err) throw err;
  files.forEach((elm) => {
    const sourceItemPath = path.join(pathSource, elm);
    const destinationItemPath = path.join(pathToCopy, elm);
    fs.copyFile(sourceItemPath, destinationItemPath, err => {
      if(err) throw err;
    });
  });
});