import { Component, OnDestroy, OnInit } from '@angular/core';

import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit , OnDestroy {
/* mocksTracksList : Array<TrackModel> =[] */
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel>=[]

  ListObservers$: Array<Subscription>=[]
  constructor(private trackService:TrackService) { }

  ngOnInit(): void {
    this.loadDateAll()
    this.loadDataRandom()
  }

  async loadDateAll():Promise<any>{
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    
  }
  

  loadDataRandom():void{
    this.trackService.getAllRandom$().subscribe((response:TrackModel[]) =>{
      //console.log(response)
      this.tracksRandom = response
    })   
  }
  ngOnDestroy(): void {
    
  }

}
