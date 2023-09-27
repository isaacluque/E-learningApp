import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'home',
    label: 'Dashboard'
  },
  {
    routeLink: '',
    icon: 'school',
    label: 'Courses'
  },
  {
    routeLink: '',
    icon: 'security',
    label: 'Security',
    items: [
      {
        routeLink: 'security/users',
        label: 'Users',
        icon: 'person_outline'
      }
    ]
  }
]
