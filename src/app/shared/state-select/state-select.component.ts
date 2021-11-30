import { DataService } from './../../page/http/data.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular/lib/interfaces';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss']
})


export class StateSelectComponent implements AgRendererComponent{

  constructor(private _dataS: DataService) { 
    
  }
  
  states: Array<any> = [];
  params: any;
  
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this._dataS.$states.pipe(filter(res => !!res)).subscribe(states => {
      this.states = states.map(s => s.sigla);
    })
  }
  
  setValue(): void {
    this.params.setValue(this.params.value);
    console.log(this.params)
  }

  refresh():boolean {
    return true
  }
}



