const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    nomorInvoice: { type: String },
    data: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qrcode", qrSchema);
