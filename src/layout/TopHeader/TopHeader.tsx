import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { Search } from 'lucide-react';
import './TopHeader.css';

const currentUser = { name: "Гість", role: "Адміністратор" }; // Поки немає логіну

interface TopHeaderProps {
  onSearch: (query: string) => void;
}

const TopHeader = ({ onSearch }: TopHeaderProps) => {
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
        <ThemeToggle />
        <div className="user-profile">
          <div className="avatar">{currentUser.name.charAt(0)}</div>
          <div className="user-info">
             <span className="user-name">{currentUser.name}</span>
             <span className="user-role">{currentUser.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;