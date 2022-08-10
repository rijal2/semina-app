const express = require("express");
const router = express();

const { createCMSOrganizer, createCMSUser } = require("./controller");

const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/organizers", authenticatedUser, createCMSOrganizer);
router.post("/users", authenticatedUser, createCMSUser);

module.exports = router;
