import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ApiError } from '../api/client';
import { projectsApi, type Project } from '../api/projects';

export function ProjectsPage() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    projectsApi.list().then(({ projects: loadedProjects }) => {
      if (!isCurrent) return;
      setProjects(loadedProjects);
      setError(null);
    }).catch((requestError: unknown) => {
      if (!isCurrent) return;
      setError(requestError instanceof ApiError && requestError.status === 401
        ? 'Your session has expired. Please sign in again.'
        : requestError instanceof Error ? requestError.message : 'Projects could not be loaded.');
    }).finally(() => {
      if (isCurrent) setIsLoading(false);
    });

    return () => { isCurrent = false; };
  }, []);

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

      {location.state?.notice && <div className="form-notice" role="status">{location.state.notice}</div>}

      {isLoading && <div className="panel status-panel" role="status">Loading your projects…</div>}

      {!isLoading && error && (
        <div className="panel status-panel error-state" role="alert">
          <h2>Projects could not be loaded</h2>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <div className="panel empty-state">
          <div className="empty-state-icon" aria-hidden="true">+</div>
          <h2>No projects yet</h2>
          <p>Create your first project to get started.</p>
          <Link className="button button-secondary" to="/projects/new">
            Create a project
          </Link>
        </div>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <div className="project-grid" aria-label="Your projects">
          {projects.map((project) => (
            <Link className="panel project-card" key={project._id} to={`/projects/${project._id}/chat`}>
              <h2>{project.name}</h2>
              <p className="project-path">{project.path}</p>
              <p className="project-updated">Updated {formatDate(project.updatedAt)}</p>
              <span className="project-card-action">Open chat →</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'recently' : date.toLocaleDateString();
}
