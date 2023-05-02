import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private backendService: BackendService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.backendService.getAdmin().subscribe((res: any) => {
      if (res.status) {
        this.router.navigate(['/admin/dashboard'])
      }
    })
  }

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
  });

  get f() {
    return this.registrationForm.controls;
  }
  submit: boolean = false;
  logged: boolean = false;

  OnSubmit() {
    this.submit = true;
    if (this.registrationForm.valid) {
      // Access the form data
      const formData = this.registrationForm.value;
      // Send the form data to the server
      this.backendService.adminLog(formData).subscribe((result: any) => {
        this.logged = result.status
        if (this.logged) {
          localStorage.setItem('adminToken', "" + result.token) //local storage save
          this.cookieService.set('adminjwt', result.token, 2); // 2 days expiration
          this.router.navigate(['/admin/dashboard']);//navigate
        }

      }, (error: any) => {
        if (error.status === 400) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: error.error.message
          })
        }
      });

    }

  }


}
