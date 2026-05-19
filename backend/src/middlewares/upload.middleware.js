const multer = require('multer');
const AppError = require('../utils/AppError');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/json' || file.mimetype.startsWith('text/')) {
    cb(null, true);
  } else {
    cb(new AppError('Only JSON and text files are allowed', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

exports.uploadJSON = upload.single('file');
