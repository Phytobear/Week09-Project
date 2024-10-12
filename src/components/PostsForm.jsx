import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default function PostsForm() {
  async function handleSubmit(formData) {
    "use server";
    const db = connect();
    const { userId } = auth(); // Get userId

    const content = formData.get("content");

    // Insert the post into posts table
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
