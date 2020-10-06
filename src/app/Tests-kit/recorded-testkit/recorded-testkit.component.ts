import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TestKService} from "../testkit.service";
import {TestK} from "../testkit.model";
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecordNewTestkitComponent} from '../record-new-testkit/record-new-testkit.component';
import {UpdateTestkitComponent} from '../update-testkit/update-testkit.component';
@Component({
  selector: 'app-main-testkit',
  templateUrl: './recorded-testkit.component.html',
  styleUrls: ['./recorded-testkit.component.css']
})
export class RecordedTestkitComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'stock','activity'];
  dataSource: MatTableDataSource<TestK>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private testsKService: TestKService, private dialog:MatDialog) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(testsKService.getTests() );
  }
  // function to open record dialog
  onRecord(){
      let dialogConfig = new MatDialogConfig() ;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(RecordNewTestkitComponent,dialogConfig) ;

  }
  // function to open update dialog
  onUpdate(id){
    let dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {id:id} ;
    this.dialog.open(UpdateTestkitComponent,dialogConfig) ;

}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



