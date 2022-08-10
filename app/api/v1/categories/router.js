const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/categories", authenticatedUser, create);
router.get("/categories", authenticatedUser, index);
router.get("/categories/:id", authenticatedUser, find);
router.put("/categories/:id", authenticatedUser, update);
router.delete("/categories/:id", authenticatedUser, destroy);

module.exports = router;
