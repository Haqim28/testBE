const express = require("express");
const router = express.Router();
const producController = require("../controllers/product");

router.get("/products", producController.findProduct);
router.post("/product", producController.createProduct);
router.get("/product/:routeid", producController.findbyid);
router.patch("/product/:idUpdate", producController.findAndUpdate);
router.delete("/product/:idDelete", producController.deleteID);

module.exports = router;
