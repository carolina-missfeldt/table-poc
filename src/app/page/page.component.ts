import { StateSelectComponent } from './../shared/state-select/state-select.component';
import { DataService } from './http/data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { AgGridAngular } from 'ag-grid-angular';
import { RowEditingStoppedEvent } from 'ag-grid-community/dist/lib/events';
import { RowNode } from 'ag-grid-community/dist/lib/entities/rowNode';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, AfterViewInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;
  overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Carregando dados da tabela, por favor aguarde.</span>';

  columnDefs: ColDef[] = [
    {
      field: '',
      flex: 1,
      maxWidth: 100,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      editable: false,
    },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date', filter: 'agDateColumnFilter' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    {
      field: 'state',
      cellRenderer: 'stateCellRenderer'
    },
    // {
    //   field: 'city',
    //   cellEditor: 'agSelectCellEditor',
    //   cellEditorParams: this.cellCellEditorParams,
    // },
    
  ];

  rowClassRules = {
    'rag-green': 'data.age < 20',
    'rag-amber': 'data.age >= 20 && data.age < 25',
    'rag-red': 'data.age >= 25',
};

  frameworkComponents = {
    stateCellRenderer: StateSelectComponent,
  };


  defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  rowData: Array<any[]>;
  private _lastRowChanged: RowNode;

  constructor(private _dataS: DataService, private socketService: SocketService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.agGrid.api.showLoadingOverlay();
  }

  onCellEditingStarted(event) {
    console.log('cellEditingStarted');
    console.log(event.data)
  }

  onCellEditingStopped(event) {
    console.log('cellEditingStopped');
    this._lastRowChanged = event
    console.log(event.data)
    this.massiveEdit();

  }

  onCellValueChanged(params) {
    console.log(params.node)
  }

  onGridReady(params) {
    this._dataS.getData().subscribe(res => {
      this.rowData = res;
      params.api.setRowData(res);  
    });

    this.socketService.onNewProcessedLines().subscribe((newAthlete: any) => {
      this.rowData = [newAthlete, ...this.rowData]
      this.agGrid.api.setRowData(this.rowData)
    });

  }

  massiveEdit(): void {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if(selectedRows.length > 1 && this._lastRowChanged) {
      this._changeAll(this._lastRowChanged, selectedRows)
    }
    
  }
  
  private _changeAll(editedRow, selectedRows) {
    this.agGrid.api.showLoadingOverlay();
    selectedRows.forEach(row => {
      console.log(row.data)
      row.setDataValue(editedRow.colDef.field, editedRow.value)
    });
    this.agGrid.api.hideOverlay();
    this.agGrid.api.deselectAll()
  }

}
