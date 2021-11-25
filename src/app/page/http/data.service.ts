import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<Array<any>>('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }

  getStates(): Observable<any> {
    return this._http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  }

  getCityes(stateCode): Observable<any> {
    return this._http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`)
  }
}
