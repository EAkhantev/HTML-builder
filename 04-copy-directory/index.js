const fs = require('fs');
const fsp = require('fs/promises')
const path = require('path');

const folderSourceName = 'files';
const folderToCopyName = 'files-copy';
const pathBase = __dirname;
const pathSource = path.join(pathBase, folderSourceName);
const pathToCopy = path.join(pathBase, folderToCopyName);

async function removeDir(directory) {
  try {
    await fsp.rmdir(directory, { recursive: true });
  } catch (err) {
    console.log(err.message);
  }
}

async function createDir(destination) {
  try {
    await fsp.mkdir(destination, { recursive: true });
  } catch (err) {
    console.log(err.message);
  }
}

function copyDir(source, destination) {
  fs.readdir(source, function (err, files) {
    if(err) throw err;
    files.forEach((elm) => {
      const sourceItemPath = path.join(source, elm);
      const destinationItemPath = path.join(destination, elm);
      fs.copyFile(sourceItemPath, destinationItemPath, (err) => {
        if(err) throw err;
      });
    });
  });
}

(
  async () => {
    await removeDir(pathToCopy);
    await createDir(pathToCopy);
    copyDir(pathSource, pathToCopy);
  }
)();
