import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Header from "../../atoms/header";

const AuthHeader = () => {
  return (
    <Header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Header>
  );
};

export default AuthHeader;
