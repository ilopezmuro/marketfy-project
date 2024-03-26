import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {

  userData: any;

  constructor(private sessionService: SessionServiceService, private route: Router) {

    this.userData = sessionService.getUserSession();

  }

  callToDestroySession(){

    this.userData = null;
    this.sessionService.destroyUserSession();
    this.route.navigate(['/']);

  }

}
