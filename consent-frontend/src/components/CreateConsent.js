import React, { useState } from "react";
import api from "../api";

function CreateConsent() {
  const [form, setForm] = useState({
    userId: "",
    dataCategory: "",
    purpose: "",
    validUntil: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitConsent = async () => {
    const res = await api.post("/consent", form);
    alert("Created: " + res.data.consentId);
  };

  return (
    <div>
      <h2>Create Consent</h2>

      <input name="userId" placeholder="User ID" onChange={handleChange} />
      <input name="dataCategory" placeholder="Data Category" onChange={handleChange} />
      <input name="purpose" placeholder="Purpose" onChange={handleChange} />
      <input type="date" name="validUntil" onChange={handleChange} />

      <button onClick={submitConsent}>Create</button>
    </div>
  );
}

export default CreateConsent;
