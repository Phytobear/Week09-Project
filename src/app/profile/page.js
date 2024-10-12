import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <div>
      <SignedIn>
        <h2>
          Welcome {user?.firstName} {user?.lastName}
        </h2>
        <p>You are signed in with {user?.emailAddresses[0].emailAddress}</p>
        <ProfileForm />
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in">Please sign in</Link>
        <br />
        <Link href="/sign-up">or sign up</Link>
      </SignedOut>
    </div>
  );
}
