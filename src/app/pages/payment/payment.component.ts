import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  BASE_SALARY = "1490000"

  singlePerson = {
    fullname: '',
    code: '',
    cost: '',
    lastPayment: '',
    total: ''
  }
  singleFamily = {
    household: '',
    familyCode: '',
    count: '',
    cost: '',
    lastPayment: '',
    total: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: AngularFirestore,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({

    });
    if (this.data.type == 'singleMode') {
      this.firebase.collection('inform').doc(this.data.id).valueChanges().subscribe(person => {
        this.singlePerson = {
          fullname: person['fullname'],
          code: person['code'],
          cost: (Number.parseFloat(person['salary']) * 4.5 / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          lastPayment: new Date(+person['lastPayment']['seconds'] * 1000).toLocaleDateString(),
          total: ((Number.parseFloat(person['salary']) * 4.5 / 100) *
            (new Date().getMonth() - new Date(+person['lastPayment']['seconds'] * 1000).getMonth() + 12 * (new Date().getFullYear() - new Date(+person['lastPayment']['seconds'] * 1000).getFullYear())))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      });
    } else if (this.data.type == 'familyMode') {
      this.singleFamily = {
        household: this.data.family.household,
        familyCode: this.data.family.familyCode,
        count: this.data.family.count,
        cost: this.getCostFamily(this.data.family.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        lastPayment: new Date(+this.data.family.lastPayment['seconds'] * 1000).toLocaleDateString(),
        total: (this.getCostFamily(this.data.family.count) *
          (new Date().getMonth() - new Date(+this.data.family.lastPayment['seconds'] * 1000).getMonth() + 12 * (new Date().getFullYear() - new Date(+this.data.family.lastPayment['seconds'] * 1000).getFullYear())))
          .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),

      }
    }
  }

  payment() {
    if (this.data.type == 'singleMode') {
      this.firebase.collection('inform').doc(this.data.id).update({ lastPayment: new Date() });
    } else if (this.data.type == 'familyMode') {
      this.data.family.docIds.forEach(id => {
        this.firebase.collection('inform').doc(id).update({ lastPayment: new Date() });
      })
    }
    this.sharedService.getNotification("Thanh toán thành công");
    this.closeDialog()
  }

  closeDialog() {
    this.dialog.openDialogs[this.dialog.openDialogs.length - 1].close();
  }

  getCostFamily(numberMember) {

    var cost = 0;
    if (numberMember >= 1) {
      cost += Number.parseFloat(this.BASE_SALARY) * 4.5 / 100;
    }
    if (numberMember >= 2) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (70 / 100)
    }
    if (numberMember >= 3) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (60 / 100)
    }
    if (numberMember >= 4) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (50 / 100)
    }
    if (numberMember >= 5) {
      for (let i = 0; i <= (numberMember - 5); i++) {

        cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (40 / 100)
      }
    }
    return cost;
  }
}
