import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from '../../interfaces/helper';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sub-level-menu',
  templateUrl: './sub-level-menu.component.html',
  styleUrls: ['../../.././main-layout/main-layout.component.css'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SubLevelMenuComponent implements OnInit{
  ngOnInit(): void {

  }
  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  handleClick(item: any): void {
    if(!this.multiple) {
      if(this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if(item !== modelItem && modelItem.expanded){
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

}
