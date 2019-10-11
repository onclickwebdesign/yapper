const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});

module.exports = {
  fetchGet: (url, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  s3upload: multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        let fileName = req.payload.id + '/' + Date.now().toString();
        if (file.mimetype === 'image/jpeg') {
          fileName += '.jpg';
        } else if (file.mimetype === 'image/png') {
          fileName += '.png';
        }
        cb(null, fileName);
      }
    })
  })
};