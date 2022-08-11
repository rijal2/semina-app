const express = require("express");
const router = express();

const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUser,
} = require("./controller");
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/users", authenticatedUser, authorizeRoles("owner"), getCMSUser);

router.post(
  "/organizers",
  authenticatedUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);
router.post(
  "/users",
  authenticatedUser,
  authorizeRoles("organizer"),
  createCMSUser
);

module.exports = router;
