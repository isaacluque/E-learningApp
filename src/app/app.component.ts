import { Component, computed, effect, inject } from '@angular/core';
import { AuthServiceService } from './auth/services/auth-service.service';
import { AuthStatus } from './auth/interfaces/auth-status-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject(AuthServiceService);
  private router = inject(Router)

  public finishedAuthCheck = computed<boolean>( () => {

    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  public authStatusChangedEffect= effect( () => {
    switch (this.authService.authStatus()) {

      case AuthStatus.checking:
        return
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/main')
        return
      case AuthStatus.noAuthenticated:
        this.router.navigateByUrl('/auth/login')
        return
    }
  })

}
