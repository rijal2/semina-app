const {
  getAllOrders,
  getOneOrders,
} = require("../../../services/mongoose/orders");

const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      data: { order: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneOrders(req);

    res.status(StatusCodes.OK).json({
      data: { order: result },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  find,
};
