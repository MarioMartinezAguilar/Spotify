import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(private http:HttpClient) { }

  sendCredential(email: string, password:string): Observable<any> {
    //console.log(email,password)
    const body = {
      email,
      password
      
    }
    return this.http.post(`${ this.URL }/auth/login`, body)
    
    

  }
}
