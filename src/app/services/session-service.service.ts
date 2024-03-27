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

    let data = String(localStorage.getItem('userSession'));
    let parsedData = JSON.parse(data);

    console.log(parsedData);
    return parsedData;

  }

  saveUserSession(userData: usersession){
    localStorage.setItem('userSession', JSON.stringify(userData));
  }

  destroyUserSession(){
    localStorage.removeItem('userSession');
  }

}
