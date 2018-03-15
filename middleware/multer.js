const multer = require ('multer');

let memStorage = multer.memoryStorage();

let memUpload = multer({
  storage: memStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

function multerUpload (req, res, next) {
  if (!req.body.carousel ) {
    console.log('=======================');
    return next()
  }



  return memUpload.single('carousel')

}

module.exports = memUpload;
