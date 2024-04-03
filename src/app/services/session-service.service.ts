import { Injectable, OnInit } from '@angular/core';
import type { usersession } from '../interfaces/session-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService implements OnInit {

  public userLoggedData: usersession | null = null;
  public userLoggedId: number = 0;

  constructor() {

    this.sessionInitializer();

  }

  sessionInitializer(){

    this.userLoggedData = this.getUserSession();

    if(this.userLoggedData){

      this.userLoggedId = this.userLoggedData!['id']; // what '!' means is that it will never be null, making the error go away
      console.log(this.userLoggedData);
      console.log(this.userLoggedId);

    }

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

  ngOnInit(){
    
    this.userLoggedData = this.getUserSession();

    if(this.userLoggedData){

      this.userLoggedId = this.userLoggedData!['id']; // what '!' means is that it will never be null, making the error go away
      console.log(this.userLoggedData);
      console.log(this.userLoggedId);

    }

  }

}
