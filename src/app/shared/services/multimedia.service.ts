import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement //etiquetas en html que son un reproductor
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentege$: BehaviorSubject<number> = new BehaviorSubject(0)

 
  constructor() { 
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk)
      }
      
    })

    this.listenAllEvent()
    
  }

  private listenAllEvent(): void {
    this.audio.addEventListener('timeupdate',this.calculateTime, false )
    this.audio.addEventListener('playing',this.setPlayerStatus, false )
    this.audio.addEventListener('play',this.setPlayerStatus, false )
    this.audio.addEventListener('pause',this.setPlayerStatus, false )
    this.audio.addEventListener('ended',this.setPlayerStatus, false )
  }

  private setPlayerStatus=(state:any) => {
      //console.log('😧😧😧😧', state)
      switch(state.type){ //contiene el estado de la cancion
        case 'play':
          this.playerStatus$.next('play')
          break;
        case 'playing':
          this.playerStatus$.next('playing')
          break;
          case 'ended':
            this.playerStatus$.next('ended')
            break;   
        default:
          this.playerStatus$.next('paused')
        break;  
      }
  }


  private calculateTime = () => {
      console.log('Disparando evento')
      const {duration, currentTime } = this.audio
      //console.table([duration, currentTime])
      this.setTimeElapsed(currentTime)
      this.setTimeRemaining(currentTime, duration)
      this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime:number, duration: number): void{
    //duration == 100%
    //currentTime==(x)
    //(currentTime * 100) / duration
    let percentage = (currentTime * 100 )/ duration
    this.playerPercentege$.next(percentage)

  }

  private setTimeElapsed (currentTime: number): void {
    // 5.1, 8.2
      let seconds = Math.floor(currentTime % 60) //para que me de un numero entero
      let minutes = Math.floor((currentTime / 60) % 60)
      
      // 00:00 ---> 01:05 --> 10:15
      const displaySeconds = (seconds < 10)? `0${seconds}`: seconds;
      const displayMinutes = (minutes < 10)? `0${minutes}`: minutes; 
      const displayFormat = `${displayMinutes}:${displaySeconds}`
      this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime:number, duration:number): void{
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60) //para que me de un numero entero
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10)? `0${seconds}`: seconds;
    const displayMinutes = (minutes < 10)? `0${minutes}`: minutes; 
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
    
  }

  public setAudio(track:TrackModel):void{
    console.log('🦾🦾🦾', track);
    this.audio.src = track.url
    this.audio.play()

  }
  public togglePlayer():void{
    (this.audio.paused)? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage:number):void {
    const{ duration } = this.audio
    console.log(`Duration: ${duration}, percentage: ${percentage}`)
    //100% --> duration (200s)
    //70% ====> (x)
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
    //console.log(percentageToSecond)
  }
}
