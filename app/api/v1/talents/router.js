const express = require("express");
const router = express();

const { create, index, find, update, destroy } = require("./controller");
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/talents", authenticatedUser, authorizeRoles("organizer"), index);
router.get(
  "/talents/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  find
);
router.post("/talents", authenticatedUser, authorizeRoles("organizer"), create);
router.put(
  "/talents/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/talents/:id",
  authenticatedUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
