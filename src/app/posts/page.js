import { connect } from "@/lib/connect";
import { auth } from "@clerk/nextjs/server";

export default async function PostPage() {
  // get user id from clark
  const { userId } = auth();

  const db = connect();
  const posts = await db.query(
    `SELECT 
        post.id, 
        profiles.username, 
        posts.content 
        FROM posts 
    INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id`
  );

  async function () {
    "use server"
    const db = connect();
    const content = formData.get("content");
    await db.query(
      `INSERT INTO posts (clerk_is, content)
      VALUES ($1, $2)`,
      [userId, content]
    );
    
  }

  return (
    <div>
      <h2>Posts</h2>
      <h3>Add New Post</h3>
      <form action={handleCreatePost}>
        <textarea name="content" placeholder="New Post"></textarea>
        <button>Submit</button>
      </form>

      <h3>All Posts</h3>
      {posts.rows.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.username} says</h4>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
