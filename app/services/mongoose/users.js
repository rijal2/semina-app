const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { NotFoundError, BadRequestError } = require("../../errors");

/**BUat Organizer sekaligus buat Users */
const createOrganizer = async (req) => {
  const { name, email, role, password, confirmPassword, organizer } = req.body;

  //Cek password dan confirmPassword
  if (password !== confirmPassword)
    throw new BadRequestError(`Password dan Konfirmasi Password tidak sesuai`);

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    name,
    email,
    role,
    password,
    organizer: result._id,
  });

  delete users._doc.password;

  return users;
};

module.exports = { createOrganizer };
