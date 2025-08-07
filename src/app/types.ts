// Cart related types
export type CartItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export type CartState = {
    items: CartItem[];
    isDropdownOpen: boolean;
};

// Product related types
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export type ProductsState = {
    currentPage: number;
    addedProductId: number | null;
};

// UI related types
export type UIState = {
    isMobileMenuOpen: boolean;
    isHydrated: boolean;
};

// Component prop types
export type CartDropdownProps = {
    isOpen: boolean;
    cartItems: CartItem[];
    itemCount: number;
    onClose: () => void;
};

// Store types
export type RootState = ReturnType<typeof import('./store').store.getState>;