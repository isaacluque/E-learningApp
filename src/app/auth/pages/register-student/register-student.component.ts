import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterServiceService } from '../../services/register-service.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../shared/services/validators-service.service';
import * as customValidators from '../../shared/validators/validators';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './register-student.component.html',
  styleUrls: ['../../../../styles.css']
})
export class RegisterStudentComponent implements OnDestroy {
  ngOnDestroy(): void {
    if( this.registerStudentSub ){
      this.registerStudentSub.unsubscribe();
    }
  }

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterServiceService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  registerStudentSub!: Subscription;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    name: ['', [Validators.required]]
  }, {
    validators: this.validatorsService.passwordValidator('password', 'confirm_password'),
  });

    // Subscripción

  postStudentNormal(){
    const {name, email, password, confirm_password, username} = this.myForm.value;

    this.registerStudentSub = this.registerService.registerStudentNormal(name, email, password, confirm_password, username)
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
            this.redirigir();
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

  redirigir(){
    setTimeout(()=>{
      this.router.navigateByUrl('/auth/login')
    }, 500)
  }
}
