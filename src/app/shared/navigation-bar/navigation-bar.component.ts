import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { Router } from '@angular/router';
import { usersession } from '../../interfaces/session-interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {

  userData: usersession;

  constructor(private sessionService: SessionServiceService, private route: Router) { 

    this.userData = this.sessionService.userLoggedData!;  // what '!' means is that it will never be null, making the error go away

  }

  callToDestroySession(){

    this.sessionService.destroyUserSession();
    this.route.navigate(['/']);

  }

}
