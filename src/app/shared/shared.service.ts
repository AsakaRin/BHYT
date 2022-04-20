import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private authentication: any[] = [];

  public errorChange = new Subject<string>();

  constructor(firestore: AngularFirestore) {
    firestore.collection('authentication').valueChanges().subscribe(result => {
      this.authentication = result;
    });
  }

  public gettingError(message: string) {
    this.errorChange.next(message);
  }
}
