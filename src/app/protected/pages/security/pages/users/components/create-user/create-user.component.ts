import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RoleService } from '../../../role/services/role.service';
import { Role } from '../../../role/interfaces/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import { Router } from '@angular/router';
import * as customValidators from '../../../../../../../auth/shared/validators/validators';
import { CreateUserService } from './services/create-user.service';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import Swal from 'sweetalert2';
import { CompanySizeServiceService } from 'src/app/auth/services/company-size-service.service';
import { LocationServiceService } from 'src/app/auth/services/location-service.service';
import { RegisterServiceService } from 'src/app/auth/services/register-service.service';
import { CompanySizeElement } from 'src/app/auth/interfaces/company-size.interface';
import { Location } from 'src/app/auth/interfaces/locations.interfaces';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
    this.getRole(),
    this.loadLocation(),
    this.loadCompanySize()
  }
  selected: string = "";
  @Output() Crear: EventEmitter<undefined> = new EventEmitter();

  private roleservice = inject(RoleService);
  private createuserservice = inject(CreateUserService);
  private authService = inject(AuthServiceService);

  public roles: Role[] = [];

  public generatepassword: string = "";
  generando: boolean = false;

  getRole() {
    this.roleservice.getUsers().subscribe(resp => {
      this.roles = resp.Role!
    })
  }

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);


  public myForm1: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    id_rol: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    name: ['', [Validators.required]]
  });

  postUserMaintenance() {
    const { name, email, password, id_rol, username } = this.myForm1.value;
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
          this.limpiarFormulario()
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

  generatePassword() {
    this.generando = true;
    this.createuserservice.generatePassword().subscribe(resp => {
      this.generatepassword = resp.password;
      this.generando = false;
    })
  }

  limpiarFormulario() {
    this.generatepassword = ""
    this.myForm1.reset();
    this.myForm2.reset();
  }

  private fb2 = inject(FormBuilder);
  private locationService = inject(LocationServiceService);
  private companySizeService = inject(CompanySizeServiceService);

  public myForm2: FormGroup = this.fb2.group({
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    phone_number: ['', [Validators.required]],
    company_name: ['', [Validators.required]],
    company_size: ['', [Validators.required]],
    location: ['', [Validators.required]],
    name: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  postPYMEMaintenance() {
    const { name, email, password, username, phone_number, company_name, company_size, location, status } = this.myForm2.value;
    const id_user = this.authService.id_user;
    this.createuserservice.postPYMEMaintenance(name, email, password, username, phone_number, company_name, company_size, location, status, id_user)
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
            this.limpiarFormulario();
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
}
