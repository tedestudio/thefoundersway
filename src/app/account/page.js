"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DemoForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const saveAll = async () => {
    if (!email || !pass) {
      setMessage("Please fill all fields before saving.");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: pass }]); // match DB column names

    if (error) setMessage("Save error: " + error.message);
    else setMessage("Saved successfully!");
  };

  return (
    <div>
      <h1>Save User Info to Supabase</h1>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>

      <button onClick={saveAll}>Save All</button>

      <p>{message}</p>
    </div>
  );
}
