const AWS = require('aws-sdk');

class StorageService {
  constructor() {
    this._s3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // Nama S3 bucket yang digunakan
      Key: +new Date() + meta.filename, // Nama berkas yang akan disimpan
      Body: file._data, // Berkas dalam bentuk Buffer yang akan disimpan
      ContentType: meta.headers['content-type'], // MIME Type berkas yang akan disimpan
    };

    return new Promise((resolve, reject) => {
      this._s3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
