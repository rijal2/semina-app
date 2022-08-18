const express = require("express");
const router = express();
const { index, find } = require("./controller");
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get(
  "/orders",
  authenticatedUser,
  authorizeRoles("organizer", "admin", "owner"),
  index
);
router.get(
  "/orders/:id",
  authenticatedUser,
  authorizeRoles("organizer", "admin", "owner"),
  find
);

module.exports = router;
