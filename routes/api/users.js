const express = require("express");
const usersController = require("../../controllers/users");

const router = express.Router();


const { controllersWrapper } = require('../../utils');



router.get("/", controllersWrapper(usersController.getAll));

router.get("/:userId", controllersWrapper(usersController.getById));

router.post("/", controllersWrapper(usersController.addNew));

router.put("/:userId", controllersWrapper(usersController.updateById));

router.delete("/:userId", controllersWrapper(usersController.removeById));



module.exports = router;
