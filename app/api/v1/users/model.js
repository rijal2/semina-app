const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

/**Melakukan hash password menggunakan bcryptjs */
userSchema.pre("save", async (next) => {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

/**Melakukan komparasi password asli dengan password yag telah di hash */
userSchema.methods.comparePassword = async (candidatePassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
