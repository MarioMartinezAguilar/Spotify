
import { Component, Input, OnInit, Output } from '@angular/core';
//import * as dataRaw from '../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';



@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {
   @Input() tracks: TrackModel[] = [] 
   
   
    optionSort:{property:string | null, order:string} = { property:null,order: 'asc'}
    

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    //const { data } : any = (dataRaw as any).default
    //this.tracks = data;
    
    this.trackService.getAllRandom$()
   .subscribe((response: TrackModel[])=>{
      this.tracks = response
    })
  }

  changeSort(property: string): void{
    const { order } = this.optionSort
    this.optionSort ={
      property,
      order: order === 'asc'? 'desc':'asc'
    }
    console.log(this.optionSort)
  }

}
