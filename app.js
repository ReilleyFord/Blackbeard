const fs = require('fs-extra');
const dirs = require('./Modules/readDir.js');
const readline = require('readline');

const inputDir = 'Input/';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fileArr = [];
dirs.readDir(inputDir, fileArr);

let i = 1;
renameFile = (name, arr) => {
  arr.forEach(file => {
    if(i < 10) {
      newName = inputDir + name + 'E0' + i + '.mkv';
    }
    else {
      newName = inputDir + name + 'E' + i + '.mkv';
    }
    fs.rename(file, newName);
    i++;
  });
}

rl.question('Show Name and Season (eg. Legion S01): ', (answer) => {
  renameFile(answer, fileArr);
  rl.close();
});
