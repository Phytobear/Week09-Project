import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";
import UserPosts from "@/components/UserPosts";
import { connect } from "@/utilities/connect";

export default async function UserProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <p>Could not load user information</p>;
  }

  const db = connect();

  const profileResult = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = $1`,
    [user.id]
  );

  const profile = profileResult.rows[0];

  const postsResult = await db.query(
    `SELECT posts.id, posts.content, profiles.username 
     FROM posts 
     INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id 
     WHERE posts.clerk_id = $1
     ORDER BY posts.timestamp DESC`,
    [user.id]
  );

  const posts = postsResult.rows;

  return (
    <div>
      <SignedIn>
        <h2>Welcome {profile?.username || "User"}</h2>
        <p>Bio: {profile?.bio || "No bio available."}</p>
        <ProfileForm
          existingUsername={profile?.username}
          existingBio={profile?.bio}
        />
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
