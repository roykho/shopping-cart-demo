'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaShoppingCart, FaStar, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { addItem } from '../cartSlice';
import { setCurrentPage, setAddedProductId, clearAddedProductId } from '../productsSlice';
import { RootState } from '../types';
import productsData from '../data/products.json';
import { Product } from '../types';

const Products = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = useSelector((state: RootState) => state.products.currentPage);
    const addedProductId = useSelector((state: RootState) => state.products.addedProductId);
    const productsPerPage = 8;

    // Import products data
    const products = useMemo((): Product[] => productsData, []);

    const handleAddToCart = (product: Product) => {
        dispatch(addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        }));

        // Show visual feedback
        dispatch(setAddedProductId(product.id));
        setTimeout(() => dispatch(clearAddedProductId()), 2000); // Hide after 2 seconds
    };

    const getRating = (productId: number) => {
        // Use product ID to generate consistent rating
        return 4 + (productId % 2); // Alternates between 4 and 5
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = useMemo(() => products.slice(startIndex, endIndex), [products, startIndex, endIndex]);

    // Initialize page from URL params
    useEffect(() => {
        const pageParam = searchParams.get('page');
        const page = pageParam ? parseInt(pageParam, 10) : 1;
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page));
        }
    }, [searchParams, totalPages, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));

        // Update URL with new page
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
                <p className="text-gray-600">Discover our premium selection of tech products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        {/* Product Image */}
                        <div className="relative overflow-hidden">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={400}
                                height={192}
                                priority={true}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-md">
                                <div className="flex items-center space-x-1">
                                    <FaStar className="text-yellow-400 text-sm" />
                                    <span className="text-sm font-medium text-gray-700">{getRating(product.id)}.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {product.description}
                            </p>

                            {/* Price and Add to Cart */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                                        addedProductId === product.id
                                            ? 'bg-green-500 text-white scale-105'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    {addedProductId === product.id ? (
                                        <>
                                            <FaCheck className="text-sm" />
                                            <span>Added!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaShoppingCart className="text-sm" />
                                            <span>Add</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                                currentPage === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                            }`}
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                                    currentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                                currentPage === totalPages
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                            }`}
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Page Info */}
            <div className="mt-4 text-center text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
            </div>
        </div>
    );
};

export default Products;