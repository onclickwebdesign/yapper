const AWS = require('aws-sdk');
require('dotenv').config();

module.exports = {
  fetchGet: (url, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  s3: new AWS.S3({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key
  })
};