'use client';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white py-4">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href='/'>My App</Link></h1>
                <div className="space-x-6">
                    <Link className="hover:text-gray-300" href="/home">
                        Home
                    </Link>
                    <Link className="hover:text-gray-300" href="/pricing">
                        Pricing
                    </Link>
                    <Link className="hover:text-gray-300" href="./profile">
                        Profile
                    </Link>
                    <Link className="hover:text-gray-300" href="./task">
                        Tasks
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
