const Talent = require('../../api/v1/talents/model')
const { checkingImage } = require('./images')

const { NotFoundError, BadRequestError } = require('../../errors')

const getAllTalents = async (req) => {
    const { keyword } = req.query;

    // Filter pencarian berdasarkan karakter yang sesuai
    let condition = {};
    if(keyword) {
        condition = { ...condition, name: {$regex: keyword, $options: 'i'} }
    }

    const result = await Talent.find(condition).populate({
        path: 'image',
        select: '_id name'
    }).select('_id name role image')

    return result
}

const createTalents = async (req) => {
    const { name, role, image } = req.body;

    await checkingImage(image);

    const check = await Talent.findOne({ name })

    if(check) throw new BadRequestError('Nama pembicara sudah ada')

    const result = await Talent.create({ name, role, image })

    return result
}

const getOneTalent = async (req) => {
    const { id } = req.params;

    const result = await Talent.findById({ _id: id}).populate({
        path: 'image',
        select: '_id name'
    }).select('_id name role image')

    if(!result) throw new BadRequestError(`Pembicara dengan id: ${id} tidak ada`)

    return result
}

const updateTalent = async (req) => {
    const { id } = req.params;
    const { name, role, image } = req.body;
    
    await checkingImage(image)

    const check = await Talent.findOne({ name, _id: { $ne: id } })
    if(check) throw new BadRequestError('Nama pembicara sudah ada')

    const result = await Talent.findByIdAndUpdate(
        {_id: id},
        {name, image, role},
        {new: true, runValidators: true}
    )

    if(!result) throw new NotFoundError(`Pembicara dengan id: ${id} tidak ada`)

    return result
}

const deleteTalent = async (req) => {
    const { id } = req.params;

    const result = await Talent.findOne({ _id: id })

    if(!result) throw new NotFoundError(`Pembicara dengan id: ${id} tidak ada`)

    await result.remove()
    return result
}

const checkingTalent = async (id) => {
    const result = await Talent.findOne({ _id: id })
    if(!result) throw new NotFoundError(`Pembicara dengan id: ${id} tidak ada`)
    return result
}

module.exports = {
    getAllTalents,
    getOneTalent,
    createTalents,
    deleteTalent,
    updateTalent,
    checkingImage
}