import { Component } from '@angular/core';
import { BackendService } from "../../services/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private backendService:BackendService){}
  isLoggIn() {
    return this.backendService.isLoggedIn()
  }

}
