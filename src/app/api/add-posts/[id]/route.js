import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;
    const { userId } = auth();

    const db = connect();

    // Insert the post into the database
    const result = await db.query(
      `INSERT INTO posts (clerk_id, content, stimestamp) VALUES ($1, $2, NOW()) RETURNING *`,
      [userId, content]
    );

    const newPost = result.rows[0];
    res.status(200).json(newPost);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
