import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
          HttpClientTestingModule,
          RouterTestingModule
      ],
      declarations: [ AuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //Tu primer enunciado el cual debe asegurar lo siguiente:
  //Debe Asegurarse que el formulario sea invalido cuando ingrese datos erroneos
  //Patron AAA
  it('deberia retornar invalido el formulario', () => {
    //Arrange
    const mockCredentials = {
      email: '0x0x0x0x0x',
      password: "111111111111111111111111"
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')
    //Act
    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)
    //Assert
    
    expect(component.formLogin.invalid).toEqual(true);
  });

  it('deberia retornar "valido" el formulario', () => {
    //Arrange
    const mockCredentials = {
      email: 'test@test.com',
      password: "12345678"
    }

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')
    //Act
    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)
    //Assert
    
    expect(component.formLogin.invalid).toEqual(false);
  });

  it('El boton deberia tener la palabra "Iniciar sesión"', () =>{
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))//document querySelector()
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar sesión')
  })
});
