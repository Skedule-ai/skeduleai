import Link from 'next/link';

const Navbar = async () => {
    return (
        <div>
            <ul className=''>
                <li>
                    <div>
                        <Link href='/'>Home</Link>
                    </div>
                    {/* <div className="flex gap-10">
            <Link href="/sign-in">
                    <li>Login</li>
                </Link>
                <Link href="/sign-up">
                    <li>Sign Up</li>
                </Link>
                
            </div>          */}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
