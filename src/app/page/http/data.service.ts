import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mock } from './mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  $states: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<Array<any>>('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }

  getStates(): Observable<any> {
    return this._http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  }

  getCities(stateCode): Observable<any> {
    return this._http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`)
  }

  getLocalData() {
    return of(mock);
  }
}
