import { SharedService } from './../shared/shared.service';
import { AuthData } from './../models/auth-data.models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { API } from '../api/api.service';

@Injectable()
export class AuthService {

  authChange = new Subject<string>();
  private isAuthenticated = false;

  constructor(private router: Router, private sharedService: SharedService, private api: API) { }

  private authSuccessfully(message: string) {
    this.isAuthenticated = true;
    localStorage.setItem("isAuth", "authenticatedUser");
    this.authChange.next(message);
    this.router.navigate(['/pages/dashboard']);
  }

  public login(authData: AuthData) {
    // this.afAuth
    //   .signInWithEmailAndPassword(authData.email, authData.password)
    //   .then(result => {
    //     this.authSuccessfully("Đăng nhập thành công");
    //   })
    //   .catch(error => {
    //     this.sharedService.gettingError("Sai thông tin đăng nhập");
    //   })
    this.api.signin(authData.email, authData.password).subscribe(res => {
      this.authSuccessfully("Đăng nhập thành công");
    }, error => {
      this.sharedService.gettingError("Sai thông tin đăng nhập");
    })
  }

  public register(authData: AuthData) {
    // this.afAuth
    //   .createUserWithEmailAndPassword(authData.email, authData.password)
    //   .then(result => {
    //     this.authSuccessfully("Đăng ký thành công");
    //   })
    //   .catch(error => {
    //     this.sharedService.gettingError(error.message);
    //   })

    this.api.signup(authData.email, authData.password).subscribe(res => {
      this.authSuccessfully("Đăng ký thành công");
    }, error => {
      this.sharedService.gettingError(error.message);
    })
  }

  public logout() {
    this.removeSession();
    this.authChange.next("Đăng xuất thành công");
    this.router.navigate(['/session/login']);
  }

  public isAuth() {
    return this.isAuthenticated;
  }

  public authentication() {
    if (localStorage.getItem("isAuth")) {
      this.isAuthenticated = true;
    }
  }

  public removeSession() {
    localStorage.removeItem("isAuth");
    this.isAuthenticated = false;
  }
}
