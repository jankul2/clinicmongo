const multer= require('multer');
const path= require('path');
const storage = multer.diskStorage({
    destination: path.join(path.resolve(), '/public/assets/images'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const uploadConfigration = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('invalid !imaage'))
        }
        cb(undefined, true);
    }
})
module.exports=uploadConfigration;