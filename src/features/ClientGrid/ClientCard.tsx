import { ExternalLink } from 'lucide-react';
import './ClientCard.css';

interface ClientCardProps {
  client: any;
}

const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <div className="client-card">
      <div className="client-header">
        <div className="client-avatar" style={{ backgroundColor: client.avatarColor }}>
          {client.name.charAt(0)}
        </div>
        <div className="client-main-info">
          <h4>{client.name}</h4>
          <p>{client.industry}</p>
        </div>
      </div>
      
      <div className="client-stats">
        <div className="c-stat">
          <span>Проєктів</span>
          <strong>{client.totalProjects}</strong>
        </div>
        <div className="c-stat">
          <span>Дохід</span>
          <strong>${client.totalRevenue.toLocaleString()}</strong>
        </div>
      </div>

      <button className="client-details-btn">
        <span>Профіль клієнта</span>
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default ClientCard;