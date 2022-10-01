import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import DropDownAccount from "./DropDownAccount";

const Header = () => {
    const { data: session, status } = useSession();

    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <Link href="/">
                    <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" 
                    alt="" />
                </Link>
                <div className="hidden md:inline-flex 
                    items-center space-x-5">
                    <button className="text-gray-600 hover:text-gray-800">About</button>
                    <button className="text-gray-600 hover:text-gray-800">Contact</button>
                    <button className="text-gray-600 hover:text-gray-800">Follow</button>
                </div>
            </div>
            { !session ? (
                <div className="flex items-center space-x-5 text-gray-500">
                    <button onClick={() => signIn()} className="hover:text-gray-700">Sign In</button>
                    <button onClick={() => signIn()} className="border px-4 py-1 rounded-full border-gray-200 
                                hover:bg-gray-300 hover:text-white hover:border-gray-300">Get Started</button>
                </div>
            ) : (
                <div className="flex items-center space-x-5 text-gray-500">
                    <DropDownAccount up={false}/>
                    <Link href={`/user/${session.userEmail}`}>
                        <button className="border px-4 py-1 rounded-full border-gray-200 
                                hover:bg-gray-300 hover:text-white hover:border-gray-300">Get Started</button>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;