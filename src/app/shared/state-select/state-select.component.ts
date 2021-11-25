import { DataService } from './../../page/http/data.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular/lib/interfaces';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss']
})


export class StateSelectComponent implements AgRendererComponent{

  constructor(private _dataS: DataService) { }

  state: string;
  states: Array<any> = [];
  params: ICellRendererParams

  agInit(params: ICellRendererParams): void {
    this.params = params;
    if(!this.states.length) {
      this.renderFields();
    }
  }
  
  renderFields() {
    this._dataS.getStates().subscribe((res: any) => {
      // console.log(res)
        this.states = res;
        this.params.refreshCell();
    });
  }

  refresh():boolean {
    return true
  }


  onChange(event) {
    // console.log(event)
    // console.log(this.params.node)
    this.params.node.setDataValue('state', this.state);
}

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
}

}
function take(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

