'use client';

import Link from 'next/link';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>Don&apos;t have an account?</p>
      <Link href="/auth/signup">Sign Up</Link>
    </div>
  );
}
