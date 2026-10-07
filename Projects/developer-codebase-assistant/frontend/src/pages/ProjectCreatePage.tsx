import { Link } from 'react-router-dom';
import { ProjectForm } from '../components/ProjectForm';

export function ProjectCreatePage() {
  return (
    <section className="page-section narrow-section" aria-labelledby="create-project-title">
      <div className="page-heading compact-heading">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 id="create-project-title">Create a project</h1>
          <p className="page-description">
            Add the name and local location for a codebase you want to manage.
          </p>
        </div>
      </div>
      <ProjectForm />
      <Link className="back-link" to="/projects">← Back to projects</Link>
    </section>
  );
}
