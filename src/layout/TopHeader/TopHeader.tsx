import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { Search } from 'lucide-react';
import './TopHeader.css';

interface TopHeaderProps {
  onSearch: (query: string) => void;
  user: { name: string; role: string; email: string };
  theme: string;
  toggleTheme: () => void;
}

const TopHeader = ({ onSearch, user, theme, toggleTheme }: TopHeaderProps) => {
  return (
    <header className="top-header">
      <div className="search-box">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Пошук..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
      
      <div className="header-actions">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="user-profile">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div className="user-info">
             <span className="user-name">{user.name}</span>
             <span className="user-role">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;