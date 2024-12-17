'use client';

import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-lg text-gray-600 mt-4">Oops! Page not found.</p>
            <Link href="/">
                    Back to Home
            </Link>
        </div>
    );
};

export default Custom404;
