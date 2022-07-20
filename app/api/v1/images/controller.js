const { createImage, deleteImage } = require('../../../services/mongoose/images')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const result = await createImage(req);
       
        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const delImage = async (req, res, next) => {
    try {
        const result = await deleteImage();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, delImage }
