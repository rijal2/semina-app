const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const User = require("../../api/v1/users/model");
const {
  isRefreshTokenValid,
  createTokenUser,
  createJWT,
} = require("../../utils");

const { NotFoundError } = require("../../errors");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);
  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });

  if (!result)
    throw new NotFoundError("Token yang akan direfresh tidak ditemukan");

  const payload = isRefreshTokenValid({ token: result.refreshToken });
  const userCheck = await User.findOne({ email: payload.email });
  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
