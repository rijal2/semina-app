const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    nomorInvoice: { type: String },
    dataInvoice: { type: [] },
    qrCode: { type: String },
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Qrcode", qrSchema);
