import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  //listResult: TrackModel[] =[]
  listResult$: Observable<any>= of([])

  constructor(private searchServices: SearchService) { }

  ngOnInit(): void {
  }
  receiveData(event: string):void{
    //agarras el termino y sabes que se ejecuta cuando tiene tres caracteres
    console.log('Estoy en el padre!!!',event)
    this.listResult$ = this.searchServices.searchTracks$(event)
    //.subscribe(({data}) =>{
      //this.listResult = data;
    //})

  }

}
