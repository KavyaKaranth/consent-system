const express = require("express");
const router = express.Router();
const controller = require("../controllers/consentController");

router.post("/consent", controller.createConsent);
router.get("/consent/:id", controller.getConsent);
router.post("/consent/revoke", controller.revokeConsent);

module.exports = router;
