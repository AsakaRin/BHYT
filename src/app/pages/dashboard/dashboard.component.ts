import { SharedService } from './../../shared/shared.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns: string[] = ['type', 'target', 'fullname', 'code', 'birthday', 'gender', 'cmnd', 'geocode', 'address', 'salary', 'options'];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    private firebase: AngularFirestore,
    private sharedService: SharedService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {

    if (!this.auth.isAuth()) {
      this.router.navigate(["/session/login"]);
    }

    this.firebase.collection('inform').snapshotChanges().subscribe((value: any) => {
      this.dataSource.data = [];
      value.forEach(element => {
        var date = new Date(element.payload.doc.data().birthday.seconds * 1000);
        var birthday = (+date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        this.dataSource.data.push({ ...this.formatResponse(element.payload.doc.data()), docId: element.payload.doc.id, birthday: birthday });
      });
      setTimeout(() => {

        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  formatResponse(value: any) {

    let arrayAddress = new Array();
    if (value.street) arrayAddress.push(value.street);
    if (value.district) arrayAddress.push(value.district);
    if (value.city) arrayAddress.push(value.city);
    return {
      ...value,
      type: value.type == '1' ? 'Tự nguyện' : 'Bắt buộc',
      target: value.target == '1' ? 'Hộ gia đình' : 'Cá nhân',
      address: arrayAddress.join(', '),
      salary: value.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      gender: value.gender == '0' ? "Nam" : "Nữ",
      options: ''
    }
  }

  ngAfterViewInit() {

  }

  createNewObject() {
    this.router.navigate(['/pages/inform']);
  }

  deleteItem(docId) {

    this.firebase.collection('inform').doc(docId).delete().then(res => {
      this.sharedService.getNotification("Xóa thành công");
    });
  }

  editItem(docId) {

    alert("Tính năng chưa hoàn thiện")
    this.firebase.collection('inform').doc(docId).ref.get().then(doc => {
      var data = doc.data();
    })
  }
}
