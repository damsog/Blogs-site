import Link from "next/link";


const Header = () => {
    return (
        <header>
            <div>
                <Link href="/">
                    <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" 
                    alt="" />
                </Link>
            </div>
            <div>

            </div>
        </header>
    );
}

export default Header;