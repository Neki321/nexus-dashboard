import { useState, useMemo } from 'react';
import MainLayout from './layout/MainLayout/MainLayout';
import ProjectList from './features/ProjectList/ProjectList';
import ClientGrid from './features/ClientGrid/ClientGrid';
import StatCard from './components/StatCard/StatCard';
import { projectsData as initialProjects } from './data/mockData';
import { clientsData } from './data/mockData';
import { Briefcase, Users, DollarSign, PieChart } from 'lucide-react';
import { type Project } from './types/project';
import './styles/variables.css';
import './App.css'; 

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей проєкт?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const stats = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'Активний').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const avgProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) 
      : 0;

    return {
      activeProjects,
      totalBudget: totalBudget.toLocaleString(),
      totalClients: clientsData.length,
      avgProgress: `${avgProgress}%`
    };
  }, [projects]);

  return (
    <MainLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onSearch={setSearchQuery}
    >
      {activeTab === 'dashboard' && (
        <>
          <div className="stats-grid">
            <StatCard title="Активні проєкти" value={stats.activeProjects} icon={Briefcase} />
            <StatCard title="Загальний бюджет" value={`$${stats.totalBudget}`} icon={DollarSign} />
            <StatCard title="Клієнти" value={stats.totalClients} icon={Users} />
            <StatCard title="Сер. прогрес" value={stats.avgProgress} icon={PieChart} />
          </div>
          <ProjectList 
            projects={projects} 
            searchQuery={searchQuery} 
            onAddProject={handleAddProject} 
            onDeleteProject={handleDeleteProject} 
          />
        </>
      )}

      {activeTab === 'projects' && (
        <ProjectList 
          projects={projects} 
          searchQuery={searchQuery} 
          onAddProject={handleAddProject} 
          onDeleteProject={handleDeleteProject}
        />
      )}

      {activeTab === 'clients' && <ClientGrid searchQuery={searchQuery} />}
      
      {activeTab === 'settings' && (
        <div className="placeholder-card">Налаштування профілю (В розробці)</div>
      )}
    </MainLayout>
  );
}

export default App;