import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });
  it('Probando entrada y salida de valores', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any =(mockRaw as any).default;
    // En la parte de la acction\
    const result: TrackModel[] = pipe.transform(data)
    //parte del assert
    expect(result).toEqual(data)


  });

  it('Probar si se ordena  de manera correcta Ascendente', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any =(mockRaw as any).default;
    const firstValue = data.find((i:any) => i._id == 2)// primer valor
    const lastValue = data.find((i:any) => i._id == 3)//ultimo valor

    //action
    const result: TrackModel[] = pipe.transform(data,'name','asc')
    const firstResult = result[0]
    const lasResult = result[result.length -1 ]
    //Assert
    expect(firstResult).toEqual(firstValue)
    expect(lasResult).toEqual(lastValue)


  });
  it('Probar si se ordena  de manera correcta descendente', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any =(mockRaw as any).default;
    const firstValue = data.find((i:any) => i._id == 2)// primer valor
    const lastValue = data.find((i:any) => i._id == 3)//ultimo valor

    //action
    const result: TrackModel[] = pipe.transform(data,'name','desc')
    const firstResult = result[0]
    const lasResult = result[result.length -1 ]
    //Assert
    expect(firstResult).toEqual(lastValue)
    expect(lasResult).toEqual(firstValue)


  });



});
