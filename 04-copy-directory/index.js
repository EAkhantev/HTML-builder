const fs = require('fs');
const fsp = require('fs/promises')
const path = require('path');

const folderSourceName = 'files';
const folderToCopyName = 'files-copy';
const pathBase = __dirname;
const pathSource = path.join(pathBase, folderSourceName);
const pathToCopy = path.join(pathBase, folderToCopyName);

async function copyDir(source, destination) {
  await fsp.rmdir(destination, { recursive: true });
  await fsp.mkdir(destination, { recursive: true });
  const listFiles = await fsp.readdir(source);

  for (let id = 0; id < listFiles.length; id++) {
    const item = listFiles[id];
    const itemSourcePath = path.join(source, item);
    const itemDestinationPath = path.join(destination, item);
    await fsp.copyFile(itemSourcePath, itemDestinationPath);
  }
}

copyDir(pathSource, pathToCopy);