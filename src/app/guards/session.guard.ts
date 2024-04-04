import { CanActivateFn } from '@angular/router';
import { SessionServiceService } from '../services/session-service.service';
import { Router } from '@angular/router';

export const sessionGuard: CanActivateFn = (route, state) => {
  let sesionService: SessionServiceService = new SessionServiceService;
  let router: Router = new Router;

  if(sesionService.userLoggedData){

    router.navigate(['/']);
    return false;

  }
  else{

    return true;

  }

};
