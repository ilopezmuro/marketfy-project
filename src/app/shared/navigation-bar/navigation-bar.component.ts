import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { Router } from '@angular/router';
import { usersession } from '../../interfaces/session-interface';
import { CheckoutServiceService } from '../../services/checkout-service.service';

@Component({
  selector: 'app-navigation-bar',
  styleUrl: 'navigation-bar.component.css',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {

  userData: usersession;

  constructor(private sessionService: SessionServiceService, private route: Router, private checkoutService: CheckoutServiceService) { 

    this.userData = this.sessionService.userLoggedData!;  // what '!' means is that it will never be null, making the error go away

  }

  callToDestroySession(){

    this.sessionService.destroyUserSession();
    this.checkoutService.clearCartLocal();
    this.route.navigate(['/']);

  }

  ngOnInit(){

    this.userData = this.sessionService.userLoggedData!;  // what '!' means is that it will never be null, making the error go away
    
  }

}
