import { Component, HostListener, inject } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { navbarData } from './interfaces/navbar-data.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { INavbarData } from './interfaces/helper';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class MainLayoutComponent {
  private authService = inject(AuthServiceService);
  navData = navbarData;
  multiple: boolean = false;
  hideForm = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Lógica para ocultar el formulario en pantallas pequeñas
    this.hideForm = window.innerWidth < 576; // Por ejemplo, ocultar en pantallas menores a 576px de ancho (tamaño de pantalla de dispositivos móviles)
  }

  public hide = true;
  get name(): string{
    return this.authService.nameUser;
  }
  get email(): string{
    return this.authService.emailUser;
  }
  onLogout(){
    this.authService.logout();
  }

  panelOpenState = false;



}
