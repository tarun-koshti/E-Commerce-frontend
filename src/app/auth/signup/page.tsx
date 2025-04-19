'use client';
import Link from 'next/link';
import { SignupForm } from '../components/SignupForm';

export default function SignupPage() {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
      <p>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
      <Link href="/auth/login">Login</Link>
    </div>
  );
}
