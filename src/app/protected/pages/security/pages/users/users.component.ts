import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import { UserService } from './services/user.service';
import { ViewUser } from './interfaces/view-users.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
    this.getImagenes();
  }

  hide = false;

  private fb = inject(FormBuilder);
  private userservice = inject(UserService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public users: ViewUser[] = [];

  getUsers() {
    this.userservice.getUsers().subscribe( viewuser => {
      this.users = viewuser;
    });
  }

  selection(id_user: number, user: string, username: string, status: string, id_role: number, role: string, email: string) {
    this.ID_USUARIO = id_user;
    this.USUARIO = user;
    this.NOMBRE_USUARIO = username;
    this.ESTADO = status;
    this.ID_ROL = id_role;
    this.ROL = role;
    this.CORREO_ELECTRONICO = email;
  }

  putBlockUser() {
    this.userservice.putBlockUser(this.ID_USUARIO)
      .subscribe( resp => {
        if(resp.ok === true) {
          Swal.fire({
            title: '¡Éxito!',
            text: resp.msg,
            icon: 'success',
            iconColor: 'white',
            background: '#a5dc86',
            color: 'white',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: resp.msg,
            icon: 'error',
            iconColor: 'white',
            background: '#d12609',
            color: 'white',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          })
        }
      }

    )
  }

}
