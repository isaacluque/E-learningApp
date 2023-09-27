import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'home',
    label: 'Dashboard'
  },
  {
    routeLink: 'courses',
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
        label: 'Users'
      }
    ]
  }
]
