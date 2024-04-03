import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  registerForm: FormGroup;
  emptyFields: boolean = false;

  constructor(private http: HttpClient, private route: Router){

    this.registerForm = new FormGroup({
      name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      bio: new FormControl(null),
      area_of_interest: new FormControl(null)
    });

  }

  onSubmit(){

    this.emptyFields = false;

    let name = this.registerForm.value['name'];
    let last_name = this.registerForm.value['last_name'];
    let email = this.registerForm.value['email'];
    let password = this.registerForm.value['password'];
    let bio = this.registerForm.value['bio'];
    let area_of_interest = this.registerForm.value['area_of_interest'];

    if(name != null && last_name != null && email != null && password != null && bio != null && area_of_interest != null){

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
    else{

      this.emptyFields = true;

    }

  }

}