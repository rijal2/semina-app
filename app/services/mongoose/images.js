const Images = require("../../api/v1/images/model");
const Qrcodes = require("../../api/v1/qrcodes/model");
const { NotFoundError } = require("../../errors/index");

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

const saveQr = async (req) => {
  const result = await Qrcodes.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

const getAllImage = async (req) => {
  const result = await Images.find().select("_id name");

  return result;
};

const getOneImage = async (req) => {
  const { id } = req.params;
  const result = await Images.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Gambar dengan id: ${id} tidak ditemukan`);

  return result;
};

const deleteImage = async () => {
  const result = await Images.deleteMany();

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id: ${id}`);

  return result;
};

module.exports = {
  createImage,
  getAllImage,
  getOneImage,
  deleteImage,
  checkingImage,
  saveQr,
};
