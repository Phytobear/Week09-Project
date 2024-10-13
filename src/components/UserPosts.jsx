import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function UserPosts({ posts, loggedInUserId }) {
  console.log(posts);

  return (
    <div>
      <h2>Your Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>
            {post.clerk_id === loggedInUserId ? (
              post.username
            ) : (
              <Link href={`/profile/${post.clerk_id}`}>
                {post.username ? post.username : "Anonymous"} says:
              </Link>
            )}
          </h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
