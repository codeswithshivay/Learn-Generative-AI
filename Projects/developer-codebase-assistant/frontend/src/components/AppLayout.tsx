import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function AppLayout() {
  const { user, logout } = useAuth();
  async function handleLogout() {
    try { await logout(); } catch { /* Keep the authenticated state if the server did not confirm logout. */ }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <NavLink className="brand" to="/projects">
            <span className="brand-mark" aria-hidden="true">D</span>
            <span>Developer Codebase Assistant</span>
          </NavLink>
          <nav aria-label="Main navigation">
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to="/projects"
              end
            >
              Projects
            </NavLink>
            <span className="user-email">{user?.email}</span>
            <button className="button button-ghost logout-button" type="button" onClick={handleLogout}>Log out</button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
