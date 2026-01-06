export type ProjectStatus = 'Активний' | 'Завершений' | 'Очікує';

export interface Project {
  id: string;
  name: string;      // Назва
  client: string;    // Клієнт
  budget: number;    // Бюджет
  status: ProjectStatus;
  deadline: string;  // Дедлайн
  progress: number;  // Прогрес у %
}