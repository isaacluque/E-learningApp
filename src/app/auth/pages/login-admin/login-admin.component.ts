import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import * as customValidators from '../../shared/validators/validators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
  }
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  loginSub!: Subscription;

  hide = true;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
  })

  loginAdmin() {

    const {email, password} = this.myForm.value;

    this.loginSub = this.authService.login(email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/main'),
        error: (error) =>{
          this.router.navigateByUrl('/auth/login');
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

  ngOnDestroy(): void {
    // Eliminar subscripción de login al destruir el componente
    if( this.loginSub ){
      this.loginSub.unsubscribe();
    }
  }
}
