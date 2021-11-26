import { DataService } from './../../page/http/data.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular/lib/interfaces';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss']
})


export class StateSelectComponent implements AgRendererComponent{

  constructor(private _dataS: DataService) { 
    
  }
  
  state: string;
  states: Array<any> = [];
  params: ICellRendererParams
  
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.state = params.value;
    console.log(this.state)
    this.states = [this.state]
  }
  
  renderFields() {
    this.states = undefined;
    this._dataS.getStates().subscribe((res: any) => {
      this.states = res.map(s => s.sigla);
    }, error => {
      this.states = [this.state]
    });
  }

  setValue() {
    console.log(this.state)
    this.params.setValue(this.state);
    console.log(this.params)
  }

  refresh():boolean {
    console.log('teste')
    return true
  }
}



