'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

let c: any = console.log('Publishable Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


  return (
      <div>
        {isClient ? 'Client Rendered to index page' : 'Server Rendered'}
        {c}
      </div>
  );
}
