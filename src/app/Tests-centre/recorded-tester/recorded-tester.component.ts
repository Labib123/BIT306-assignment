import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TesterService} from "../tester.service";
import {Tester} from "../tester.model";
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-main-tester',
  templateUrl: './recorded-tester.component.html',
  styleUrls: ['./recorded-tester.component.css']
})
export class RecordedTesterComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'username', 'position', 'testcentre', 'activity'];
  dataSource: MatTableDataSource<Tester>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private testsCService: TesterService, private dialog:MatDialog) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(testsCService.getTesters() );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onUpdate(id){
    let dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {id:id} ;
    //this.dialog.open(UpdateTestCentreComponent,dialogConfig) ;
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
