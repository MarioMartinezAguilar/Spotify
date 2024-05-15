import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as mockRaw from '../../../data/user.json';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockuser: any = (mockRaw as any).default;
  let httpClientSpy:{ post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post'])
    service = new AuthService(httpClientSpy as any )
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // Vamos a crear la prueba del sendCredential
  it('Debe de retornar un objeto con "data" y "tokenSesion"', (done:DoneFn) => {
    //Arrange
    const user: any = mockuser.userOK
    const mockResponse={
      data:{},
      tokenSession:'0x0x0x'
    }
    httpClientSpy.post.and.returnValue(
      of(mockResponse) //ya es observable
    )
    
    //acction
    service.sendCredential(user.email, user.password)
    .subscribe(responseApi => { //['data', 'tokesession']
        const getProperties = Object.keys(responseApi)
        expect(getProperties).toContain('data')
        //console.log('oooooo', responseApi)
        expect(getProperties).toContain('tokenSession')
        done()
    })
  })
});
