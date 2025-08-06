"use client";

import { useSelector } from 'react-redux';
import { RootState } from './store';

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    console.log(cart);
    return <>Cart</>;
}

export default Cart;