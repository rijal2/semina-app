const { getAllTalents, getOneTalent, updateTalent, deleteTalent, createTalents } = require('../../../services/mongoose/talents')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const result = await createTalents(req)
        res.status(StatusCodes.CREATED).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result =await getOneTalent(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        
        const result = await getAllTalents(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateTalent(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteTalent(req)
        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy
}