import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { API } from 'src/app/api/api.service';
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
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private api: API) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({

    });
    if (this.data.type == 'singleMode') {
      this.api.paymentDetail(this.data.id).subscribe(res => {
        this.singlePerson = {
          fullname: res['fullname'],
          code: res['code'],
          cost: (+res['cost']).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          lastPayment: new Date(res['lastPayment']).toLocaleDateString(),
          total: ((Number.parseFloat(res['salary']) * 4.5 / 100) *
            (new Date().getMonth() - new Date(res['lastPayment']).getMonth() + 12 * (new Date().getFullYear() - new Date(res['lastPayment']).getFullYear())))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      })
    } else if (this.data.type == 'familyMode') {
      this.api.paymentFamilyDetail(this.data.family.familyCode).subscribe(res => {
        this.singleFamily = {
          household: res['household'],
          familyCode: res['familyCode'],
          count: res['count'],
          cost: (+res['cost']).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          lastPayment: new Date(res['lastPayment']).toLocaleDateString(),
          total: (+this.getCostFamily(res['count']) *
            (new Date().getMonth() - new Date(res['lastPayment']).getMonth() + 12 * (new Date().getFullYear() - new Date(res['lastPayment']).getFullYear())))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        }
      })
    }
  }

  payment() {
    if (this.data.type == 'singleMode') {
      this.api.updateInform(this.data.id, { lastPayment: new Date() }).subscribe(res => {
        this.sharedService.getNotification("Thanh toán thành công");
        this.closeDialog();
      })
    } else if (this.data.type == 'familyMode') {
      this.data.family.ids.forEach((id, index) => {
        this.api.updateInform(id, { lastPayment: new Date() }).subscribe(res => {
          if (this.data.family.ids.length - 1 == index) {
            this.sharedService.getNotification("Thanh toán thành công");
            this.closeDialog();
          }
        })
      })
    }
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
