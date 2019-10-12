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
  getDaysHoursFromNow: date => {
    const now = Date.now();
    let timeString = '';
    // const date = new Date(yip.createdDate);
    let delta = (now - date) / 1000;
    const days = Math.floor(delta / 86400);
    timeString += days > 0 ? `${days}d ` : '';
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    timeString += hours > 0 ? `${hours}h` : '';

    if (days === 0 && hours === 0) {
      timeString = 'Just now';
    }

    return timeString;
  },
  getMonthName: monthNum => {
    switch (monthNum) {
      case 0:
        return 'January';
        break;
      case 1:
        return 'February';
        break;
      case 2:
        return 'March';
        break;
      case 3:
        return 'April';
        break;
      case 4:
        return 'May';
        break;
      case 5:
        return 'June';
        break;
      case 6:
        return 'July';
        break;
      case 7:
        return 'August';
        break;
      case 8:
        return 'September';
        break;
      case 9:
        return 'October';
        break;
      case 10:
        return 'November';
        break;
      case 11:
        return 'December';
        break;
    }
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