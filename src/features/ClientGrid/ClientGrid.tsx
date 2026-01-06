import ClientCard from './ClientCard';
import { clientsData } from '../../data/mockData';
import './ClientGrid.css';

interface ClientGridProps {
  searchQuery: string;
}

const ClientGrid = ({ searchQuery }: ClientGridProps) => {
  const filteredClients = clientsData.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="client-grid-container">
      <div className="list-header">
        <h2>Наші клієнти</h2>
      </div>
      <div className="client-grid">
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      {filteredClients.length === 0 && (
        <div className="no-results">Клієнтів не знайдено.</div>
      )}
    </div>
  );
};

export default ClientGrid;