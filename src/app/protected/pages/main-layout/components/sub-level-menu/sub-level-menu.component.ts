import { Component, Input } from '@angular/core';
import { INavbarData } from '../../interfaces/helper';

@Component({
  selector: 'app-sub-level-menu',
  templateUrl: './sub-level-menu.component.html',
  styleUrls: ['./sub-level-menu.component.css']
})
export class SubLevelMenuComponent {
  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }

  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;
}
