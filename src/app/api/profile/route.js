import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default async function POST(req, res) {
  const db = connect();
  const { userId } = auth();
  const { username, bio } = await req.json();

  console.log("Received data:", { username, bio, userId });

  try {
    // Check if profile exists
    const profiles = await db.query(
      `SELECT * FROM profiles WHERE clerk_id = $1`,
      [userId]
    );

    console.log("Profiles found:", profiles.rows);

    if (profiles.rowCount === 0) {
      // Insert new profile
      await db.query(
        `INSERT INTO profiles (clerk_id, username, bio) VALUES ($1, $2, $3)`,
        [userId, username, bio]
      );
      console.log("Profile inserted");
      // Update profile
      await db.query(
        `UPDATE profiles SET username=$1, bio=$2 WHERE clerk_id=$3`,
        [username, bio, userId]
      );
      console.log("Profile updated");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("error updating profile:", error);
    res.status(500).json({ success: false, message: "error updating profile" });
  }
}
