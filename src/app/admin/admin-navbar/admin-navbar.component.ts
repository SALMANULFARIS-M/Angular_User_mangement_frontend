import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { BackendService } from "../../services/backend.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router, private backendService: BackendService, private cookieService: CookieService) { }

  logout(): void {
    localStorage.removeItem('adminToken');
    this.cookieService.delete('adminjwt');
    this.router.navigate(['/admin']);
  }
}
