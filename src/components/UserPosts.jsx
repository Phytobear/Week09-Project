import Link from "next/link";
import { Grid2, Paper, Typography } from "@mui/material";

export default function UserPosts({ posts, LoggedInUserId }) {
  return (
    <Grid2 container spacing={2} justifyContent="center">
      {posts.map((post) => (
        <Grid2 item xs={12} sm={6} md={4} key={post.id}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">
              {post.clerk_id === LoggedInUserId ? (
                post.username
              ) : (
                <Link href={`/profile/${post.clerk_id}`} underline="hover">
                  {post.username ? post.username : "Anonymous"} says:
                </Link>
              )}
            </Typography>
            <Typography variant="body1">{post.content}</Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
}
