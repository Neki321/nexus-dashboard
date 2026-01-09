import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      title={theme === 'light' ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;