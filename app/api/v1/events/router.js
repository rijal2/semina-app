const express = require("express");
const router = express();

const { index, create, find, update, destroy } = require("./controller");
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/events", authenticatedUser, authorizeRoles("organizer"), index);
router.post("/events", authenticatedUser, authorizeRoles("organizer"), create);
router.get("/events/:id", authenticatedUser, authorizeRoles("organizer"), find);
router.put(
  "/events/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
