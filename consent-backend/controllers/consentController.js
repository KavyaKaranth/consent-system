const { v4: uuidv4 } = require("uuid");
const consents = require("../data/consentStore");

exports.createConsent = (req, res) => {
  const { userId, dataCategory, purpose, validUntil } = req.body;

  if (!userId || !dataCategory || !purpose || !validUntil) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (new Date(validUntil) <= new Date()) {
    return res.status(400).json({ error: "Invalid expiry date" });
  }

  const consentId = uuidv4();

  const consent = {
    consentId,
    userId,
    dataCategory,
    purpose,
    validUntil,
    status: "ACTIVE",
    createdAt: new Date()
  };

  consents.set(consentId, consent);

  res.json(consent);
};

exports.getConsent = (req, res) => {
  const consent = consents.get(req.params.id);

  if (!consent) {
    return res.status(404).json({ error: "Consent not found" });
  }

  res.json(consent);
};

exports.revokeConsent = (req, res) => {
  const consent = consents.get(req.body.consentId);

  if (!consent) {
    return res.status(404).json({ error: "Consent not found" });
  }

  consent.status = "REVOKED";

  res.json({ message: "Consent revoked", consent });
};
