import { AuthData } from './../../models/auth-data.models';
import { AuthService } from './../../service/authentication.service';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.removeSession();

    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  registerExecute() {

    let authCredential: AuthData = {
      email: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value
    }
    this.authService.register(authCredential);
  }

  switchLogin() {
    this.router.navigate(['/session/login']);
  }
}
