const express = require("express");
const router = express();

const { index, create, find } = require("./controller");

router.get("/events", index);
router.post("/events", create);
router.get("/events/:id", find);

module.exports = router;
