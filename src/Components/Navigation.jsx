import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './navigation.scss';

export default function Navigation(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
    
    const navLinkClass = ({ isActive }) => 
        isActive 
            ? "text-2xl md:text-lg text-white font-bold border-b-2 border-red-700 py-3 md:py-2 block md:inline-block" 
            : "text-2xl md:text-lg text-gray-300 hover:text-white transition-colors py-3 md:py-2 block md:inline-block";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return(
        <nav className="relative flex items-center justify-between px-4 md:px-8 py-4 bg-black bg-opacity-80 shadow-lg">
            {/* Logo */}
            <NavLink 
                to="/" 
                onClick={closeMenu}
                className={({ isActive }) => 
                    isActive 
                        ? "text-lg md:text-2xl font-extrabold text-red-700 tracking-wide z-50" 
                        : "text-lg md:text-2xl font-extrabold text-white tracking-wide hover:text-red-700 transition-colors z-50"
                }
            >
                <img src="/soul-alliance/Icon.png" alt="SOUL Alliance Logo" className="h-12 w-auto" />
            </NavLink>

            {/* Burger Menu Button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden z-50 flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Navigation Links - Desktop & Mobile Menu */}
            <div className={`
                fixed md:static inset-0 md:inset-auto
                bg-black/95 md:bg-transparent
                flex flex-col md:flex-row items-center justify-center md:items-center 
                gap-8 md:gap-8
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}
                z-40
            `}>
                <NavLink to="/" className={navLinkClass} onClick={closeMenu} end>
                    Home
                </NavLink>
                <NavLink to="/events" className={navLinkClass} onClick={closeMenu}>
                    Events
                </NavLink>
                <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
                    About
                </NavLink>
                <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>
                    Contact
                </NavLink>
                {isAuthenticated ? (
                    <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenu}>
                        Dashboard
                    </NavLink>
                ) : (
                    <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    )
}