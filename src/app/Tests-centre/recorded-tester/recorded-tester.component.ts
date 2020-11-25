import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TesterService} from "../tester.service";
import {Tester} from "../tester.model";
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-tester',
  templateUrl: './recorded-tester.component.html',
  styleUrls: ['./recorded-tester.component.css']
})
export class RecordedTesterComponent implements AfterViewInit{
  displayedColumns: string[] = ['name', 'username', 'position', 'testcentre', 'activity'];
  dataSource: MatTableDataSource<Tester>;
  private postSub:Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private testerService: TesterService, private dialog:MatDialog) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(testerService.getTesters() );
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    this.initializeTable();
  }
  onDeleteTester(id: String){
    this.testerService.deleteTester(id);
    this.initializeTable();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    //if (this.dataSource.paginator) {
      //this.dataSource.paginator.firstPage();
    //}
  }
  testers: Tester[] = [];
  ngOnInit(){

    //this.testerService.getTesters();
    //this.postSub = this.testerService.getPostUpdateListener()
    //.subscribe((tester:Tester[])=>{
      //this.testers = tester;
    //});
    this.initializeTable();
  }
  initializeTable() {
    this.testerService.findtester().subscribe((response: any) => {
      console.log("response", response);
      this.dataSource = new MatTableDataSource(response.tester)
    });

}

}
