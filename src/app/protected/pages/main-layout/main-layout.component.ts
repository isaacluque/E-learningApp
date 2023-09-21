import { Component, inject } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  private authService = inject(AuthServiceService);

  public hide = true;
  get name(): string{
    return this.authService.nameUser;
  }
  onLogout(){
    this.authService.logout();
  }
}
