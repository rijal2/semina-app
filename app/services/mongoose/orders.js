const Orders = require("../../api/v1/orders/model");
const { NotFoundError } = require("../../errors");

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  //Cek yang request owner atau bukan
  if (req.user.role !== "owner") {
    condition = { ...condition, "historyEvent.organizer": req.user.organizer };
  }

  //Untuk keperluan filter berdasakan tanggal
  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);

    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }

  const result = await Orders.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const getOneOrders = async (req) => {
  const { id } = req.params;
  const role = req.user.role;
  const organizer = req.user.organizer;
  console.log(role);
  let condition = {};
  if (role !== "owner") {
    condition = {
      ...condition,
      "historyEvent.organizer": organizer,
      _id: id,
    };
  } else {
    condition = { ...condition, _id: id };
  }
  console.log(condition);

  const result = await Orders.findOne(condition);
  if (!result)
    throw new NotFoundError(`Tidak ditemukan detail order dengan id: ${id}`);
  console.log(result);
  return result;
};

module.exports = { getAllOrders, getOneOrders };
