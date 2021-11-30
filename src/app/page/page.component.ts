import { StateSelectComponent } from './../shared/state-select/state-select.component';
import { DataService } from './http/data.service';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community/dist/lib/entities/rowNode';
import { filter } from 'rxjs/operators';

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

  columnDefs: ColDef[] = [];

  rowClassRules;

  frameworkComponents = {
    stateCellRenderer: StateSelectComponent,
  };
  states = [];

  defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  rowData: Array<any[]>;
  private _lastRowChanged: RowNode;
  cellCellEditorParams;

  constructor(private _dataS: DataService) {
    this.columnDefs = [
      {
        field: '',
        maxWidth: 80,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: false,
      },
      { field: 'name' },
      { field: 'age' },
      { field: 'gender' },
      { field: 'address', flex: 2 },
      {
        field: 'state',
        // cellRenderer: 'stateCellRenderer',
        // editable: false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {}
      },
      {
        field: 'city',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {}
      },
    ];
    this.rowClassRules = {
      'line-error': function (params) {
        return (!params.data.age || params.data.age < 18) || !params.data.city
      },
      'line-edited': function (params) { 
        return params.data.age >=18 && params.data.city
      },
    };
  }

  ngOnInit(): void {
    this.getStates();
  }


  ngAfterViewInit(): void {
    this.agGrid.api.showLoadingOverlay();
    this._dataS.$states.pipe(filter(res => !!res)).subscribe(res => {
      const cell = this.agGrid.api.getColumnDef('state');
      cell.cellEditorParams.values = res.map(res => res.sigla);
    })
    this.agGrid.api.refreshCells({columns: ['state'] })
  }

  onCellEditingStarted(params) {
    console.log('cellEditingStarted');
    if (params.column.getId() === 'city') {
      this.getCities(params);
    }
  }

  onCellEditingStopped(event) {
    console.log('cellEditingStopped');
    this._lastRowChanged = event
    console.log(event)
  }

  onCellValueChanged(params) {
    console.log('cellEditingChanged');
    if (params.column.getId() === 'state') {
      params.node.setDataValue('city', null);
      this.getCities(params)
    }
  }

  onGridReady(params) {
    this._dataS.getLocalData().subscribe(res => {
      params.api.setRowData(res);
    });
  }

  getStates() {
    this._dataS.getStates().subscribe((res: any) => {
      console.log('pegou os estados')
      this._dataS.$states.next(res)
    }, error => {
      this._dataS.$states.next([]);
    });
  }

  getCities(params) {
      console.log('pegou as cidades de:', params.data.state)
      this._dataS.getCities(params.data.state).subscribe(res => {
        const cell = params.api.getColumnDef('city');
        cell.cellEditorParams.values = res.map(city => city.nome);
      }, error => console.error(error))
  }

  massiveEdit(): void {
    const selectedRows = this.agGrid.api.getSelectedNodes();
    if (selectedRows.length >= 1 && this._lastRowChanged) {
      this._changeAll(this._lastRowChanged, selectedRows)
    }

  }

  private _changeAll(editedRow, selectedRows) {
    this.agGrid.api.showLoadingOverlay();
    selectedRows.forEach(row => {
      console.log(row.data)
      row.setDataValue(editedRow.colDef.field, editedRow.value)
    });
    setTimeout(() => {
      this.agGrid.api.hideOverlay();
    }, 1000)
  }
}

