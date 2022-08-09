const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  getOneCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

// Create categories
const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);

    res.status(StatusCodes.CREATED).json({
      message: "success menambah kategori",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Menampilkan daftar categories
const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Menampilkan category berdasarkan id
const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(StatusCodes.OK).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Edit Categori berdasarkan ID
const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      message: "success mengubah nama kategori",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Hapus categori berdasarkan ID
const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      message: "succes menghapus kategori",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, find, update, destroy };
