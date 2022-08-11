const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Tiket harus diisi"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "Nama Depan harus diisi"],
        minlength: [3, "Panjang Nama Depan minimal 3 karakter"],
        maxlength: [50, "Panjang Nama Depan maksimal 50 karakter"],
      },
      lastName: {
        type: String,
        required: [true, "Nama Belakang harus diisi"],
        minlength: [3, "Panjang Nama Belakang minimal 3 karakter"],
        maxlength: [50, "Panjang Nama Belakang maksimal 50 karakter"],
      },
      email: {
        type: String,
        required: [true, "Email harus diisi"],
        minlength: [6, "Panjang Email minimal 6 karakter"],
        maxlength: [50, "Panjang Email maksimal 50 karakter"],
      },
      role: {
        type: String,
        default: "designer",
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    historyEvent: {
      title: {
        type: String,
        required: [true, "Judul harus diisi"],
        minlength: [3, "Panjang judul minimal 3 karakter"],
        maxlength: [50, "Panjang judul maksimal 15 karakter"],
      },
      date: {
        type: Date,
        required: [true, "Tanggal dan waktu harus diisi"],
      },
      about: {
        type: String,
      },
      tagline: {
        type: String,
        required: [true, "Tagline harus diisi"],
      },
      keyPoint: {
        type: [String],
      },
      venueName: {
        type: String,
        required: [true, "Tempat acara harus diisi"],
      },

      tickets: {
        type: [],
        required: true,
      },
      image: {
        type: mongoose.Types.ObjectId,
        ref: "Image",
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      talent: {
        type: mongoose.Types.ObjectId,
        ref: "Talent",
        required: true,
      },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Organizer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Order", orderSchema);
