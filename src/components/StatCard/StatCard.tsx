import { type LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative';
}

const StatCard = ({ title, value, icon: Icon, trend, trendType }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrapper">
          <Icon size={24} /> 
        </div>
        {trend && (
          <span className={`stat-trend ${trendType || ''}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;