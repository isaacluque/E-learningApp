import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { navbarData } from '../../interfaces/navbar-data.interface';
import { INavbarData } from '../../interfaces/helper';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class SidenavComponent {
  navData = navbarData;
    multiple: boolean = false;


  handleClick(item: INavbarData): void {
    if(!this.multiple) {
      for(let modelItem of this.navData) {
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
