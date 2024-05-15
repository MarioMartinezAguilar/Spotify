import { Component,ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


//nesecitamos un compoenente de prueba
@Component({
  template:'<img class="testing-directive" appImgBroken [src]="srckMock">'
})

class TestComponent{
  public srckMock: any =  null
}

//la prueba de imgBroken es la siguiente
describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture:ComponentFixture<TestComponent>

  beforeEach(()=>{
   TestBed.configureTestingModule({
    declarations:[
      TestComponent,
      ImgBrokenDirective
    ]
   })
   
   fixture =TestBed.createComponent(TestComponent)
   component = fixture.componentInstance
   fixture.detectChanges()
  })

  //deberia de instanciar correctamente
  it('should create an instance', () => {
    const mockElement  = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });
  it( 'TestComponent deberia instanciarse correctamente',() => {
    expect(component).toBeTruthy()
  })
  it( 'Directiva deberia cambiar la imagen por defecto de la carpeta assets',(done:DoneFn) => {
    //Arrange
    const beforeImgElement =  fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const beforeImgSrc = beforeImgElement.src //Tenemos la url antes de ser cambiada por la directiva
    component.srckMock = undefined

    setTimeout(()=>{
      const afterImgElement =  fixture.debugElement.query(By.css('.testing-directive')).nativeElement
      const afterImgSrc = afterImgElement.src //Tenemos la url despues de ser cambiada por la directiva

      expect(afterImgSrc).toMatch(/\bassets\b/)
      done()
    }, 3000) 

  })  

});
