import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationServiceService } from 'src/app/auth/services/location-service.service';
import { RegisterServiceService } from 'src/app/auth/services/register-service.service';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import * as customValidators from '../../../../shared/validators/validators';
import { CompanySizeElement } from 'src/app/auth/interfaces/company-size.interface';
import { Location } from '../../../../interfaces/locations.interfaces';
import { CompanySizeServiceService } from 'src/app/auth/services/company-size-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pyme-register',
  templateUrl: './pyme-register.component.html',
  styleUrls: ['./pyme-register.component.css']
})
export class PymeRegisterComponent implements OnInit {
  @Input() mostrarModal = false;

  ngOnInit(): void {
    this.loadLocation(),
    this.loadCompanySize()
  }

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterServiceService);
  private locationService = inject(LocationServiceService);
  private companySizeService = inject(CompanySizeServiceService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

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
  })

  postStudentPYME() {
    const {name, email, password, confirm_password, username, phone_number, company_name, company_size, location} = this.myForm.value

    this.registerService.registerPYME(name, email, password, confirm_password, username, phone_number, company_name, company_size, location)
      .subscribe({
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

  listlocation: Location[] = [];
  listcompanySize: CompanySizeElement[] = [];

  loadLocation(){

    this.locationService.getLocations().subscribe((resp)=>{

      this.listlocation = resp.locations!;
    });
  }

  loadCompanySize(){
    this.companySizeService.getCompanySizes().subscribe((resp)=>{

      this.listcompanySize = resp.companySize!;
    });
  }

  cerrarModal() {
    this.myForm.reset();
    this.mostrarModal = false;
  }
}
