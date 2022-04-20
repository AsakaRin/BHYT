import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['type', 'target', 'fullname', 'code', 'birthday', 'gender', 'cmnd', 'geocode', 'address', 'salary'];
  dataSource;

  constructor(
    private router: Router,
    private firebase: AngularFirestore
  ) { }

  ngOnInit(): void {

    this.firebase.collection('inform').valueChanges().subscribe(value => {
      this.dataSource = value.map(item => this.formatResponse(item));
    })
  }

  formatResponse(value: any) {

    return {
      ...value,
      type: value.type == '1' ? 'Tự nguyện' : 'Bắt buộc',
      target: value.target == '1' ? 'Hộ gia đình' : 'Cá nhân',
      address: (value.street ? value.street : '') + (value.district ? ', ' + value.district : '') + (value.city ? ', ' + value.city : ''),
      salary: value.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }

  ngAfterViewInit() {

  }

  createNewObject() {
    this.router.navigate(['/pages/inform']);
  }
}
