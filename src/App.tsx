import { useState, useMemo, useEffect } from 'react';
import MainLayout from './layout/MainLayout/MainLayout';
import ProjectList from './features/ProjectList/ProjectList';
import ClientGrid from './features/ClientGrid/ClientGrid';
import StatCard from './components/StatCard/StatCard';
import Settings from './features/Settings/Settings';
import { projectsData as initialProjects } from './data/mockData';
import { clientsData } from './data/mockData';
import { Briefcase, Users, DollarSign, PieChart } from 'lucide-react';
import { type Project } from './types/project';
import './styles/variables.css';
import './App.css'; 

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nexus_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : {
      name: 'Neki',
      role: 'Admin',
      email: 'neki@nexus.db'
    };
  });

  useEffect(() => {
    localStorage.setItem('nexus_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nexus_user', JSON.stringify(user));
  }, [user]);

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
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
      user={user}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {(activeTab === 'dashboard' || activeTab === 'projects') && (
        <>
          {activeTab === 'dashboard' && (
            <div className="stats-grid">
              <StatCard title="Активні проєкти" value={stats.activeProjects} icon={Briefcase} />
              <StatCard title="Загальний бюджет" value={`$${stats.totalBudget}`} icon={DollarSign} />
              <StatCard title="Клієнти" value={stats.totalClients} icon={Users} />
              <StatCard title="Сер. прогрес" value={stats.avgProgress} icon={PieChart} />
            </div>
          )}
          <ProjectList 
            projects={projects} 
            searchQuery={searchQuery} 
            onAddProject={handleAddProject} 
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        </>
      )}

      {activeTab === 'clients' && <ClientGrid searchQuery={searchQuery} />}
      
      {activeTab === 'settings' && (
        <Settings user={user} setUser={setUser} />
      )}
    </MainLayout>
  );
}

export default App;