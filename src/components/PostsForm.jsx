import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

const { userId } = auth();

console.log("Authenticated userId:", userId);

export default function PostsForm() {
  async function handleSubmit(formData) {
    "use server";
    const db = connect();

    const content = formData.get("content");
    const username = formData.get("username");

    // check whether a profile exists
    const profiles = await db.query(
      `SELECT * FROM profiles WHERE clerk_id = $1`,
      [userId]
    );
    if (profiles.rowCount === 0) {
      // insert profile into the DB if it doesn't exist
      await db.query(
        `INSERT INTO profiles (clerk_id, username) VALUES ($1, $2)`,
        [userId, username]
      );
    } else {
      // update the existing item
      await db.query(`UPDATE profiles SET username=$1 WHERE clerk_id=$2`, [
        username,
        userId,
      ]);
    }

    await db.query(
      `INSERT INTO posts (clerk_id, content)
    VALUES ($1, $2)`,
      [userId, content]
    );
  }

  return (
    <div>
      <h2>Posts</h2>
      <h3>Add New Post</h3>
      <form action={handleSubmit}>
        <textarea name="content" placeholder="New Post"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
