const fs = require("fs");
const fsp = require('fs/promises');
const path = require("path");
 
const projectFolderName = "project-dist";
 
const folderNameAssets = "assets";
const folderNameComponents = "components";
const folderNameStyles = "styles";
 
const outputStyleName = "style.css";
const outputMarkdownName = "index.html";
const templateName = "template.html";
 
const pathBase = __dirname;
const pathProjectFolder = path.join(pathBase, projectFolderName);
const pathTemplate = path.join(pathBase, templateName);
const pathComponentsFolder = path.join(pathBase, folderNameComponents);
const pathStylesFolder = path.join(pathBase, folderNameStyles);
const pathAssetsSource = path.join(pathBase, folderNameAssets);

const pathIndexFile = path.join(pathProjectFolder, outputMarkdownName);
const pathStyleFile = path.join(pathProjectFolder, outputStyleName);
const pathAssetsDestination = path.join(pathProjectFolder, folderNameAssets);

async function createProjectDir (pathToDir) {
  await fsp.rmdir(pathToDir, { recursive: true });
  await fsp.mkdir(pathToDir, { recursive: true });
}

// create index.html
async function createHtml(pathHtml, pathTemplate, pathComponent) {
  let templateContent = await fsp.readFile(pathTemplate, 'utf-8');
  const listComponents = await fsp.readdir(pathComponent);
  
  for (let id = 0; id < listComponents.length; id++) {
    const item = listComponents[id];
    const itemExtention = path.extname(item);
    const itemPath = path.join(pathComponent, item);
    const itemName = item.split(".")[0];
    const itemContent = await fsp.readFile(itemPath, 'utf-8');

    if (itemExtention === '.html') {
      templateContent = templateContent.replace(`{{${itemName}}}`, itemContent);
    }
  }
  
  await fsp.open(pathHtml, 'w');
  fsp.appendFile(pathHtml, templateContent);
}

// Create style.css
async function mergeStyles(source, destination) {
  await fsp.open(destination, 'w');
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

// Copy assets folder 
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

async function copyAssets(source, destination) {
  await fsp.rmdir(destination, { recursive: true });
  await fsp.mkdir(destination, { recursive: true });
  const listFolders = await fsp.readdir(source);

  for (let id = 0; id < listFolders.length; id++) {
    const folder = listFolders[id];
    const folderSourcePath = path.join(source, folder);
    const folderDestinationPath = path.join(destination, folder);
    copyDir(folderSourcePath, folderDestinationPath);
  }
}

// Run main function
async function main() {
  await createProjectDir(pathProjectFolder);
  createHtml(pathIndexFile, pathTemplate, pathComponentsFolder);
  mergeStyles(pathStylesFolder, pathStyleFile);
  copyAssets(pathAssetsSource, pathAssetsDestination); 
}

main();