import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const db = connect();
    const { userId } = auth();
    const { content } = req.body;

    try {
      await db.query(`INSERT INTO posts (clerk_id, content) VALUES ($1, $2)`, [
        userId,
        content,
      ]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "server error" });
    }
  } else {
    res.status(405).json({ message: "Not allowed" });
  }
}
