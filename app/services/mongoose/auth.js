const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { createJWT, isTokenValid, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;

  //Cek apakah email dan password yang dikirim ada isinya atau tidak
  if (!email || !password)
    throw new BadRequestError(`Email dan Password tidak boleh kosong`);

  //Cek di dalam database apakah emailnya ada atau tidak
  const result = await Users.findOne({ email: email });
  if (!result) throw new UnauthorizedError("Email Anda salah");

  //Cek di dalam database apakah emailnya ada atau tidak. Cek menggunakan metodh yang sudah dibuat didalam model Users yaitu ccomparePassword
  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthorizedError("Password Anda salah");

  // Buat Token
  const token = createJWT({ payload: createTokenUser(result) });

  return token;
};

module.exports = { signin };
