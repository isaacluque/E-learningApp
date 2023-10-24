import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import { UserService } from './services/user.service';
import { ViewUser } from './interfaces/view-users.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.getUsers();
  }

  // constructor (public dialog: MatDialog){}
  ngOnDestroy(): void {
    if( this.subscripcion ){
      this.subscripcion.unsubscribe();
    }
  }

ID_USUARIO:         number = 0;
USUARIO:            string = "";
NOMBRE_USUARIO:     string = "";
ESTADO:             string = "";
ID_ROL:             number = 0;
ROL:                string = "";
CORREO_ELECTRONICO: string = "";

size:               number = 0;
lim:                number = 0;
index:              number = -1;
from:               string = "0";
public users: ViewUser[] = [];

// Validador de busqueda
buscando: boolean = false;

mostrar = false;

  // Referencia para páginador
  paginadorPorReferencia!: PageEvent;

  private fb = inject(FormBuilder);
  private userservice = inject(UserService);
  private router = inject(Router);

  subscripcion!: Subscription;

  myForm: FormGroup = this.fb.group({
    search: ['', [Validators.required, Validators.maxLength(100)]],
  })

  onPageChange(event: PageEvent) {

    // Hacer referencia al páginador
    this.paginadorPorReferencia = event;

    let { search } = this.myForm.value;

    if(!this.buscando) {
      search = "";
    }

    let from: string = (event.pageIndex * event.pageSize).toString();
    this.from = from;

    this.userservice.getUsers(search, event.pageSize.toString(), from)
      .subscribe(
        resp => {
          this.users = resp.ViewUser!
          this.size = resp.countUsers!
          this.lim = resp.lim!

          this.users.forEach(user => {
            if (!user.IMAGEN) {
              user.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
            }
          });
        }
      )

  }

  // Cuando se presione Enter en la casilla buscar
  buscarRegistro() {
    // Si se ha cambiado el páginador
    if (this.paginadorPorReferencia) {
      this.index = -1;
    }

    // // Datos requeridos
    let { search } = this.myForm.value;

    // // // Para evitar conflictos con el páginador
    // if (search !== "") {
    //   this.buscando = true
    // } else {
    //   this.buscando = false
    // }

    this.from = "0"

    // Consumo
    this.subscripcion = this.userservice.getUsers(search)
      .subscribe(
        resp => {
          this.index = 0;
          this.users = resp.ViewUser!
          this.size = resp.countUsers!
          this.lim = resp.lim!

          this.users.forEach(user => {
            if (!user.IMAGEN) {
              user.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
            }
          });
        }
      )

  }


  getUsers() {
    this.subscripcion = this.userservice.getUsers().subscribe( resp => {
      this.users = resp.ViewUser!
      this.lim = resp.lim!
      this.size = resp.countUsers!

      this.users.forEach(user => {
        if (!user.IMAGEN) {
          user.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
        }
      });
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

  // openDialog(user: any ) {
  //   this.dialog.open(DeleteUserComponent, {
  //     width: '500px',
  //     height: '350px',
  //     data: user,
  //   });
  // }

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

  putActivateUser() {
    this.userservice.putActivateUser(this.ID_USUARIO)
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
          this.recargar();
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

  getUser(id_user: number) {
    this.router.navigateByUrl(`main/security/user/details/${id_user}`);
  }

  recargar() {

    let { search } = this.myForm.value;

    this.userservice.getUsers(search, this.lim.toString(), this.from)
      .subscribe(
        ViewUser => {
          this.users = ViewUser.ViewUser!
          this.size = ViewUser.countUsers!
          this.lim = ViewUser.lim!

          this.users.forEach(user => {
            if (!user.IMAGEN) {
              user.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
            }
          });
        }
      )
  }

}
