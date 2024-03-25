import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  reactiveForm: FormGroup;
  responseThrewError: boolean = false;

  constructor(private http: HttpClient, private route: Router){

    this.reactiveForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });

  }

  onSubmit(){

    /*console.log(this.reactiveForm.controls['email'].value);
    console.log(this.reactiveForm.controls['password'].value);*/
    this.responseThrewError = false;

    let bodyRequest = {
      "email": this.reactiveForm.controls['email'].value,
      "password": this.reactiveForm.controls['password'].value
    }

    this.http.post('http://localhost:8080/shoppingcart/v2/users/login', bodyRequest)
    .subscribe( (response) => {

      if(response){

        this.route.navigate(['/']);

      }
      else{

        this.responseThrewError = true;

      }

    });

  }

}
