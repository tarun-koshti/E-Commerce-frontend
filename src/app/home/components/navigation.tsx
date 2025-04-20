'use client';
import { TokenService } from '@/app/auth/classes/tokenService';
import { useAuth } from '@/shared/guard/authContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsAuthenticated(TokenService.isAuthenticated());
    setIsClient(true);
  }, [isAuthenticated, setIsAuthenticated]);

  if (!isClient || typeof window === 'undefined') {
    return <div>Loading...</div>;
  }

  const logout = () => {
    TokenService.removeToken();
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-green-200 p-4">
      <nav className="bg-green-200 p-4">
        <ul className="nav-links flex space-x-4">
          <li>
            <Link href="/" className="text-yellow-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="text-yellow-500">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/product" className="text-yellow-500">
              Products
            </Link>
          </li>
          <li>
            <Link href="/category" className="text-yellow-500">
              Category
            </Link>
          </li>
        </ul>
        {!isAuthenticated ? (
          <ul className="nav-links flex space-x-4">
            <li>
              <Link href="/auth/signup" className="text-yellow-500">
                Signup
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="text-yellow-500">
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-links flex space-x-4">
            <li>
              <Link className="text-yellow-500" onClick={logout} href="/">
                Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <hr />
    </header>
  );
};

export default Navigation;
