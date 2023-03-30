const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'upload');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

var upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
     if (file.mimetype == "application/json") {
       cb(null, true);
     } else {
       cb(null, false);
       return cb(new Error('Only .json format allowed!'));
     }
   }
 });

module.exports = multer(upload);