import { TestBed } from '@angular/core/testing';

import { SessionGuard } from './session.guard';
import { RouterTestingModule } from '@angular/router/testing';

//describe es el nombre  de la prueba  "Examen del SessionGuard"
describe('testting of SessionGuard', () => {
  let guard: SessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ]
    });
    
    guard = TestBed.inject(SessionGuard);
  });

  //la primera pregunta de el examen 
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
