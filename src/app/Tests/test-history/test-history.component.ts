import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Test} from "../test.model"
import {TestService} from '../test.service' ; 
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from   '../../auth.service' ;

/** Constants used to fill up our data base. */
@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'type','status','result'];
  public testsArray; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService:AuthService,private testsService: TestService, private dialog:MatDialog) {
  
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
   //  this.dataSource.filter = filterValue.trim().toLowerCase();
   
    
   }
  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.testsService.getPatientTest(this.authService.email).subscribe((response: any) => {
      console.log("response", response);
      this.testsArray = new MatTableDataSource(response.tests)
    });

}
  ngAfterViewInit() {
    this.initializeTable();

  }

}

