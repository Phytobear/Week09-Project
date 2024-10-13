import { connect } from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export default function ProfileForm({ existingUsername, existingBio }) {
  async function handleUpdateProfile(formData) {
    "use server";
    const db = connect();
    const { userId } = auth();

    // get the information from the form
    const username = formData.get("username");
    const bio = formData.get("bio");

    // check whether profile exists
    const profiles = await db.query(
      `SELECT * FROM profiles WHERE clerk_id = $1`,
      [userId]
    );

    if (profiles.rowCount === 0) {
      // insert the profile
      await db.query(
        `INSERT INTO profiles (clerk_id, username, bio) VALUES ($1, $2, $3)`,
        [userId, username, bio]
      );
    } else {
      // update the existing item
      await db.query(
        `UPDATE profiles SET username=$1, bio=$2 WHERE clerk_id=$3`,
        [username, bio, userId]
      );
    }
  }

  return (
    <div>
      <form action={handleUpdateProfile}>
        <input
          name="username"
          placeholder="Username"
          defaultValue={existingUsername} // Prefill username if there is one, but dosnt work???
        />
        <textarea
          name="bio"
          placeholder="Bio"
          defaultValue={existingBio} // Prefill bio if there is one, but dosnt work???
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
