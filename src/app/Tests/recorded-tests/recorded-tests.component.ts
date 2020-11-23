import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Test} from "../test.model"
import {TestService} from '../test.service' ;
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecordNewTestComponent} from '../record-new-test/record-new-test.component' ;
import {UpdateTestComponent} from '../update-test/update-test.component'
import {AuthService} from   '../../auth.service' ;

/** Constants used to fill up our data base. */


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-overview-example',
  styleUrls: ['recorded-tests.component.css'],
  templateUrl: 'recorded-tests.component.html',
})
export class RecordedTestsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'type','status','activity'];
  dataSource: MatTableDataSource<Test>;
  private tests = [] ;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private testsService: TestService, private dialog:MatDialog,private authService:AuthService) {
    console.log(authService.email)
    this.dataSource = new MatTableDataSource( this.testsService.getTests());

  }

  onRecord(){
      let dialogConfig = new MatDialogConfig() ;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(RecordNewTestComponent,dialogConfig) ;

  }

  onUpdate(id){
    let dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {id:id} ;
    this.dialog.open(UpdateTestComponent,dialogConfig) ;

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

