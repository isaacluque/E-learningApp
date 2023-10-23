import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { ViewUser } from '../users/interfaces/view-users.interface';


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

  public person!: ViewUser;

  public id_user: number = 0;

  mostrar(){
    this.route.params.subscribe(params => {
      this.id_user = params['id_user']
    })

    this.detailsUser.getUser(this.id_user).subscribe(user => {
      this.person = user?.user
      if (!this.person.IMAGEN) {
        this.person.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
      }
    })
  }
}
