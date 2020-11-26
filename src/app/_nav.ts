import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
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
        name: 'Home',
        url: '',
        icon: 'fa fa-user-md'
      },

      {
        name: 'Update',
        url: '/update',
        icon: 'icon-list'
      },
  ]
  },
  
  {
    name: 'Patient',
    url: '/patient',
    icon: 'fa fa-user',
    children: [
      {
        name: 'Home',
        url: '',
        icon: 'fa fa-user'
      },
      
      {
        name: 'Update',
        url: '/update',
        icon: 'icon-list'
      }
    ]
  }
];
