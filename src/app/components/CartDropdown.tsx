'use client';

import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegFaceSadTear } from 'react-icons/fa6';
import { removeItem, clearCart } from '../redux/cartSlice';
import { CartItem, CartDropdownProps } from '../types';

const CartDropdown = ({ isOpen, cartItems, itemCount, onClose }: CartDropdownProps) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <div className='hidden md:block absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden'>
            <div className='p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                        Shopping Cart
                    </h3>
                    <span className='text-sm text-gray-500'>
                        {itemCount} items
                    </span>
                </div>

                {itemCount > 0 ? (
                    <>
                        <div className='max-h-48 overflow-y-auto space-y-3 pr-2 -mr-2'>
                            {cartItems.map((item: CartItem) => (
                                <div
                                    key={item.id}
                                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
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
                                            <p className='font-medium text-gray-900 truncate'>
                                                {item.name}
                                            </p>
                                            <p className='text-sm text-gray-600'>
                                                ${item.price} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            dispatch(removeItem(item.id))
                                        }
                                        className='text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer p-2 -m-2 rounded-md hover:bg-red-50 transition-colors duration-200 flex-shrink-0'
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='border-t pt-3 mt-3'>
                            <div className='flex items-center justify-between mb-3'>
                                <span className='font-semibold text-gray-900'>
                                    Total:
                                </span>
                                <span className='font-semibold text-gray-900'>
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
                            <div className='flex space-x-2'>
                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className='flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-center cursor-pointer font-medium'
                                >
                                    Clear Cart
                                </button>
                                <Link
                                    href='/checkout'
                                    onClick={onClose}
                                    className='flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 text-center block cursor-pointer font-medium'
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='text-center py-8'>
                        <FaRegFaceSadTear className='text-4xl text-gray-300 mx-auto mb-3' />
                        <p className='text-gray-500'>Your cart is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDropdown;