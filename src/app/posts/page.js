import PostsForm from "@/components/PostsForm";
import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PostPage() {
  const { userId } = auth();

  const db = connect();
  const posts = await db.query(
    `SELECT posts.id, posts.content, profiles.username, posts.clerk_id 
     FROM posts 
     INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id 
     ORDER BY posts.timestamp DESC`
  );

  console.log("Posts data:", posts.rows);

  return (
    <div>
      <PostsForm />

      <h3>All Posts</h3>
      {posts.rows.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/profile/${post.clerk_id}`}>
              {post.username ? post.username : "Anonymous"} says
            </Link>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
