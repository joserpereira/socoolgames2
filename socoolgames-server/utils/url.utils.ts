import https from 'https';
const fs = require('fs');

function getFileWritableStream(filePath: any) {
  const downloadWriteStream = fs.createWriteStream(filePath);

  /* This adapter is needed because the method .pipeTo() only
  accepts an instance of WritableStream.
  */
  return new WritableStream({
    write: chunk => downloadWriteStream(chunk)
  });
}

// download the image and save to /img
function download(url: any, dest: any, cb: any) {
    let file = fs.createWriteStream(dest);
    let request = https
        .get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(cb);
            });
        })
        .on('error', function (err) {
            fs.unlink(dest); // Delete the file async if there is an error
            if (cb) cb(err.message);
        });

    request.on('error', function (err) {
        console.log(err);
    });
};

const functions = {
    download, getFileWritableStream
};

module.exports = functions;
