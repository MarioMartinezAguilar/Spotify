import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
   
  @Input() custonImg: string | boolean = false
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement
    console.log('Esta Imagten revento -->', this.elHost)
  
  if(this.custonImg){
    elNative.src = this.custonImg
  }else{
    elNative.src = '/assets/imagenes/imgBroken.jpg'
  }

  }

  constructor(private elHost: ElementRef) {
    console.log(this.elHost)
   }

}
