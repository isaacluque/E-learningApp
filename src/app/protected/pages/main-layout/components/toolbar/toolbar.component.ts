import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  hideForm = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Lógica para ocultar el formulario en pantallas pequeñas
    this.hideForm = window.innerWidth < 576; // Por ejemplo, ocultar en pantallas menores a 576px de ancho (tamaño de pantalla de dispositivos móviles)
  }

  public hide = true;
}
