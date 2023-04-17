import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData: any = [];
  path: string = "http://localhost:3000/"
  constructor(private backendService: BackendService, private router: Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.backendService.getAdmin().subscribe((res: any) => {
    },(error: any) => {
       if (error.status === 400) {
        this.router.navigate(['/admin'])
       }})
    this.allUsers();
  }

  allUsers() {
    this.backendService.getAllUsers().subscribe((res) => {
      this.userData = res.userData
    })
  }

  editUser(id: any) {
    this.router.navigate([`/admin/edituser/${id}`]);
  }

  deleteUser(id: any) {
    this.backendService.removeUser(id).subscribe((res) => {
      if (res.status) {
        this.toastr.success('User Deleted successfully!', 'Success');
        this.userData = res.userData
        this.router.navigate([`/admin/dashboard`]);
      }

    })
  }

}
