"use client";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Social App
        </Typography>

        <SignedIn>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/posts">
            Posts
          </Button>
          <Button color="inherit" component={Link} href="/profile">
            My Profile
          </Button>
        </SignedIn>

        <SignedOut>
          <Button color="inherit" component={Link} href="/sign-in">
            Sign In
          </Button>
          <Button color="inherit" component={Link} href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
      </Toolbar>
    </AppBar>
  );
}
