'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BsShop } from 'react-icons/bs';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { RootState, CartItem } from '../types';
import CartDropdown from './CartDropdown';
import { toggleDropdown, closeDropdown, hydrateCart, removeItem, clearCart } from '../redux/cartSlice';
import { toggleMobileMenu, closeMobileMenu, setHydrated } from '../redux/uiSlice';

const NavBar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const itemCount = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
    const isCartDropdownOpen = useSelector((state: RootState) => state.cart.isDropdownOpen);
    const isMobileMenuOpen = useSelector((state: RootState) => state.ui.isMobileMenuOpen);
    const isHydrated = useSelector((state: RootState) => state.ui.isHydrated);

    const isActive = (path: string) => pathname === path;

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(toggleDropdown());
    };

    const cartDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hydrate cart from localStorage on component mount
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    dispatch(hydrateCart(parsedCart));
                } catch (error) {
                    console.error('Error parsing cart from localStorage:', error);
                }
            }
        }
        dispatch(setHydrated());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Check if click is on the cart dropdown container
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(target)) {
                // Check if click is on the mobile cart dropdown
                const mobileCartDropdown = document.querySelector('[data-mobile-cart-dropdown]');
                if (!mobileCartDropdown || !mobileCartDropdown.contains(target)) {
                    dispatch(closeDropdown());
                }
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
		<nav className='bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-md border-b border-slate-700/50 fixed top-0 left-0 right-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-20'>
					{/* Logo/Brand */}
					<div className='flex-shrink-0'>
						<Link
							href='/'
							className='flex items-center space-x-3 text-2xl font-bold text-blue-400 hover:text-blue-300 transition-all duration-300'
						>
							<div className='p-2'>
								<div className='text-4xl bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-md'>
									<BsShop className='text-white' />
								</div>
							</div>
							<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">ShopCart</span>
						</Link>
					</div>

					{/* Navigation Links */}
					<div className='hidden md:block'>
						<div className='ml-10 flex items-baseline space-x-1'>
							<Link
								href='/'
								className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
									isActive('/')
										? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
										: 'text-gray-300 hover:text-white hover:bg-slate-700'
								}`}
							>
								<span>Products</span>
							</Link>

							<Link
								href='/checkout'
								className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
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
					<div className='flex items-center space-x-4'>
						<div className='relative' ref={cartDropdownRef}>
							<button
								onClick={handleCartClick}
								className='relative p-3 text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer'
							>
								<div className='relative'>
									<LiaShoppingBagSolid className='text-4xl' />
									{isHydrated && itemCount > 0 && (
										<span className='absolute -bottom-1 -left-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold shadow-lg text-[10px]'>
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
					<div className='md:hidden'>
						<button
							onClick={() => dispatch(toggleMobileMenu())}
							className='p-2 text-gray-300 hover:text-white focus:outline-none focus:text-white transition-all duration-300 rounded-lg hover:bg-slate-700 cursor-pointer'
						>
							<svg
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`md:hidden transition-all duration-300 ${
						isMobileMenuOpen ? 'block' : 'hidden'
					}`}
				>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50'>
						<Link
							href='/'
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
							href='/checkout'
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

				{/* Mobile Cart Dropdown */}
				<div
					data-mobile-cart-dropdown
					className={`md:hidden transition-all duration-300 ${
						isCartDropdownOpen ? 'block' : 'hidden'
					}`}
				>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800'>
						<div className='flex items-center justify-between mb-4 px-4'>
							<h3 className='text-lg font-semibold text-white'>
								Shopping Cart
							</h3>
							<span className='text-sm text-gray-300'>
								{itemCount} items
							</span>
						</div>

						{itemCount > 0 ? (
							<>
								<div className='space-y-2 max-h-64 overflow-y-auto'>
									{cartItems.map((item: CartItem) => (
										<div
											key={item.id}
											className='flex items-center justify-between p-3 bg-slate-700/50 rounded-lg mx-2'
										>
											<div className='flex items-center space-x-3 flex-1 min-w-0'>
												<Image
													src={item.imageUrl}
													alt={item.name}
													width={48}
													height={48}
													className='w-12 h-12 object-cover rounded flex-shrink-0'
												/>
												<div className='min-w-0 flex-1'>
													<p className='font-medium text-white truncate'>
														{item.name}
													</p>
													<p className='text-sm text-gray-300'>
														${item.price} × {item.quantity}
													</p>
												</div>
											</div>
											<button
												onClick={(e) => {
													e.stopPropagation();
													dispatch(removeItem(item.id));
												}}
												className='text-red-400 hover:text-red-300 text-sm font-medium cursor-pointer p-2 -m-2 rounded-md hover:bg-red-500/20 transition-colors duration-200 flex-shrink-0'
											>
												Remove
											</button>
										</div>
									))}
								</div>
								<div className='border-t border-slate-700/50 pt-3 mt-3 px-4'>
									<div className='flex items-center justify-between mb-3'>
										<span className='font-semibold text-white'>
											Total:
										</span>
										<span className='font-semibold text-white'>
											$
											{cartItems
												.reduce(
													(total: number, item: CartItem) =>
														total +
														item.price * item.quantity,
													0
												)
												.toFixed(2)}
										</span>
									</div>
									<div className='flex flex-col space-y-2'>
										<button
											onClick={(e) => {
												e.stopPropagation();
												dispatch(clearCart());
											}}
											className='w-full border border-gray-300 text-gray-300 py-3 px-4 rounded-md hover:bg-slate-700 hover:text-white transition-colors duration-200 text-center cursor-pointer font-medium'
										>
											Clear Cart
										</button>
										<Link
											href='/checkout'
											onClick={(e) => {
												e.stopPropagation();
												dispatch(closeDropdown());
											}}
											className='w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 text-center block cursor-pointer font-medium'
										>
											Checkout
										</Link>
									</div>
								</div>
							</>
						) : (
							<div className='text-center py-8 px-4'>
								<FaRegFaceSadTear className='text-4xl text-gray-400 mx-auto mb-3' />
								<p className='text-gray-300'>Your cart is empty</p>
							</div>
						)}
					</div>
				</div>


			</div>
		</nav>
	);
};

export default NavBar;