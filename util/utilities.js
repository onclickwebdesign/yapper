const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key
});

String.prototype.hash53 = function (seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < this.length; ++i) {
    ch = this.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
  h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

module.exports = {
  getDaysHoursFromNow: date => {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return 'Illegal argument. Must be a date object.';
    }

    const now = Date.now();
    let timeString = '';
    
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
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return 'Illegal argument. Must pass an integer between 0 - 11';
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
        let fileName = req.s3Path + file.originalname.hash53();
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