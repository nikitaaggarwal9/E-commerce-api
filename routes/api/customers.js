const express = require("express");
const validator = require("../../config/validator");
const { userValidation } = validator;

const router = express.Router();

const customersApi = require("../../controllers/api/customers_api");

router.post("/create", userValidation(req, res, next) , customersApi.create);
router.get("/:id", customersApi.view);
router.put("/:id", customersApi.update);
router.delete("/:id/delete", customersApi.delete);

module.exports = router;
