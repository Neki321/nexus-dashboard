import Sidebar from '../Sidebar/Sidebar';
import TopHeader from '../TopHeader/TopHeader';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch: (query: string) => void;
  user: { name: string; role: string; email: string };
  theme: string;
  toggleTheme: () => void;
}

const MainLayout = ({ children, activeTab, setActiveTab, onSearch, user, theme, toggleTheme }: MainLayoutProps) => {
  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <TopHeader 
            onSearch={onSearch} 
            user={user} 
            theme={theme} 
            toggleTheme={toggleTheme} 
        />
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;