import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";
import UserPosts from "@/components/UserPosts";
import { connect } from "@/utilities/connect";

export default async function ProfilePage() {
  const user = await currentUser();
  const db = connect();
  const result = await db.query(
    `SELECT posts.id, posts.content, profiles.username 
     FROM posts 
     INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id 
     WHERE posts.clerk_id = $1`,
    [user.id]
  );
  const posts = result.rows;

  return (
    <div>
      <SignedIn>
        <h2>
          Welcome {user?.firstName} {user?.lastName}
        </h2>
        <p>You are signed in with {user?.emailAddresses[0].emailAddress}</p>
        <ProfileForm />
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
