const Categories = require('./model')


// Create categories
const create = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await Categories.create({ name })

        res.status(201).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan daftar categories
const index = async (req, res, next) => {
    try {
        const result = await Categories.find().select('_id name');
        res.status(200).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

// Menampilkan category berdasarkan id
const find = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Categories.findById({ _id: id }).select(`_id name`)
        res.status(200).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

// Edit Categori berdasarkan ID
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await Categories.findByIdAndUpdate({ _id: id}, { name }, { new: true, runValidators: true });
        res.status(200).json({
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

// Hapus categori berdasarkan ID
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Categories.findByIdAndRemove(id)
        res.status(200).json({
            data: result,
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { create, index, find, update, destroy }