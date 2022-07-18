const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Math.floor(Math.random() * 99999999) + " - " + file.originalname)
    }

})

const filefilter = (req, file, cb) => {
    console.log(`mimetype =`)
    console.log(file.mimetype)
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb({ message: 'Unsupported file format' }, false)
    }
    
}

const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 3000000 },
    fileFilter: filefilter,
})

module.exports = uploadMiddleware;