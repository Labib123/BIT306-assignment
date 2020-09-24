import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-main-testkit',
  templateUrl: './recorded-testkit.component.html',
  styleUrls: ['./recorded-testkit.component.css']
})
export class RecordedTestkitComponent implements AfterViewInit{
  displayedColumns: string[] = ['kitID', 'name', 'stock', 'edit'];
  dataSource = new MatTableDataSource<testKit>(KIT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface testKit {
  name: string;
  kitID: number;
  stock: number;
  edit: string;
}

const KIT_DATA: testKit[] = [
  {kitID: 1, name: 'Hydrogen', stock: 10, edit: ''},
  {kitID: 2, name: 'Helium', stock: 100, edit: ''},
  {kitID: 3, name: 'Lithium', stock: 200, edit: ''},
  {kitID: 4, name: 'Beryllium', stock: 9, edit: ''},
  {kitID: 5, name: 'Boron', stock: 11, edit: ''},
];


