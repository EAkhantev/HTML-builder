const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const folderNameWrite = 'project-dist';
const folderNameRead = 'styles';
const outputFileName = 'bundle.css';
const pathBase = __dirname;
const pathToWrite = path.join(pathBase, folderNameWrite);
const pathToRead = path.join(pathBase, folderNameRead);
const pathOutputFile = path.join(pathToWrite, outputFileName);

async function mergeFiles(source, destination) {
  await fsp.open(pathOutputFile, 'w');
  const listFiles = await fsp.readdir(source);

  for (let id = 0; id < listFiles.length; id++) {
    const item = listFiles[id];
    const itemExtention = path.extname(item);
    const itemPath = path.join(source, item);
    
    if (itemExtention === '.css') {
      const itemContent = await fsp.readFile(itemPath, 'utf-8');
      await fsp.appendFile(destination, itemContent + '\n');
    }
  }
}

mergeFiles(pathToRead, pathOutputFile);