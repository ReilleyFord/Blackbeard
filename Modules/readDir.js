const nodeDir = require('node-dir');
/**
 * had this readDir function for another project, adapted for this.
 * Reads through all directories and sub directories.
 * adds mp4 and mkv file paths to the passed array.
*/
module.exports.readDir = (directory, arr) => {
  console.log('Reading Directory');
  try {
    let filePaths = nodeDir.files(directory, {sync:true});
    filePaths.forEach(file => {
      let fileExt = file.split('.').pop();
      if(fileExt == 'mkv' || fileExt == 'mp4' || fileExt == 'avi') {
        arr.push(file);
        console.log('Pushing file: ' + file);
      } else {
        console.log('Skipping: ' + file);
      }
    });
  } catch (TypeError) {
    console.error('ERROR: Empty Directory in Input');
  }
}
