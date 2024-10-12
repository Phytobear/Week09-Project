import pg from "pg";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  const pool = new pg.Pool({
    connectionString: process.env.DB_URL,
  });

  const { id } = params;
  const { content } = Object.fromEntries(await req.formData());
  const { userId } = auth();

  try {
    const updateQuery =
      "UPDATE posts SET content = $1 WHERE id = $2 AND clerk_id = $3";
    await pool.query(updateQuery, [content, id, userId]);

    return new Response("Post updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Failed to update post", { status: 500 });
  }
}
