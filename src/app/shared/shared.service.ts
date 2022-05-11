import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private authentication: any[] = [];

  public errorChange = new Subject<string>();

  public notificationChange = new Subject<string>();

  constructor() {
  }

  public gettingError(message: string) {
    this.errorChange.next(message);
  }

  public getNotification(message: string) {
    this.notificationChange.next(message);
  }
}
