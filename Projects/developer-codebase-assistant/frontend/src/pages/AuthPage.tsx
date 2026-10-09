import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

type Props = { mode: 'login' | 'register' };

export function AuthPage({ mode }: Props) {
  const isLogin = mode === 'login';
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!isLogin && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (isLogin) await login(normalizedEmail, password);
      else await register(normalizedEmail, password);
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname;
      navigate(from && from !== '/login' ? from : '/projects', { replace: true });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to complete the request.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="panel auth-card" aria-labelledby="auth-title">
        <p className="eyebrow">Developer Codebase Assistant</p>
        <h1 id="auth-title">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className="page-description">{isLogin ? 'Log in to access your projects.' : 'Start building your workspace.'}</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" name="password" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <button className="button button-primary auth-submit" type="submit" disabled={submitting}>
            {submitting ? 'Please wait…' : isLogin ? 'Log in' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? 'Need an account? ' : 'Already registered? '}
          <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Register' : 'Log in'}</Link>
        </p>
      </section>
    </main>
  );
}
