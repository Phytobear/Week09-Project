import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default function UserPosts({ posts }) {
  console.log(posts);

  return (
    <div>
      <h2>Your Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.username ? post.username : "Anonymous"} says:</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
