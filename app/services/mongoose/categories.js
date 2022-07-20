// Import model
const Categories = require('../../api/v1/categories/model')

const { NotFoundError, BadRequestError } = require('../../errors')

const getAllCategories = async () => {
    const result = await Categories.find()

    return result
}

const createCategories = async (req) => {
    const { name } = req.body;

    const check = await Categories.findOne({ name })

    if(check) throw new BadRequestError('Nama Kategori sudah ada')

    const result = await Categories.create({ name })
    return result
}

const getOneCategories = async (req) => {
    const { id } = req.params;

    const result = await Categories.findOne({ _id: id });

    if(!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return result
}

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // Pengecekan berdasarkan nama dan id yg dikirim selain dari params.
    const checkName = await Categories.findOne({ name, _id: { $ne: id } })
    if(checkName) throw new BadRequestError('Nama Kategori sudah ada')

    // Proses update
    const result = await Categories.findOneAndUpdate(
        { _id: id},
        { name },
        { new: true, runValidators: true }
    )

    if(!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return result
}

const deleteCategories = async (req) => {
    const { id } = req.params;

    const check = await Categories.findOne({ _id: id })
    if(!check) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    await check.remove()
    return check
}

module.exports = {
    getAllCategories,
    getOneCategories,
    createCategories,
    updateCategories,
    deleteCategories
}