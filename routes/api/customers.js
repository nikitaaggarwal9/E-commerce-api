const express = require("express");
const validator = require("../../config/validator");

const router = express.Router();

const customersApi = require("../../controllers/api/customers_api");

router.post("/create", validator.userValidation , customersApi.create);
router.get("/:id", customersApi.view);
router.put("/:id", validator.userValidation, customersApi.update);
router.delete("/:id", customersApi.delete);

module.exports = router;
