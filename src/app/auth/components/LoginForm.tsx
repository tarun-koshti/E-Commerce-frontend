import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthService } from '../classes/auth.service';
import { ILogin } from '../interfaces/login.interface';

export function LoginForm() {
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleLogin = catchAndAlert(async () => {
    await AuthService.login(formData);
    router.replace('/');
  });

  return (
    <div>
      <>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          autoFocus
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <br />
      </>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
