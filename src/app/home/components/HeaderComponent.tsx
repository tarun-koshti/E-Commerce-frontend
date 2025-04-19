import { AuthService } from '@/app/auth/classes/auth.service';
import Link from 'next/link';
import { useState } from 'react';

export const HeaderComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  return (
    <header>
      <p>E-Commerce</p>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  AuthService.logout();
                  setIsAuthenticated(false);
                }}
              >
                Logout
              </button>
            ) : (
              <Link href="/auth/login">Login</Link>
            )}
          </li>
          <li>{isAuthenticated && <Link href="/category">Category</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};
