import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, observable, of } from 'rxjs';
import { map, mergeMap, tap , catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TracksModule } from '../tracks.module';
//import { resolve } from 'dns';
//import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api;
 
  constructor(private httpClient: HttpClient) { 
    
  }
  private skipById(listTracks:TrackModel[], id: number):Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
  }

  //metodo que nos devuelve todas las canciones
  //todo {data:{..1..2..3}}
  getAllTracks$(): Observable<any>{
      return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map(({data}:any)=>{
          return data
        })
      )
  }
    //devolver canciones Random
    
  getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      //tap(data => console.log('data completa',data)),
      //mergeMap(({data}:any)=>this.skipById(data, 2)),  //En esta linea devolvemos la lista revertida
      map(({data}:any)=>{
        return data
      }) 
      /* map((dataRevertida)=>{  //aplicar un filter comun de array
        return dataRevertida.filter((track: TrackModel) => track._id != 2)
      }) */
      /*  tap(data => console.log('dentro del pipe',data)),
      catchError((err)=>{
        const { status , statusText } = err
        console.log('Algo mpaso Revisame', [status, statusText])
        return of([])
      })  */
    )
  }
}
