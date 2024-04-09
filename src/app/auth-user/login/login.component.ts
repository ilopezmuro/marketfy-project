import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import type { user } from '../../interfaces/user-interface';
import type { usersession } from '../../interfaces/session-interface';
import { SessionServiceService } from '../../services/session-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  responseThrewError: boolean = false;

  emailError: string = '';
  passError: string = '';

  constructor(private http: HttpClient, private route: Router, private sessionService: SessionServiceService){

    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] , updateOn: 'submit'}),
      password: new FormControl('', { validators: [Validators.required] , updateOn: 'submit'})
    });
  }

  onSubmit(){

    this.responseThrewError = false;

    if(this.loginForm.status != "INVALID"){

      let bodyRequest = {
        "email": this.loginForm.controls['email'].value,
        "password": this.loginForm.controls['password'].value
      }

      this.http.post<boolean>('http://localhost:8080/shoppingcart/v2/users/login', bodyRequest)
      .subscribe( (response) => {
  
        if(response){
  
          this.http.post<user>('http://localhost:8080/shoppingcart/v2/users/getuserbymail', bodyRequest.email)
          .subscribe( (response) => {
  
            let saveSession: usersession = {
              "id": response.user_id,
              "email": response.email
            }
  
            this.sessionService.saveUserSession(saveSession);
            this.sessionService.sessionInitializer();
  
            this.route.navigate(['/']);
            
          });
  
        }
        else{
  
          this.responseThrewError = true;
  
        }
  
      });

    }

  }

}
