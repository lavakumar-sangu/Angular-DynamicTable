import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { datashareService } from '../datashare.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { NotificationService } from '../notification.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface user {
  name: string;
  passwords: string;
}

export interface tableRow{
  position: number;
  select :string;
  name: string;
  passwords: string;
  actions:string;
}

@Component({
  selector: 'app-datastorage',
  templateUrl: './datastorage.component.html',
  styleUrls: ['./datastorage.component.css'],
})
export class PaginatorComponent implements OnInit {
  dataSource = new MatTableDataSource<{ name: string; passwords: string }>();
  selection = new SelectionModel<{ name: string; passwords: string }>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: tableRow): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  constructor(
    public dataService: datashareService,
    private dialog: MatDialog,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    var storedData = JSON.parse(
      localStorage.getItem('dataSource.data') || '{}'
    );
    this.dataSource.data = storedData;
  }

  displayedColumns = ['select', 'name', 'passwords', 'actions'];

  deleteData() {
    const numSelected = this.selection.selected;

    var datafromServices = JSON.parse(localStorage.getItem('dataSource.data') || '{}');
    for(let i of numSelected ){
      console.log(i.name);
      var datafromServices = datafromServices.filter((value: { name: any; })=>{return i.name!=value.name});
    }
    console.log(datafromServices);
    localStorage.setItem('dataSource.data', JSON.stringify(datafromServices)); 
    this.ngOnInit()
  }

  removeData(i: number) {
    console.log(i);
    var storedData = JSON.parse(
      localStorage.getItem('dataSource.data') || '{}'
    );
    var indexToRemove = i;
    var numSelected = i;
    console.log(numSelected);

    if (indexToRemove == 0) {
      storedData.splice(0, 1);
    } else storedData.splice(indexToRemove, i);
    localStorage.setItem('dataSource.data', JSON.stringify(storedData));

    this.notificationService.confirmation(
      'it will be remove forever',
      () => {
        this.ngOnInit();
        this.notificationService.success('Removed');
      },
      'Are you sure?',
      () => {
        this.notificationService.error('confirm canceled');
      }
    );
  }

  onCreate() {
    const dialogRef = this.dialog.open(LoginpageComponent, { width: '35%' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let storedData = JSON.parse(
          localStorage.getItem('dataSource.data') || '{}'
        );
        this.dataSource.data = storedData;
      }
    });
  }
}
