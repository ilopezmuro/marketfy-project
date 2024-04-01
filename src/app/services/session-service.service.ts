import { Injectable } from '@angular/core';
import type { usersession } from '../interfaces/session-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  public userLoggedData: usersession | null;
  public userLoggedId: number;

  constructor() {

    this.userLoggedData = this.getUserSession();
    this.userLoggedId = this.userLoggedData!['id']; // what '!' means is that it will never be null, making the error go away

    console.log(this.userLoggedData);
    console.log(this.userLoggedId);

  }

  getUserSession(){

    let data = String(localStorage.getItem('userSession'));
    let parsedData = JSON.parse(data);

    //console.log(parsedData);
    return parsedData;

  }

  saveUserSession(userData: usersession){
    localStorage.setItem('userSession', JSON.stringify(userData));
  }

  destroyUserSession(){
    this.userLoggedData = null;
    this.userLoggedId = 0;

    localStorage.removeItem('userSession');
  }

}
