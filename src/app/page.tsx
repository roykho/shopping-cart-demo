import { Suspense } from 'react';
import Products from './components/Products';

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Products />
        </Suspense>
    );
}
