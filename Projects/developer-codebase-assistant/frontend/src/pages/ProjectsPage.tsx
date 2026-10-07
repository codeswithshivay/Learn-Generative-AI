import { Link } from 'react-router-dom';

export function ProjectsPage() {
  return (
    <section className="page-section" aria-labelledby="projects-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 id="projects-title">Projects</h1>
          <p className="page-description">
            Manage the codebases you want to understand and work with.
          </p>
        </div>
        <Link className="button button-primary" to="/projects/new">
          New project
        </Link>
      </div>

      <div className="panel empty-state">
        <div className="empty-state-icon" aria-hidden="true">+</div>
        <h2>No projects yet</h2>
        <p>
          Create your first project to get started. Project storage and backend
          integration will be added in a later milestone.
        </p>
        <Link className="button button-secondary" to="/projects/new">
          Create a project
        </Link>
      </div>
    </section>
  );
}
