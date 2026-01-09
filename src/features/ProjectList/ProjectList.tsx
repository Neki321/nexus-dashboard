import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import ProjectForm from './ProjectForm';
import { Trash2, Edit2 } from 'lucide-react';
import { type Project, type ProjectStatus } from '../../types/project';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  searchQuery: string;
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectList = ({ projects, searchQuery, onAddProject, onUpdateProject, onDeleteProject }: ProjectListProps) => {
  const [filter, setFilter] = useState<ProjectStatus | 'Всі'>('Всі');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filter === 'Всі' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

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
          <Button onClick={handleOpenCreate}>+ Новий проєкт</Button>
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
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      className="action-btn edit"
                      onClick={() => handleOpenEdit(project)}
                      title="Редагувати"
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '6px' }}
                    >
                      <Edit2 size={18} />
                    </button>
                    
                    <button 
                      className="action-btn delete"
                      onClick={() => onDeleteProject(project.id)}
                      title="Видалити"
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '6px' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProject ? "Редагувати проєкт" : "Створити новий проєкт"}
      >
        <ProjectForm 
          onSubmit={(data) => {
            if (editingProject) onUpdateProject(data);
            else onAddProject(data);
            handleCloseModal();
          }} 
          onCancel={handleCloseModal}
          initialData={editingProject} 
        />
      </Modal>
    </div>
  );
};

export default ProjectList;