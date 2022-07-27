const mongoose = require('mongoose')
// const { model, Schema } = mongoose

const ticketCategoriesSchema = new mongoose.Schema({
    price:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    type:{
        type: String,
        required: [true, 'Tipe tiket harus diisi']
    },
    expired:{
        type: Date,
    },
    statusTicketCategories:{
        type: Boolean,
        enum: [true, false],
        default: true
    }
})

const EventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Judul harus diisi'],
        minlength: [3, 'Panjang judul minimal 3 karakter'],
        maxlength: [50, 'Panjang judul maksimal 15 karakter']
    },
    date:{
        type: Date,
        required: [true, 'Tanggal dan waktu harus diisi']
    },
    about:{
        type: String
    },
    tagline:{
        type: String,
        required: [true, 'Tagline harus diisi']
    },
    keyPoint:{
        type: [String]
    },
    venueName:{
        type: String,
        required: [true, 'Tempat acara harus diisi']
    },
    statusEvent:{
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    },
    tickets:{
        type: [ticketCategoriesSchema],
        required: true
    },
    image:{
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    talent:{
        type: mongoose.Types.ObjectId,
        ref: 'Talent',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', EventSchema)