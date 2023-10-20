import { Component, HostListener, inject, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { DetailsService } from '../../../security/pages/details/services/details.service';
import { ViewUser } from '../../../security/pages/users/interfaces/view-users.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  ngOnInit(): void {
    this.mostrar();
  }
  hideForm = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Lógica para ocultar el formulario en pantallas pequeñas
    this.hideForm = window.innerWidth < 576; // Por ejemplo, ocultar en pantallas menores a 576px de ancho (tamaño de pantalla de dispositivos móviles)
  }

  private authService = inject(AuthServiceService);
  private detailsUser = inject(DetailsService);

  public person!: ViewUser;

  public id_user: number = this.authService.id_user;

  mostrar(){
    this.detailsUser.getUser(this.id_user).subscribe(user => {
      this.person = user?.user

      if (!this.person.IMAGEN) {
        this.person.IMAGEN = '../../../../../../../../assets/profile-42914_1280.png';
      }
    })


  }

  public hide = true;
}
