import Link from "next/link";
import { UserButton,useAuth,} from "@clerk/nextjs";

const Navbar = async() => {
    
    return <div>
        <ul className="">
            <div>
                <Link href="/">
                    <li>Home</li>
                </Link>
            </div>
            {/* <div className="flex gap-10">
            <Link href="/sign-in">
                    <li>Login</li>
                </Link>
                <Link href="/sign-up">
                    <li>Sign Up</li>
                </Link>
                
            </div>          */}
        </ul>
    </div>
} 

export default Navbar;