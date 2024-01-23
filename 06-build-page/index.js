const fs = require("fs");
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
const pathAssetsFolder = path.join(pathBase, folderNameAssets);

const pathIndexFile = path.join(pathProjectFolder, outputMarkdownName);
const pathStyleFile = path.join(pathProjectFolder, outputStyleName);
const pathAssetsDir = path.join(pathProjectFolder, folderNameAssets);

fs.mkdir(pathProjectFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

// create index.html
fs.readFile(pathTemplate, "utf-8", (err, templateData) => {
  if (err) throw err;
  let templateContent = templateData;
 
  fs.readdir(pathComponentsFolder, function (err, files) {
    if (err) throw err;
    files.forEach((elm) => {
      const itemExtention = path.extname(elm);
      const itemName = elm.split(".")[0];
      if (itemExtention === ".html") {
        const pathItem = path.join(pathComponentsFolder, elm);
 
        fs.readFile(pathItem, "utf-8", (err, data) => {
          if (err) throw err;
          templateContent = templateContent.replace(`{{${itemName}}}`, data);
          fs.writeFile(pathIndexFile, templateContent, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});

// create styles
fs.open(pathStyleFile, 'w', function (err) {
  if (err) throw err;
});

fs.readdir(pathStylesFolder, function (err, files) {
  if(err) throw err;
  files.forEach((elm) => {
    const itemExtention = path.extname(elm);
    if (itemExtention === '.css') {
      const pathItem = path.join(pathStylesFolder, elm);

      fs.readFile(pathItem, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(pathStyleFile, data + '\n', (err) => {
          if (err) throw err;
        });
      });
    }
  });
});

// assets
function copyAssets(dirOrigin, dirCopy) {
  fs.readdir(dirOrigin, {withFileTypes: true}, (err, files) => {
    if(err) throw err;
    files.forEach((file) => {
      if(!file.isFile()) {
        fs.stat(path.join(dirCopy, file.name), err => {
          if(err) {
            fs.mkdir(path.join(dirCopy, file.name), err => {
              if(err) throw err;
            });
            copyAssets(path.join(dirOrigin, file.name), path.join(dirCopy, file.name));
          } else {
            copyAssets(path.join(dirOrigin, file.name), path.join(dirCopy, file.name));
          }
        });
      } else {
        fs.copyFile(path.join(dirOrigin, file.name), path.join(dirCopy, file.name), err =>{
          if(err) throw err;
        });
      }
    });
  });
}

copyAssets(pathAssetsFolder, pathAssetsDir);

fs.stat(path.join(pathAssetsDir), err => {
  if(err) {
    fs.mkdir(pathAssetsDir, err => {
      if(err) throw err;
    });
    copyAssets(pathAssetsFolder, pathAssetsDir);
  } else {
    copyAssets(pathAssetsFolder, pathAssetsDir);
  }
});