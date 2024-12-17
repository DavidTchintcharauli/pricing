'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
      <div>
        {isClient ? 'Client Rendered to index page' : 'Server Rendered'}
      </div>
  );
}
