import { type Project } from '../types/project';
import { type Client } from '../types/client';

export const projectsData: Project[] = [
  {
    id: '1',
    name: 'CRM для медичного центру',
    client: 'HealthyLife',
    budget: 12500,
    status: 'Активний',
    deadline: '24.03.2026',
    progress: 65
  },
  {
    id: '2',
    name: 'Ребрендинг порталу новин',
    client: 'MediaGroup',
    budget: 8200,
    status: 'Завершений',
    deadline: '10.01.2026',
    progress: 100
  },
  {
    id: '3',
    name: 'Мобільний додаток для доставки',
    client: 'QuickFood',
    budget: 21000,
    status: 'Очікує',
    deadline: '15.05.2026',
    progress: 0
  },
  {
    id: '4',
    name: 'Автоматизація складу',
    client: 'LogixWare',
    budget: 15800,
    status: 'Активний',
    deadline: '01.04.2026',
    progress: 40
  }
];

export const clientsData: Client[] = [
  { id: '1', name: 'TechFlow Solutions', industry: 'IT Consulting', totalProjects: 4, totalRevenue: 45000, avatarColor: '#4f46e5' },
  { id: '2', name: 'GreenEco Trade', industry: 'E-commerce', totalProjects: 2, totalRevenue: 12000, avatarColor: '#10b981' },
  { id: '3', name: 'Global Logistics', industry: 'Transportation', totalProjects: 5, totalRevenue: 89000, avatarColor: '#f59e0b' },
  { id: '4', name: 'Skyline Architecture', industry: 'Construction', totalProjects: 1, totalRevenue: 25000, avatarColor: '#ef4444' },
];