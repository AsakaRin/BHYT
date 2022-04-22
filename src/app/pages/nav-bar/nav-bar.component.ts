import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  alert() {

    alert("Tính năng chưa hoàn thiện")
  }

  logout() {
    this.auth.logout();
  }

  changeRoute(navigation) {
    this.router.navigate([navigation]);
  }

}
