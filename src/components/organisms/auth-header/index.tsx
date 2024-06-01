import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Header from "../../atoms/header";
import Button from "@/components/atoms/button";

const AuthHeader = () => {
  return (
    <Header>
      <SignedOut>
        <SignInButton>
          <Button className="dark:text-neutral-50">Sign in</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Header>
  );
};

export default AuthHeader;
