import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Test} from "../test.model"
import {TestService} from '../test.service' ;
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecordNewTestComponent} from '../record-new-test/record-new-test.component' ;
import {UpdateTestComponent} from '../update-test/update-test.component'
import {AuthService} from   '../../auth.service' ;
import { take } from "rxjs/operators";
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
  public testsArray; 
  displayedColumns: string[] = ['id', 'name', 'date', 'type','status','activity'];
  dataSource: MatTableDataSource<Test>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private testsService: TestService, private dialog:MatDialog,private authService:AuthService) {
    
    }
    ngOnInit() {
      this.initializeTable();
    }
  
    initializeTable() {
          this.testsService.findTests(this.authService.email).subscribe((response: any) => {
            console.log("response", response);
            this.testsArray = new MatTableDataSource(response.tests)
          });

    }

  onRecord(){
      let dialogConfig = new MatDialogConfig() ;
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(RecordNewTestComponent,dialogConfig) ;
      this.dialog._getAfterAllClosed().subscribe(() => {
        this.initializeTable();
      });
      

  }

  onUpdate(id){
    let dialogConfig = new MatDialogConfig() ;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data= {id:id} ;
    this.dialog.open(UpdateTestComponent,dialogConfig) ;
    this.dialog._getAfterAllClosed().subscribe(() => {
      this.initializeTable();
    });

}
ngAfterViewInit() {
  this.initializeTable();
}

applyFilter(event: Event) {
 // const filterValue = (event.target as HTMLInputElement).value;
//  this.dataSource.filter = filterValue.trim().toLowerCase();

 
}
}