const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete("/:id",auth, userCtrl.deleteUser);
router.put("/:id",auth, userCtrl.putUser);
router.get("/:id",auth, userCtrl.getUser);

module.exports = router;
