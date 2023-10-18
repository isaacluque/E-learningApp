import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { User } from './interfaces/details-user';
import { switchMap } from 'rxjs';
import { ViewUser } from '../users/interfaces/view-users.interface';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ngOnInit(): void {
    this.mostrar()
  }
  private detailsUser = inject(DetailsService);

  private route = inject(ActivatedRoute);

  public person!: ViewUser[];

  // mostrar(){
  //   this.route.params
  //     .pipe(
  //       switchMap(({id_user}) => this.detailsUser.getUser(id_user))
  //     )
  //     .subscribe(User => {

  //       this.person = User?.ViewUser?.[0] ?? {};
  //     })
  // }

  mostrar() {
    this.route.params.subscribe(async ({id_user}) => {
      try {
        const userDetails = await this.detailsUser.getUser(id_user);
        this.person = userDetails?.user?.[0];
      } catch(err) {
        console.error(`Error retrieving user details (${id_user}): ${err}`);
      }
    });
  }

}
