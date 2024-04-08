import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  registerForm: FormGroup;

  constructor(private http: HttpClient, private route: Router){

    this.registerForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      last_name: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'submit' }),
      password: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      bio: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      area_of_interest: new FormControl('', { validators: [Validators.required], updateOn: 'submit' })
    });

  }

  onSubmit(){

    let name = this.registerForm.value['name'];
    let last_name = this.registerForm.value['last_name'];
    let email = this.registerForm.value['email'];
    let password = this.registerForm.value['password'];
    let bio = this.registerForm.value['bio'];
    let area_of_interest = this.registerForm.value['area_of_interest'];

    if(this.registerForm.status != "INVALID"){

      let bodyRequest = {
        "name": name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "bio": bio,
        "area_of_interest": area_of_interest
      }

      this.http.post('http://localhost:8080/shoppingcart/v2/users/save', bodyRequest, { responseType: 'text' })
      .subscribe( (response) => {

        console.log(response);
        this.route.navigate(['/login']);

      });

    }

  }

}