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

    const nomorInvoice = ((jumlahData + 1).toString().length = 1
      ? `000${jumlahData + 1}`
      : ((jumlahData + 1).toString().length = 2
          ? `00${jumlahData + 1}`
          : ((jumlahData + 1).toString().length = 3
              ? `0${jumlahData + 1}`
              : jumlahData + 1)));

    await qrCode.toFile(
      `./public/uploads/qrimages/${data.name}.png`,
      str,
      opts
    );
    const result = await QRcodeModel.create({
      nomorInvoice,
      data: base64Data,
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createQrCode };
