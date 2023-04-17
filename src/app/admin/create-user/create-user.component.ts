import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup,FormControl} from "@angular/forms";
import { BackendService } from '../../services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


  submit: boolean = false;
  imageSrc: string = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  selectedImage?: File;
  id: any;
  userData: any;
  path: string = "http://localhost:3000/"
  constructor(private toastr: ToastrService, private fb: FormBuilder, private backendService: BackendService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
      this.backendService.getAdmin().subscribe((res: any) => {
      },(error: any) => {
         if (error.status === 400) {
          this.router.navigate(['/admin'])
         }})

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.backendService.getUserById(this.id).subscribe((res: any) => {
        this.userData = res.userData;
        // Patch the form with user data
        this.registrationForm.patchValue({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          email: this.userData.email
        });
        this.imageSrc = this.path + this.userData.image
      })
    }else{
       // Create form control for password
    const passwordControl = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]);
    // Add the control to the form group
    this.registrationForm.addControl('password', passwordControl);
    }
  }

  registrationForm: FormGroup = this.fb.group({
    image: ['', [this.imageValidator]],
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/)]],
    email: ['', [Validators.required, Validators.email]],
  });
  onImageChange(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedImage = file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const imgElement = document.getElementById('preview') as HTMLImageElement;
        imgElement.src = this.imageSrc;
      };
    }
  }

  imageValidator(control: AbstractControl) {
    const file = control.value;
    if (file) {
      const maxSize = 1024 * 1024 * 4; // 1MB
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;

      if (!allowedExtensions.exec(file)) {
        return { invalidFileType: true };
      }
      if (file.size > maxSize) {
        return { invalidFileSize: true };
      }
    }
    return null;
  }

  get f() {
    return this.registrationForm.controls;
  }


  onSubmit() {
    this.submit = true
    // Check if the form is valid
    const formData = new FormData();
    if (this.id) {

      if (this.registrationForm.valid) {
        // Access the form data

        formData.append('firstName', this.registrationForm.value.firstName);
        formData.append('lastName', this.registrationForm.value.lastName);
        formData.append('email', this.registrationForm.value.email);
        if (this.selectedImage) {
          formData.append('image', this.selectedImage);
        }
        this.backendService.editUser(formData, this.id).subscribe((result: any) => {

          if (result.status) {

            this.toastr.success('User updated successfully!', 'Success');
            this.router.navigate(['/admin/dashboard']);
          }

        }, (error: any) => {
          if (error.status === 400) {
            this.toastr.error(error.error.message, 'Error');
          }
        });
      }

    } else {
      if (this.registrationForm.valid) {
        // Access the form data

        formData.append('firstName', this.registrationForm.value.firstName);
        formData.append('lastName', this.registrationForm.value.lastName);
        formData.append('email', this.registrationForm.value.email);
        formData.append('password', this.registrationForm.value.password);
        if (this.selectedImage) {
          formData.append('image', this.selectedImage);
        }
        this.backendService.insertNewUser(formData).subscribe((result: any) => {

          if (result.status) {
            this.toastr.success('User created successfully!', 'Success');
            this.router.navigate(['/admin/dashboard']);
          }

        }, (error: any) => {
          if (error.status === 400) {
            this.toastr.error(error.error.message, 'Error');
          }
        });
      }
    }
  }



}
