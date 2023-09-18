import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as customValidators from '../../shared/validators/validators';

@Component({
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  hide = true;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
  })

  loginStudent() {

    const {email, password} = this.myForm.value;

    this.authService.loginStudent(email, password)
      .subscribe( {
        next: () => this.router.navigateByUrl('/main/courses'),
        error: (error) =>{
          this.router.navigateByUrl('/auth/login-student');
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
