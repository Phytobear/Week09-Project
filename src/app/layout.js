import NavBar from "@/components/NavBar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f4f6f8",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang="en">
          <body>
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <NavBar />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
