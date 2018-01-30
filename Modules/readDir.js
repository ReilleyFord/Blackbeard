const nodeDir = require('node-dir');
/*
  Reads through all directories and sub directories.
  adds file paths to the passed array.
*/
module.exports.readDir = (directory, arr) => {
  console.log('Reading Directory');
  try {
    let filePaths = nodeDir.files(directory, {sync:true});
    filePaths.forEach(file => {
      arr.push(file);
      console.log(file);
    });
  } catch (TypeError) {
    console.error('ERROR: Empty Directory in Input');
  }
}
