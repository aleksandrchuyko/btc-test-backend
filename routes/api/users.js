const express = require('express');
const usersController = require('../../controllers/users');

const router = express.Router();

const { validateReqBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/users/user');

const { controllersWrapper } = require('../../utils');

router.get('/', authenticate, controllersWrapper(usersController.getAll));

router.get(
  '/:userId',
  authenticate,
  controllersWrapper(usersController.getById)
);

router.post(
  '/',
  authenticate,
  validateReqBody(schemas.addSchema),
  controllersWrapper(usersController.addNew)
);

router.delete(
  '/:userId',
  authenticate,
  controllersWrapper(usersController.removeById)
);

router.put(
  '/:userId',
  authenticate,
  validateReqBody(schemas.addSchema),
  controllersWrapper(usersController.updateById)
);

module.exports = router;
