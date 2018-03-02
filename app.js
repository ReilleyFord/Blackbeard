//packages
const fs = require('fs-extra');
const dirs = require('./Modules/readDir.js');
const readline = require('readline');

const INPUT = 'Input/';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Create input folder -- program will error out later as input folder will be empty
if(!fs.existsSync(INPUT)) {
  fs.mkdirSync(INPUT);
}

let fileArr = [];
//populating fileArr with filepaths from readDir.js module
dirs.readDir(INPUT, fileArr);

/**
 * grabs user input from cmd line, mkv or mp4 and then passes response to
 * getShowName() function.
**/
(getFileType = () => {
  rl.question('Filetype (eg. mkv or mp4): ', (type) => {
    type = type.trim().toLowerCase();
    if(type != '' && !type.includes(' ')) {
      getShowName(type);
    } else {
      console.log('Filetype cannot be blank and must not contain spaces');
      getFileType();
    }
  });
})();

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
    console.log('Renaming: ' + file + ' => ' + newName);
    fs.rename(file, newName);
    i++;
  });
}

/**
 * grabs user input (show name and season number) then passes response,
 * fileArr with all filepaths and finally the fileType to renameFile function
 * called by the first userinput
**/
getShowName = (fileType) => {
  rl.question('Show Name and Season (eg. Legion S01): ', (answer) => {
    answer = answer.trim();
    if(answer != '') {
      renameFile(answer, fileArr, fileType);
      rl.close();
    } else {
        console.log('Show name cannot be blank');
        getShowName(fileType);
    }
  });
}
