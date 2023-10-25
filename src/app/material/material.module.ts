import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatRippleModule,
    MatDividerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatListModule,
    MatTabsModule,

    MatExpansionModule,
  ]
})
export class MaterialModule { }
