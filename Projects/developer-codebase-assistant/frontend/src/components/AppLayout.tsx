import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
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
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
