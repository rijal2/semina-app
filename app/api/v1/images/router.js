const express = require('express');
const router = express()

const { create, delImage } = require('./controller')
const upload = require('../../../middlewares/multer')

router.post('/images', upload.single('avatar'), create );
router.delete('/images', delImage );

module.exports = router