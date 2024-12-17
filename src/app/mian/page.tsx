'use client';


import Link from 'next/link';

export default function Home(){
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Welcome to My App</h1>
            <p>Your one-stop solution for [describe your app's purpose].</p>
            
            <div style={{ marginTop: '2rem' }}>
                <h2>Explore Our Plans</h2>
                <p>
                    We offer both free and premium versions of our services.
                    Check out the details on the pricing page!
                </p>
                <Link href="/pricing">
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>View Pricing</button>
                </Link>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
                <h2>Already a Member?</h2>
                <p>
                    Access your profile to manage your subscription or explore premium features.
                </p>
                <Link href="/profile">
                    <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Go to Profile</button>
                </Link>
            </div>
        </div>
    );
};