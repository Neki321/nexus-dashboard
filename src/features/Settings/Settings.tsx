import { useState } from 'react';
import Button from '../../components/Button/Button';
import './Settings.css';

interface SettingsProps {
  user: { name: string; role: string; email: string };
  setUser: (user: any) => void;
}

const Settings = ({ user, setUser }: SettingsProps) => {
  const [formData, setFormData] = useState(user);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    alert('Налаштування збережено успішно!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Налаштування профілю</h2>
        <p>Керуйте своєю особистою інформацією та параметрами облікового запису</p>
      </div>

      <div className="settings-card">
        <form onSubmit={handleSave} className="settings-form">
          <div className="form-section">
            <h3>Особисті дані</h3>
            <div className="form-group">
              <label>Ваше ім'я</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Посада / Роль</label>
              <input 
                type="text" 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email адреса</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="settings-actions">
            <Button type="submit">Зберегти зміни</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;