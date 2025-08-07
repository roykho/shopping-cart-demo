'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { RootState, CartItem } from '../types';
import { removeItem, hydrateCart } from '../redux/cartSlice';

const EmptyCart = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-600 mb-6">Add some items to your cart to proceed with checkout</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    // Hydrate cart from localStorage on component mount
    useEffect(() => {
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
    }, [dispatch]);

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <div className="space-y-4">
                            {cartItems.map((item: CartItem) => (
                                <div key={item.id} className="flex items-center space-x-4 p-4 border-b border-gray-200 last:border-b-0">
                                    <div className="w-16 h-16 rounded-md overflow-hidden">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeItem(item.id))}
                                        className="cursor-pointer ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                                        title="Remove item"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-900">Total Items:</span>
                                <span className="text-lg font-medium text-gray-900">{cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xl font-bold text-gray-900">Total Price:</span>
                                <span className="text-xl font-bold text-gray-900">
                                    ${cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;