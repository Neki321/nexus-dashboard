import { useState } from 'react';
import Button from '../../components/Button/Button';
import { type Project, type ProjectStatus } from '../../types/project';
import './ProjectForm.css';

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    budget: '',
    status: 'Активний' as ProjectStatus,
    deadline: '',
    progress: '0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      client: formData.client,
      budget: Number(formData.budget),
      status: formData.status,
      deadline: formData.deadline,
      progress: Number(formData.progress)
    };
    onSubmit(newProject);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Назва проєкту</label>
        <input 
          type="text" 
          required 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="Наприклад: CRM для логістики"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Клієнт</label>
          <input 
            type="text" 
            required 
            value={formData.client}
            onChange={e => setFormData({...formData, client: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Бюджет ($)</label>
          <input 
            type="number" 
            required 
            value={formData.budget}
            onChange={e => setFormData({...formData, budget: e.target.value})}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Статус</label>
          <select 
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value as ProjectStatus})}
          >
            <option value="Активний">Активний</option>
            <option value="Очікує">Очікує</option>
            <option value="Завершений">Завершений</option>
          </select>
        </div>
        <div className="form-group">
          <label>Прогрес (%)</label>
          <input 
            type="number" 
            min="0" 
            max="100" 
            value={formData.progress}
            onChange={e => setFormData({...formData, progress: e.target.value})}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button variant="outline" type="button" onClick={onCancel}>Скасувати</Button>
        <Button type="submit">Створити проєкт</Button>
      </div>
    </form>
  );
};

export default ProjectForm;