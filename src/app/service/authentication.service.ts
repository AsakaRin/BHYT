import { SharedService } from './../shared/shared.service';
import { AuthData } from './../models/auth-data.models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  authChange = new Subject<string>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private sharedService: SharedService) { }

  private authSuccessfully(message: string) {
    this.isAuthenticated = true;
    this.authChange.next(message);
    this.router.navigate(['/pages/dashboard']);
  }

  public login(authData: AuthData) {
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully("Login Successfully");
      })
      .catch(error => {
        this.sharedService.gettingError("Bad Credential");
      })
  }

  public register(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully("Register Successfully");
      })
      .catch(error => {
        this.sharedService.gettingError(error.message);
      })
  }

  public logout() {
    this.isAuthenticated = false;
    this.authChange.next("Logout Successfully");
    this.router.navigate(['/session/login']);
  }

  public isAuth() {
    return this.isAuthenticated;
  }
}
