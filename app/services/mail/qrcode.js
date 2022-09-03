const qrCode = require("qrcode");
const QRcodeModel = require("../../api/v1/qrcodes/model");

const opts = {
  errorCorrectionLevel: "H",
  type: "terminal",
  quality: 0.95,
  margin: 1,
  color: {
    dark: "#208698",
    light: "#FFF",
  },
};

const createQrCode = async (data) => {
  try {
    const str = JSON.stringify(data);
    const qr = await qrCode.toDataURL(str, opts);
    const base64Data = qr.replace(/^data:image\/png;base64,/, "");

    const jumlahData = await QRcodeModel.countDocuments({});

    const hasil = jumlahData + 1;

    const nomorInvoice =
      String(hasil).length === 4
        ? String(hasil)
        : String(hasil).length === 3
        ? `0` + String(hasil)
        : String(hasil).length === 2
        ? `00` + String(hasil)
        : `000` + String(hasil);

    await qrCode.toFile(
      `./public/uploads/qrimages/${data.name}.png`,
      str,
      opts
    );
    const result = await QRcodeModel.create({
      nomorInvoice,
      dataInvoice: data,
      qrCode: base64Data,
      participant: data.participant,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createQrCode };
