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
    routeLink: 'security',
    icon: 'security',
    label: 'Security',
    items: [
      {
        routeLink: 'security/user',
        label: 'Users',
        icon: 'person_outline'
      }
    ]
  }
]
