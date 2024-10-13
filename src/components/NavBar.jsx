import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
