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

const authenticatedParticipant = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });

    // Attach the user and his permissions to the req object
    req.participant = {
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
      id: payload.participantId,
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

module.exports = {
  authenticatedUser,
  authenticatedParticipant,
  authorizeRoles,
};
