const express = require("express");
const router = express();

const {
  index,
  create,
  find,
  update,
  destroy,
  changeStatus,
} = require("./controller");
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

router.put(
  "/events/:id/status",
  authenticatedUser,
  authorizeRoles("organizer", "owner"),
  changeStatus
);

module.exports = router;
