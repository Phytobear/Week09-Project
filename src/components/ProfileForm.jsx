"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function ProfileForm({ existingUsername, existingBio }) {
  const [username, setUsername] = useState(existingUsername || "");
  const [bio, setBio] = useState(existingBio || "");

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, bio }),
    });

    if (res.ok) {
      console.log("Profile updated successfully");
    } else {
      console.error("error updating profile");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          name="bio"
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" type="submit">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
