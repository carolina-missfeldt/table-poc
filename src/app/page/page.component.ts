import { StateSelectComponent } from './../shared/state-select/state-select.component';
import { DataService } from './http/data.service';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community/dist/lib/entities/rowNode';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  rowClassRules;

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
    this.rowClassRules = {
      'rag-red': function(params) { return params.data.age > 25; },
      'rag-green': function(params) { return params.data.age < 25; },
    };
    
  }

  ngAfterViewInit(): void {
    this.agGrid.api.showLoadingOverlay();
  }

  onCellEditingStarted(event) {
    console.log('cellEditingStarted');
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
  }

}
