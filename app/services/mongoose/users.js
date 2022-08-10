const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { NotFoundError, BadRequestError } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

/**BUat Organizer sekaligus buat Users */
const createOrganizer = async (req) => {
  const { name, email, role, password, confirmPassword, organizer } = req.body;

  //Cek password dan confirmPassword
  if (password !== confirmPassword)
    throw new BadRequestError(`Password dan Konfirmasi Password tidak sesuai`);

  //Create Organize
  const result = await Organizers.create({ organizer });

  //Create Users
  const users = await Users.create({
    name,
    email,
    role,
    password,
    organizer: result._id,
  });

  //aksi Delete berikut bertujuan agar password tidak terkirim di respon, bukan mengahpus pass yg sdh tersimpan di database saat create users
  delete users._doc.password;

  return users;
};

// Create User / Admin
const createUser = async (req) => {
  const { name, email, role, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password dan Konfimasi Password tidak cocok");

  //Create Users / admin
  const result = await Users.create({
    name,
    email,
    role,
    password,
    confirmPassword,
    organizer: req.user.organizer,
  });

  return result;
};

module.exports = { createOrganizer, createUser };
