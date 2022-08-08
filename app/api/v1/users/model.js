const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama User harus diisi"],
      minlength: [3, "Nama harus memiliki minimal 3 karakter"],
      maxlength: [50, "Nama harus memiliki minimal 50 karakter"],
    },
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: [6, "Password harus memiliki minimal 6 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
