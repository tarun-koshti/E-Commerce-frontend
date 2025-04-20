'use client';
import { useEffect, useState } from 'react';
import Navigation from './navigation';

export default function HeaderComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <header>
      <Navigation />
      <hr />
    </header>
  );
}
