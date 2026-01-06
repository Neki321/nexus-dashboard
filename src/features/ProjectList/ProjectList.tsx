import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import ProjectForm from './ProjectForm';
import { Trash2 } from 'lucide-react';
import { type Project, type ProjectStatus } from '../../types/project';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  searchQuery: string;
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectList = ({ projects, searchQuery, onAddProject, onDeleteProject }: ProjectListProps) => {
  const [filter, setFilter] = useState<ProjectStatus | 'Всі'>('Всі');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filter === 'Всі' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filterOptions: (ProjectStatus | 'Всі')[] = ['Всі', 'Активний', 'Завершений', 'Очікує'];

  return (
    <div className="project-list-container">
      <div className="list-header">
        <h2>Проєкти</h2>
        <div className="header-actions" style={{ display: 'flex', gap: '15px' }}>
          <div className="filter-tabs">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`filter-btn ${filter === option ? 'active' : ''}`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Новий проєкт</Button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="project-table">
          <thead>
            <tr>
              <th>Назва проєкту</th>
              <th>Клієнт</th>
              <th>Бюджет</th>
              <th>Статус</th>
              <th>Прогрес</th>
              <th style={{ textAlign: 'right' }}>Дії</th> 
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td className="project-name">{project.name}</td>
                <td>{project.client}</td>
                <td>${project.budget.toLocaleString()}</td>
                <td><StatusBadge status={project.status} /></td>
                <td>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${project.progress}%` }}></div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    className="delete-btn"
                    onClick={() => onDeleteProject(project.id)}
                    title="Видалити проєкт"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Створити новий проєкт">
        <ProjectForm 
          onSubmit={(data) => {
            onAddProject(data);
            setIsModalOpen(false);
          }} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default ProjectList;