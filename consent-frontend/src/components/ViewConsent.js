import React, { useState } from "react";
import api from "../api";

function ViewConsent() {
  const [id, setId] = useState("");
  const [consent, setConsent] = useState(null);

  const fetchConsent = async () => {
    const res = await api.get(`/consent/${id}`);
    setConsent(res.data);
  };

  const revokeConsent = async () => {
    await api.post("/consent/revoke", {
      consentId: consent.consentId
    });
    alert("Revoked");
  };

  return (
    <div>
      <h2>View Consent</h2>

      <input placeholder="Consent ID" onChange={(e) => setId(e.target.value)} />
      <button onClick={fetchConsent}>Fetch</button>

      {consent && (
        <div>
          <p>User: {consent.userId}</p>
          <p>Status: {consent.status}</p>

          {consent.status === "ACTIVE" && (
            <button onClick={revokeConsent}>Revoke</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewConsent;
