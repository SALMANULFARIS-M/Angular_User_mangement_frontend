import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private backendService: BackendService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.backendService.getUser().subscribe((res: any) => {
      if (res.status) {
        this.router.navigate(['/'])
      }
    })
  }

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
  });

  get f() {
    return this.registrationForm.controls;
  }
  submit: boolean = false;
  logged: boolean = false;


  onSubmit() {
    this.submit = true
    // Check if the form is valid
    if (this.registrationForm.valid) {
      // Access the form data
      const formData = this.registrationForm.value;
      // Send the form data to the server
      this.backendService.createUser(formData).subscribe((result: any) => {
        this.logged = result.status
        if (this.logged) {
          localStorage.setItem('userToken', "" + result.token)
          this.cookieService.set('jwt', result.token, 2);
          this.router.navigate(['/']);
        }

      }, (error: any) => {
        console.log(error);
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
