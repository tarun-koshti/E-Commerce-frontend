import { catchAndAlert } from '@/shared/utils/ExceptionUtil';
import { useState } from 'react';
import { AuthService } from '../classes/auth.service';
import { ISignup } from '../interfaces/signup.interface';

export function SignupForm() {
  const [formData, setFormData] = useState<ISignup>({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = catchAndAlert(async () => {
    const response = await AuthService.signup(formData);
    alert(JSON.stringify(response, null, 2));
  });

  return (
    <div>
      <>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          autoFocus
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
