import { Link } from "@remix-run/react";
import classes from "./Navbar.module.scss";
import { LucideMenu } from "lucide-react";
import { useRef } from "react";

const Navbar = () => {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <nav className={classes.navbar}>
            <div className="container">
                <div className="md:flex justify-between items-center">
                    <div className={classes.logo}>
                        <Link to="/">
                            <span className="font-bold text-blue-200">BASE</span>VATAR
                        </Link>
                        <button
                            onClick={(e) => {
                                menuRef.current && menuRef.current.classList.toggle(classes.active);
                            }}
                        >
                            <LucideMenu size={32} />
                        </button>
                    </div>
                    <div ref={menuRef} className={classes.menu}>
                        <ul>
                            <li>
                                <Link to="/gallery" className="hover:text-blue-100">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link to="/mint" className="hover:text-blue-100">
                                    Mint
                                </Link>
                            </li>
                            <li>
                                <Link to="/vote" className="hover:text-blue-100">
                                    Vote
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-blue-100">
                                    FAQ
                                </Link>
                            </li>
                            <li>
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
