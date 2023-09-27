import { Component, HostListener, inject } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';
import { navbarData } from './interfaces/navbar-data.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  private authService = inject(AuthServiceService);
  collapsed = false;
  navData = navbarData;
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
}
