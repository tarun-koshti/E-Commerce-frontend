import Link from 'next/link';

export const HeaderComponent = () => {
  return (
    <header>
      <p>E-Commerce</p>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
