import { Component, inject, OnInit } from '@angular/core';
import { RoleService } from '../../../role/services/role.service';
import { Role } from '../../../role/interfaces/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import { Router } from '@angular/router';
import * as customValidators from '../../../../../../../auth/shared/validators/validators';
import { CreateUserService } from './services/create-user.service';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
    this.getRole()
  }
  selected: string = "";

  private roleservice = inject(RoleService);
  private createuserservice = inject(CreateUserService);
  private authService = inject(AuthServiceService);

  public roles: Role[] = []

  getRole() {
    this.roleservice.getUsers().subscribe(resp => {
      this.roles = resp.Role!
    })
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);


  public Form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    id_rol: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    name: ['', [Validators.required]]
  });

  ejecutarFuncion() {
    var formulario1 = document.getElementById("form1");
    var formulario2 = document.getElementById("form2");

    if (formulario1) {
      console.log(formulario1)
    } else if (formulario2) {
      console.log(formulario2)
    }
  }

  postUserMaintenance() {
    const { name, email, password, id_rol, username } = this.Form.value;
    const id_user = this.authService.id_user;
    this.createuserservice.postUserMaintenance(name, username, password, id_rol, email, id_user)
      .subscribe({
        next: (resp) => {
          if (resp && resp.msg) {
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
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error,
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
      })
  }
}
