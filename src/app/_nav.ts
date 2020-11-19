import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Colors',
    url: '/base/cards',
    icon: 'icon-drop'
  },
  {
    name: 'Login',
    url: '/login',
    icon: 'icon-star'
  },
  {
    name: 'Medecin',
    url: '/medecin',
    icon: 'icon-drop',
  children: [
    {
      name: 'Mise à jour',
      url: '/medecin/update/1',
      icon: 'icon-cursor'
    },
    {
      name: 'Liste des Médecins',
      url: '/medecin/list',
      icon: 'icon-cursor'
    }]
  }
];
