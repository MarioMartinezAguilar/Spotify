import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';//programacion Reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
@ViewChild('progressBar') progressBar:ElementRef = new ElementRef('')
  ListObserver1$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
  
    const observer1$= this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.ListObserver1$ = [observer1$]
    

  }
  ngOnDestroy(): void {
    this.ListObserver1$.forEach(u => u.unsubscribe())
    console.log('Buum!');
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const {clientX} = event
    const {x, width} = elNative.getBoundingClientRect() 
    const clickX = clientX - x 
    const percentageFronX = (clickX * 100 )/width

    console.log(`Click(x):${percentageFronX}`);
    this.multimediaService.seekAudio(percentageFronX)
  }
}