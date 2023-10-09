import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/auth/shared/services/validators-service.service';
import { UserService } from './services/user.service';
import { ViewUser } from './interfaces/view-users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }

  hide = false;

  private fb = inject(FormBuilder);
  private userservice = inject(UserService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public users: ViewUser[] = [];
  public imagen: ViewUser[] = [];


  getUsers() {
    this.userservice.getUsers().subscribe( viewuser => {
      this.users = viewuser;
    });
  }

  getImagenes() {
    this.userservice.getImagenes().subscribe(viewuser => {
      this.imagen = viewuser;
    })
  }
}
