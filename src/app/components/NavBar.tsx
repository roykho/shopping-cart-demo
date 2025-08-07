'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart  } from 'react-icons/fa';
import { RootState } from '../store';
import CartDropdown from './CartDropdown';
import { toggleDropdown, closeDropdown } from '../cartSlice';
import { toggleMobileMenu, closeMobileMenu } from '../uiSlice';

const NavBar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const itemCount = cartItems.length;
    const isCartDropdownOpen = useSelector((state: RootState) => state.cart.isDropdownOpen);
    const isMobileMenuOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen);

    const isActive = (path: string) => pathname === path;

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(toggleDropdown());
    };

    const cartDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
                dispatch(closeDropdown());
            }
        };

        if (isCartDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartDropdownOpen, dispatch]);

    return (
        <nav className="bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-700/50 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 text-2xl font-bold text-blue-400 hover:text-blue-300 transition-all duration-300"
                        >
                            <div className="p-2 bg-blue-500 rounded-xl">
                                <FaShoppingCart className="text-white text-xl" />
                            </div>
                            <span>ShopCart</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            <Link
                                href="/"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    isActive('/')
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-700'
                                }`}
                            >
                                <span>Products</span>
                            </Link>

                            <Link
                                href="/checkout"
                                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    isActive('/checkout')
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-700'
                                }`}
                            >
                                <span>Checkout</span>
                            </Link>
                        </div>
                    </div>

                    {/* Shopping Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={cartDropdownRef}>
                            <button
                                onClick={handleCartClick}
                                className="relative p-3 text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer"
                            >
                                <div className="relative">
                                    <FaShoppingCart className="text-2xl" />
                                    {itemCount > 0 && (
                                        <span className="absolute -bottom-1 -left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold shadow-lg text-[10px]">
                                            {itemCount}
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Cart Dropdown */}
                            <CartDropdown
                                isOpen={isCartDropdownOpen}
                                cartItems={cartItems}
                                itemCount={itemCount}
                                onClose={() => dispatch(closeDropdown())}
                            />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => dispatch(toggleMobileMenu())}
                            className="p-2 text-gray-300 hover:text-white focus:outline-none focus:text-white transition-all duration-300 rounded-lg hover:bg-slate-700 cursor-pointer"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50">
                        <Link
                            href="/"
                            onClick={() => dispatch(closeMobileMenu())}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                isActive('/')
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                            }`}
                        >
                            <span>Products</span>
                        </Link>

                        <Link
                            href="/checkout"
                            onClick={() => dispatch(closeMobileMenu())}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                isActive('/checkout')
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                            }`}
                        >
                            <span>Checkout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;