//packages
const fs = require('fs-extra');
const dirs = require('./Modules/readDir.js');
const readline = require('readline');

const INPUT = 'Input/';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fileArr = [];
//populating fileArr with filepaths from readDir.js module
dirs.readDir(INPUT, fileArr);

/**
 * renameFile function will iterate over an array of file file paths
 * and rename each one. Called by getShowName.
**/
renameFile = (name, arr, fileType) => {
  let i = 1;
  arr.forEach(file => {
    if(i < 10)
      newName = INPUT + name + 'E0' + i + '.' + fileType;
    else
      newName = INPUT + name + 'E' + i + '.' + fileType;
    console.log('Renaming: ' + file + ' to File: ' + newName);
    fs.rename(file, newName);
    i++;
  });
}

/**
 * grabs user input from cmd line, mkv or mp4 and then passes response to
 * getShowName() function.
**/
(getFileType = () => {
  rl.question('Filetype: (eg. mkv or mp4)', (type) => {
    if(type != '') {
      type = type.toLowerCase();
      getShowName(type);
    } else {
      console.log('Filetype cannot be null');
      getFileType();
    }
  });
})();

/**
 * grabs user input (show name and season number) then passes response,
 * fileArr with all filepaths and finally the fileType to renameFile function
 * called by the first userinput
**/
getShowName = (fileType) => {
  rl.question('Show Name and Season (eg. Legion S01): ', (answer) => {
    if(answer != '') {
      renameFile(answer, fileArr, fileType);
      rl.close();
    } else {
        console.log('Show name cannot be blank');
        getShowName(fileType);
    }
  });
}
