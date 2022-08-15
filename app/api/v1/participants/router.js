const express = require("express");
const router = express();
const {
  signup,
  activeParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
  checkout,
} = require("./controller");

const { authenticatedParticipant } = require("../../../middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.put("/active", activeParticipant);
router.get("/events", getAllLandingPage);
router.get("/events/:id", getDetailLandingPage);
router.get("/orders", authenticatedParticipant, getDashboard);
router.post("/checkout", authenticatedParticipant, checkout);

module.exports = router;
