import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/authentication.service';
import { API } from 'src/app/api/api.service';

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
    private sharedService: SharedService,
    private auth: AuthService,
    private api: API
  ) { }

  ngOnInit(): void {

    if (!this.auth.isAuth()) {
      this.router.navigate(["/session/login"]);
    }
    this.initData();
  }

  initData() {
    this.api.getAllInforms().subscribe((response: any) => {
      this.dataSource.data = [];
      var value = response.items;
      value.forEach(element => {
        var date = new Date(element.birthday);
        var birthday = (+date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        this.dataSource.data.push({ ...this.formatResponse(element), birthday: birthday });
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

  deleteItem(id) {

    this.api.deleteInform(id).subscribe(res => {
      this.sharedService.getNotification("Xóa thành công");
      this.initData();
    });
  }

  editItem(id) {

    this.router.navigate(["pages/inform/update/" + id]);
  }
}
