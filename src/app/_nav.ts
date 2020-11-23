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
    icon: 'fa fa-user-md',
  children: [
    {
      name: 'Mise à jour',
      url: '/medecin/update/1',
      icon: 'fa fa-user-md'
    },
    {
      name: 'Liste des Médecins',
      url: '/medecin/list',
      icon: 'icon-list'
    }]
  },
  
  {
    name: 'Patient',
    url: '/patient',
    icon: 'fa fa-user',
    children: [
      {
        name: 'Mise à jour',
        url: '/patient/update/1',
        icon: 'fa fa-user'
      },
      
      {
        name: 'Liste des Patients',
        url: '/patient/list',
        icon: 'icon-list'
      }]
  }
];
