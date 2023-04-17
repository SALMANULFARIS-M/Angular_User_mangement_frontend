import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbg: any;
  loggedIn: boolean = false;
  userData: any;
  imageSrc?: string;
  path: string = "http://localhost:3000/"

  constructor(private router: Router, private backendService: BackendService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.backendService.getUser().subscribe((res: any) => {
      this.imageSrc = this.path + res.userData.image
      if (res.status) {
        this.loggedIn = res.status
        this.userData = res.userData;
      }
    })
  }

  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolllength#');
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000'
      }
    } else {
      this.navbg = {}
    }
  }


  logout(): void {
    localStorage.removeItem('userToken')
    this.cookieService.delete('jwt');
    this.router.navigate(['/login'])
  }


}
