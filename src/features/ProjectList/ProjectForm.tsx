import { useState } from 'react';
import Button from '../../components/Button/Button';
import { type Project, type ProjectStatus } from '../../types/project';
import './ProjectForm.css';

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  onCancel: () => void;
  initialData?: Project | null; 
}

const ProjectForm = ({ onSubmit, onCancel, initialData }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    client: initialData?.client || '',
    budget: initialData?.budget?.toString() || '',
    status: initialData?.status || 'Активний' as ProjectStatus,
    progress: initialData?.progress?.toString() || '0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      name: formData.name,
      client: formData.client,
      budget: Number(formData.budget),
      status: formData.status as ProjectStatus,
      progress: Number(formData.progress),
      deadline: initialData?.deadline || new Date().toISOString()
    });
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
        <Button type="submit">
          {initialData ? 'Зберегти зміни' : 'Створити проєкт'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;