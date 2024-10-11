import PostsForm from "@/components/PostsForm";
import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default async function PostPage() {
  const { userId } = auth();

  console.log("Authenticated userId:", userId);

  const db = connect();
  const posts = await db.query(
    `SELECT * FROM posts 
    INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id`
  );

  console.log("Posts data:", posts.rows);

  return (
    <div>
      <PostsForm />

      <h3>All Posts</h3>
      {posts.rows.map((post) => {
        return (
          <div key={post.id}>
            <h4>{post.username ? post.username : "Anonymous"} says</h4>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
