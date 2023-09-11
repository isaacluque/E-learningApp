import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/auth/services/register-service.service';
import * as customValidators from '../../../../shared/validators/validators';
import Swal from 'sweetalert2';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent{

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterServiceService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]]
  }, {
    validators: this.validatorsService.passwordValidator('password', 'confirm_password'),
  });

  postStudentNormal(){
    const {email, password, confirm_password, username, first_name, last_name} = this.myForm.value;

    this.registerService.postStudentNormal(email, password, confirm_password, username, first_name, last_name)
      .subscribe( {
        next: (resp) => {
          if(resp && resp.msg){
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

            this.router.navigateByUrl('/auth/login')
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
