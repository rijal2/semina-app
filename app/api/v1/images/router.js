const express = require("express");
const router = express();

const { create, find, index, delImage } = require("./controller");
const upload = require("../../../middlewares/multer");

router.post("/images", upload.single("avatar"), create);
router.delete("/images", delImage);
router.get("/images", index);
router.get("/images/:id", find);

module.exports = router;
