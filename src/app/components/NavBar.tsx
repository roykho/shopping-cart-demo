'use client';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaHome, FaCreditCard } from 'react-icons/fa';
import { RootState } from '../store';

const NavBar = () => {
    const pathname = usePathname();
    const cartItems = useSelector((state: RootState) => state.cart);
    const itemCount = cartItems.length;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

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
                        <Link
                            href="/checkout"
                            className="relative p-3 text-gray-300 hover:text-white transition-all duration-300 group"
                        >
                            <div className="relative">
                                <FaShoppingCart className="text-2xl" />
                                {itemCount > 0 && (
                                    <span className="absolute -bottom-1 -left-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold shadow-lg text-[10px]">
                                        {itemCount}
                                    </span>
                                )}
                            </div>
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl">
                                Cart ({itemCount} items)
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-300 hover:text-white focus:outline-none focus:text-white transition-all duration-300 rounded-lg hover:bg-slate-700"
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
                            onClick={() => setIsMobileMenuOpen(false)}
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
                            onClick={() => setIsMobileMenuOpen(false)}
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