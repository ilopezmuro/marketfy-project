import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionServiceService } from '../../services/session-service.service';
import type { user } from '../../interfaces/user-interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});
  userEditDetails: user | null = null;

  constructor(private http: HttpClient, private route: Router, private sessionService: SessionServiceService) { }

  onSubmit(){

    let user_id = this.sessionService.userLoggedId;

    let name = this.editForm.value['name'];
    let last_name = this.editForm.value['last_name'];
    let email = this.editForm.value['email'];
    let password = this.editForm.value['password'];
    let bio = this.editForm.value['bio'];
    let area_of_interest = this.editForm.value['area_of_interest'];

    if(this.editForm.status != "INVALID"){

      let bodyRequest = {
        "user_id": user_id,
        "name": name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "bio": bio,
        "area_of_interest": area_of_interest
      }

      this.http.post('http://localhost:8080/shoppingcart/v2/users/update', bodyRequest, { responseType: 'text' })
      .subscribe( (response) => {

        console.log(response);
        this.sessionService.updateUserSession(email);
        this.showStoredSession();
        this.route.navigate(['/']);

      });

    }

  }

  ngOnInit(){

    let userId = this.sessionService.userLoggedId;

    this.editForm = new FormGroup({
      name: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      last_name: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'submit' }),
      password: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      bio: new FormControl('', { validators: [Validators.required], updateOn: 'submit' }),
      area_of_interest: new FormControl('', { validators: [Validators.required], updateOn: 'submit' })
    });

    this.http.get<user>(`http://localhost:8080/shoppingcart/v2/users/${ userId }`)
    .subscribe( (response) => {

      this.userEditDetails = response;

      this.editForm.get('name')?.setValue(this.userEditDetails.name);
      this.editForm.get('last_name')?.setValue(this.userEditDetails.last_name);
      this.editForm.get('email')?.setValue(this.userEditDetails.email);
      this.editForm.get('password')?.setValue(this.userEditDetails.password);
      this.editForm.get('bio')?.setValue(this.userEditDetails.bio);
      this.editForm.get('area_of_interest')?.setValue(this.userEditDetails.area_of_interest);

    });
    
  }

  showStoredSession(){

    console.log(this.sessionService.getUserSession());

  }

}
