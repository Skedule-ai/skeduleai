import { SignIn } from "@clerk/nextjs";
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <SignIn />
      <div className="text-sm mt-2 flex">
        <p>Forgot Password :</p>
        <Link href="/forget-password" className="">Reset Here</Link>
      </div>
    </div>
  );
}

