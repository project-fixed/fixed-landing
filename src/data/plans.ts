export interface Plan {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  icon: string;
  backgroundColor: string;
}

export const plans: Plan[] = [
  {
    id: '1',
    providerId: '9915ae0bac504bd6914ef52b7e10643a', // Default / Free
    name: 'Free',
    description: 'Plan ideal para empezar',
    price: 0,
    currency: 'USD',
    features: [
      'Acceso a pronósticos básicos',
      'Análisis de 3 ligas principales',
      'Soporte por email',
      'Actualizaciones diarias',
    ],
    icon: 'pi pi-star',
    backgroundColor: '#f8f9fa',
  },
  {
    id: '2',
    providerId: '0d548561-7ec9-4c8d-a46b-1338f6013bf2',
    name: 'Standard',
    description: 'Para usuarios avanzados',
    price: 9.99,
    currency: 'USD',
    features: [
      'All includ plan Free',
      'Access to fixed outcomes during the period.',
      'Save selected outcomes in your personal history.',
      'Priority email support',
      'Alertas en tiempo real',
      'API de acceso',
    ],
    icon: 'pi pi-crown',
    backgroundColor: '#e3f2fd',
  },
];
