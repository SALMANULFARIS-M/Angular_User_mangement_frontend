import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { FormBuilder, AbstractControl, FormGroup } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id?: string;
  userData: any;
  imageSrc?: string;
  path: string = "http://localhost:3000/";
  submit: boolean = false;
  selectedImage?: File;
  constructor(private fb: FormBuilder, private backendService: BackendService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {

    this.backendService.getUser().subscribe((res: any) => {

      this.imageSrc = this.path + res.userData.image
      this.userData = res.userData
      this.id = res.userData._id
    },(error: any) => {
       if (error.status === 400) {
        this.router.navigate(['/login'])
       }})

  }

  registrationForm: FormGroup = this.fb.group({
    image: ['', [this.imageValidator]]
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
      const button = document.getElementById('saveButton') as HTMLImageElement;
      button.style.display = "block";
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
    console.log("hello");

    // Check if the form is valid
    const formData = new FormData();
    if (this.registrationForm.valid) {
      // Access the form data

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      if (this.id) {
        this.backendService.profileUpload(formData, this.id).subscribe((result: any) => {

          if (result.status) {
            const button = document.getElementById('saveButton') as HTMLImageElement;
            button.style.display = "none";
            this.router.navigate(['/profile']);
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
