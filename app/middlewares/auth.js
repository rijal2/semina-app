const { UnathenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticatedUser = async (req, res, next) => {
  try {
    let token;

    //Cek Header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) throw new UnathenticatedError("Autentikasi tidak valid");

    const payload = isTokenValid({ token });

    //Membuat object req.user menggunakan data yang ada di payload
    req.user = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      id: payload.userId,
      organizer: payload.organizer,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError(
        `Tidak memiliki otoritas atau ijin untuk akses menggunakan route ini`
      );
    next();
  };
};

module.exports = { authenticatedUser, authorizeRoles };
