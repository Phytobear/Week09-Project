import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

const { userId } = auth();

export default function UserPosts({ posts }) {
  async function handleSubmit(formData) {
    "use server";
    const db = connect();

    const { userId } = auth();

    const content = formData.get("content");
    const username = formData.get("username");

    console.log("Authenticated userId:", userId);
    console.log("Username from form:", username);

    // Insert the post into the posts table
    await db.query(
      `INSERT INTO posts (clerk_id, content)
    VALUES ($1, $2)`,
      [userId, content]
    );
  }

  return (
    <div>
      <h2>Your Posts</h2>
      <h3>Add New Post</h3>
      <form action={handleSubmit}>
        <textarea name="content" placeholder="New Post"></textarea>
        <button>Submit</button>
      </form>
      {posts.map((posts) => {
        return (
          <div key={posts.id}>
            <h4>{posts.username ? posts.username : "Anonymous"} says</h4>
            <p>{posts.content}</p>
          </div>
        );
      })}
    </div>
  );
}
