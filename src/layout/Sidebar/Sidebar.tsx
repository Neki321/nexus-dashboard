import { LayoutDashboard, Users, Briefcase, Settings} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Nexus<span>DB</span></div>
      
      <nav className="sidebar-nav">
        <button className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard size={20} /> <span>Огляд</span>
        </button>

        <button className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          <Briefcase size={20} /> <span>Проєкти</span>
        </button>

        <button className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`} onClick={() => setActiveTab('clients')}>
          <Users size={20} /> <span>Клієнти</span>
        </button>

        <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={20} /> <span>Налаштування</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;