import Link from "next/link";


const Header = () => {
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
            <div className="flex items-center space-x-5 text-green-500">
                <button className="hover:text-green-700">Sign In</button>
                <button className="border px-4 py-1 rounded-full border-green-200 
                                    hover:bg-green-500 hover:text-white hover:border-green-500">Get Started</button>
            </div>
        </header>
    );
}

export default Header;