import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthServiceService);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}$')]],
    password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
  })

  login() {

    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
      .subscribe( {
        next: () => console.log('Todo bien'),
        error: (error) =>{
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
