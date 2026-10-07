import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FormValues = { name: string; path: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: '', path: '' };

export function ProjectForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(nextValues: FormValues): FormErrors {
    const nextErrors: FormErrors = {};
    if (!nextValues.name.trim()) nextErrors.name = 'Project name is required.';
    if (!nextValues.path.trim()) nextErrors.path = 'Project path is required.';
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  return (
    <form className="panel project-form" onSubmit={handleSubmit} noValidate>
      {submitted && (
        <div className="form-notice" role="status">
          Project details are valid and ready for backend integration. Nothing has been saved yet.
        </div>
      )}
      <div className="form-field">
        <label htmlFor="project-name">Project name</label>
        <input
          id="project-name"
          name="name"
          type="text"
          placeholder="e.g. Developer Portal"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'project-name-error' : undefined}
        />
        {errors.name && <p className="field-error" id="project-name-error">{errors.name}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="project-path">Project path or location</label>
        <input
          id="project-path"
          name="path"
          type="text"
          placeholder="e.g. C:\\Projects\\developer-portal"
          value={values.path}
          onChange={(event) => updateField('path', event.target.value)}
          aria-invalid={Boolean(errors.path)}
          aria-describedby={errors.path ? 'project-path-error' : undefined}
        />
        <p className="field-help">Enter the path manually for now. Folder selection will be added later.</p>
        {errors.path && <p className="field-error" id="project-path-error">{errors.path}</p>}
      </div>
      <div className="form-actions">
        <button className="button button-primary" type="submit">Validate project</button>
        <button className="button button-ghost" type="button" onClick={() => navigate('/projects')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
