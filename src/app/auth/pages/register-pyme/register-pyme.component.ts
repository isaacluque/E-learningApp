import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServiceService } from '../../services/register-service.service';
import { LocationServiceService } from '../../services/location-service.service';
import { CompanySizeServiceService } from '../../services/company-size-service.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../shared/services/validators-service.service';
import * as customValidators from '../../shared/validators/validators';
import Swal from 'sweetalert2';
import { CompanySizeElement } from '../../interfaces/company-size.interface';
import { Location } from '../../interfaces/locations.interfaces';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './register-pyme.component.html',
  styleUrls: ['../../../../styles.css']
})
export class RegisterPymeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if( this.registerPymeSub ){
      this.registerPymeSub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.loadLocation(),
    this.loadCompanySize();
  }

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterServiceService);
  private locationService = inject(LocationServiceService);
  private companySizeService = inject(CompanySizeServiceService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  registerPymeSub!: Subscription;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    phone_number: ['', [Validators.required]],
    company_name: ['', [Validators.required]],
    company_size: ['', [Validators.required]],
    location: ['', [Validators.required]],
    name: ['', [Validators.required]]
  }, {
    validators: this.validatorsService.passwordValidator('password', 'confirm_password'),
  });

  postStudentPYME() {
    const { name, email, password, confirm_password, username, phone_number, company_name, company_size, location } = this.myForm.value;

    this.registerPymeSub = this.registerService.registerPYME(name, email, password, confirm_password, username, phone_number, company_name, company_size, location)
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
            });

            this.router.navigateByUrl('/auth/login');
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
          });
        }
      });
  }

  listlocation: Location[] = [];
  listcompanySize: CompanySizeElement[] = [];

  loadLocation() {

    this.locationService.getLocations().subscribe((resp) => {

      this.listlocation = resp.locations!;
    });
  }

  loadCompanySize() {
    this.companySizeService.getCompanySizes().subscribe((resp) => {

      this.listcompanySize = resp.companySize!;
    });
  }


  redirigir(){
    setTimeout(()=>{
      this.router.navigateByUrl('/auth/login')
    }, 500)
  }
}
