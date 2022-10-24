const multer = require('multer');

//They are both functions that determine where the file should be stored
const productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageproduct')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const profilestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageuser')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (res, file, cd) => {
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    allowedMimeTypes.includes(file.mimetype) ? cd(null, true) : cd(null, false)
}


const uploadproduct = multer({ storage: productstorage, fileFilter: fileFilter });

const uploadprofile = multer({ storage: profilestorage, fileFilter: fileFilter });


module.exports = { uploadproduct, uploadprofile };