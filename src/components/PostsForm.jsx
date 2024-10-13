"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function PostsForm() {
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="content"
        label="New Post"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
