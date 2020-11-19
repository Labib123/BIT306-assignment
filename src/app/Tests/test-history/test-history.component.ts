import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Test} from "../test.model"
import {TestService} from '../test.service' ; 
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
/** Constants used to fill up our data base. */
@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'type','status','result'];
  dataSource: MatTableDataSource<Test>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private testsService: TestService, private dialog:MatDialog) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(testsService.getTests() );
  }


  ngOnInit(): void {
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

