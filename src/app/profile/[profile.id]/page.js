import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import UserPosts from "@/components/UserPosts";
import { connect } from "@/utilities/connect";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }) {
  const profileId = params["profile.id"];

  // console.log("Profile ID from URL:", profileId);
  console.log("Params object:", params);

  const db = connect();

  //Fetch profile
  const profileResult = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = $1`,
    [profileId]
  );

  const profile = profileResult.rows[0];

  // If no profile show the error page
  if (!profile) {
    return notFound();
  }

  const postsResult = await db.query(
    `SELECT posts.id, posts.content, profiles.username 
     FROM posts 
     INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id 
     WHERE posts.clerk_id = $1
     ORDER BY posts.timestamp DESC`,
    [profileId]
  );

  const posts = postsResult.rows;

  return (
    <div>
      <SignedIn>
        <h2>Welcome to {profile.username}s Profile</h2>
        <p>Bio: {profile.bio || "No bio available."}</p>
        <UserPosts posts={posts} />
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in">Please sign in</Link>
        <br />
        <Link href="/sign-up">or sign up</Link>
      </SignedOut>
    </div>
  );
}
