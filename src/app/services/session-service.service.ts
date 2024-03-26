import { Injectable } from '@angular/core';
import type { usersession } from '../interfaces/session-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor() {

    this.getUserSession();

  }

  getUserSession(){

    console.log(localStorage.getItem('userSession'));
    return localStorage.getItem('userSession');

  }

  saveUserSession(userData: usersession){
    localStorage.setItem('userSession', JSON.stringify(userData));
  }

  destroyUserSession(){
    localStorage.removeItem('userSession');
  }

}
