import { SharedService } from './shared/shared.service';
import { AuthService } from './service/authentication.service';
import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'BHYT';

  private authSub: Subscription = new Subscription;
  private errorSub: Subscription = new Subscription;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    this.authSub = this.authService.authChange.subscribe(value => {
      this.openSnackBar(value);
    })
    this.errorSub = this.sharedService.errorChange.subscribe(value => {
      this.openSnackBar(value);
    })
  }

  ngOnDestroy(): void {

    if (this.authSub) this.authSub.unsubscribe();
  }

  public openSnackBar(message: string) {

    this._snackBar.open(message, 'OK');
  }
}
