const express = require('express');
const router = express.Router();

const apiCtrl = require('../controllers/apicrypto');

router.get("/", apiCtrl.getApi);
router.get("/:id", apiCtrl.getApiId);

module.exports = router;
