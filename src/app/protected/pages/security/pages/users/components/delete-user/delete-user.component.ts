import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Input() id_user: number = 0;
  @Input() user: string = '';

  @Output() Desactivar: EventEmitter<undefined> = new EventEmitter();

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  private userservice = inject(UserService);
  private router = inject(Router);

  putBlockUser() {
    this.userservice.putBlockUser(this.id_user)
      .subscribe( resp => {
        if(resp.ok === true) {
          this.Desactivar.emit()
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
