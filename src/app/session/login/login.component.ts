import { AuthData } from './../../models/auth-data.models';
import { AuthService } from './../../service/authentication.service';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.authService.removeSession();

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  loginExecute() {

    let authCredential: AuthData = {
      email: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(authCredential);
  }

  switchRegister() {
    this.router.navigate(['/session/register']);
  }

  alert() {
    alert("Tính năng chưa phát triển");
  }

}
