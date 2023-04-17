import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../models/intefaces';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  createUser(userData: User): Observable<any> {
    return this.http.post(`signup`, userData, httpOptions);
  }

  logUser(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`login`, userData, httpOptions);
  }

  getUser(): Observable<any> {
    return this.http.get(`user`);
  }

  getAdmin(): Observable<any> {
    return this.http.get(`admin`);
  }
  isLoggedIn() {
    return !!localStorage.getItem('userToken')
  }

  getToken(token:string) {
    if (token == "admin") {
      console.log("admin");
      return localStorage.getItem('adminToken')
    } else {
      console.log("user");
      return localStorage.getItem('userToken')
    }
  }

  adminLog(userData: User): Observable<any> {
    return this.http.post(`admin/login`, userData, httpOptions);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`admin/users`);
  }

  insertNewUser(userData: FormData): Observable<any> {
    return this.http.post(`admin/createuser`, userData, { withCredentials: true });
  }

  editUser(userData: FormData, id: string): Observable<any> {
    return this.http.put(`admin/edituser/${id}`, userData, { withCredentials: true });
  }
  removeUser(id: string): Observable<any> {
    return this.http.delete(`admin/deleteuser/${id}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`admin/user/${id}`);
  }

  profileUpload(userData: FormData, id: string): Observable<any> {
    return this.http.put(`profile/${id}`, userData, { withCredentials: true });
  }

}
