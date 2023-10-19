import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { User } from './interfaces/details-user';
import { switchMap } from 'rxjs';
import { ViewUser } from '../users/interfaces/view-users.interface';
import { UserService } from '../users/services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  public person: User| null = null;;

  public imageUrl!: string;

  public id_user: number = 0;

  mostrar(){
    this.route.params.subscribe(params => {
      this.id_user = params['id_user']
    })

    this.detailsUser.getUser(this.id_user).subscribe(user => {
      this.person = user?.user ?? null

      // Convertir la propiedad `IMAGEN` a un objeto `File`
    const file = new File([this.person.IMAGEN], `${this.person.MIMETYPE}`);

    // Actualizar la variable `userIDResponse`
    this.person.IMAGEN = file;
    })
  }
}
