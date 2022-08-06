const Events = required('../../api/v1/events/model')
const { checkingImage } = required('./images')

const { NotFoundError, BadRequestError } = required('../../errors')

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query;

    let condition = {}

    if(keyword){
        condition = { ...condition, title: {$regex: keyword, $options: 'i'} }
    }

    if(category){
        condition = { ...condition, category: category }
    }

    if(talent){
        condition = { ...condition, talent: talent }
    }

    const result = await Event.find(condition).populate({path: 'image', select: '_id name'}).populate({path: 'category', select: '_id name'}).populate({path: 'talent', select: '_id name image role', popuplate: {path: 'image', select: '_id name'},})
    return result
}