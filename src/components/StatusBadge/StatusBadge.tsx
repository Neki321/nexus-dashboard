import './StatusBadge.css';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClass = status.toLowerCase().replace(' ', '-');
  return (
    <span className={`status-badge ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;