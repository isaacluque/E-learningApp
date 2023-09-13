import { Locations } from './../../../../interfaces/locations.interfaces';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationServiceService } from 'src/app/auth/services/location-service.service';
import { RegisterServiceService } from 'src/app/auth/services/register-service.service';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import * as customValidators from '../../../../shared/validators/validators';
import { CompanySizeElement } from 'src/app/auth/interfaces/company-size.interface';
import { Location } from '../../../../interfaces/locations.interfaces';
import { CompanySizeServiceService } from 'src/app/auth/services/company-size-service.service';

@Component({
  selector: 'app-pyme-register',
  templateUrl: './pyme-register.component.html',
  styleUrls: ['./pyme-register.component.css']
})
export class PymeRegisterComponent implements OnInit {
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
    location: ['', [Validators.required]]
  }, {
    validators: this.validatorsService.passwordValidator('password', 'confirm_password'),
  })

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
}
