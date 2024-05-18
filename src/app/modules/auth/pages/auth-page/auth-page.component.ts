import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSesion:boolean = false
  formLogin: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private authServices:AuthService, private cookie: CookieService, private router:Router) { }

  ngOnInit(): void {
    this.formLogin = new UntypedFormGroup(
      {
        email: new UntypedFormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }
  sendLogin():void{
    const {email, password} = this.formLogin.value
    
    this.authServices.sendCredential(email, password)
    //200 <400
    .subscribe(responseOK =>{// cuando el usuaro ingrese sus credenciales correctas
      console.log('Sesion iniciada correcta', responseOK);
      const { tokenSesion, data } = responseOK
      this.cookie.set('token',  tokenSesion, 4, '/')
      this.router.navigate(['/','tracks'])

    },
    err =>{ //erro 400>=
      this.errorSesion = true
      console.log('ocurrio un error con tu email o password');
    })
  }

}
