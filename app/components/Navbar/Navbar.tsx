import { Link } from "@remix-run/react";

const Navbar = () => {
    return (
        <nav className="py-6">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="logo text-4xl">
                        <Link to="/">
                            <span className="font-bold text-blue-200">BASE</span>VATAR
                        </Link>
                    </div>
                    <div className="menu text-lg">
                        <ul className="flex items-center font-semibold">
                            <li className="mx-4">
                                <Link to="/gallery" className="hover:text-blue-100">
                                    Gallery
                                </Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/mint" className="hover:text-blue-100">
                                    Mint
                                </Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/vote" className="hover:text-blue-100">
                                    Vote
                                </Link>
                            </li>
                            <li className="mx-4">
                                <button className="border-2 border-white py-2 px-2 hover:bg-white hover:text-black">
                                    CONNECT WALLET
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
