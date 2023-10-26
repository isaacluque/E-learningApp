import { Component, Input, inject, OnInit, AfterViewInit } from '@angular/core';
import { RoleService } from '../../../role/services/role.service';
import { DetailsService } from '../../../details/services/details.service';
import { Role } from '../../../role/interfaces/role';
import { ViewUser } from '../../interfaces/view-users.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  ngOnInit(): void {
    this.getRole();
  }

  @Input() id_user: number = 0;
  @Input() user: string = "";
  @Input() username: string = "";
  @Input() status: string = "";
  @Input() id_role: number = 0;
  @Input() email: string = "";


  private roleservice = inject(RoleService);

  public roles: Role[] = [];

  getRole() {
    this.roleservice.getUsers().subscribe(resp => {
      this.roles = resp.Role!
    })
  }

}
