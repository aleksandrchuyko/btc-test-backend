const express = require("express");
const usersController = require("../../controllers/users");

const router = express.Router();

const { validateReqBody } = require('../../middlewares');

const {schemas} = require('../../models/users/user');

const { controllersWrapper } = require('../../utils');



router.get("/", controllersWrapper(usersController.getAll));

router.get("/:userId", controllersWrapper(usersController.getById));

router.post("/", validateReqBody(schemas.addSchema), controllersWrapper(usersController.addNew));

router.delete("/:userId", controllersWrapper(usersController.removeById));

router.put("/:userId", validateReqBody(schemas.addSchema), controllersWrapper(usersController.updateById));

module.exports = router;
