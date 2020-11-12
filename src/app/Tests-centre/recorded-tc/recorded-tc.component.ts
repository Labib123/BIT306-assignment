import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TestCService} from "../tc.service";
import {TestC} from "../tc.model";
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecordNewTestCentreComponent} from '../record-new-tc/record-new-tc.component';
import {UpdateTestCentreComponent} from '../update-tc/update-tc.component';
import {AddTesterComponent} from '../add-tester/add-tester.component';


@Component({
  selector: 'app-main-tc',
  templateUrl: './recorded-tc.component.html',
  styleUrls: ['./recorded-tc.component.css']
})
export class RecordedTestCentreComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'activity'];
  dataSource: MatTableDataSource<TestC>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private testsCService: TestCService, private dialog:MatDialog) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(testsCService.getTests() );
  }

  onRecord(){
      let dialogConfig = new MatDialogConfig() ;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(RecordNewTestCentreComponent,dialogConfig) ;

  }

  onUpdate(id){
    let dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {id:id} ;
    this.dialog.open(UpdateTestCentreComponent,dialogConfig) ;
}
onAddTester(id){
  let dialogConfig = new MatDialogConfig() ;
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data= {id:id} ;
  this.dialog.open(AddTesterComponent,dialogConfig) ;
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
