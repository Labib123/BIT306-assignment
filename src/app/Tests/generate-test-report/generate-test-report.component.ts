import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Test} from "../test.model"
import {TestService} from '../test.service' ;
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from   '../../auth.service' ;

@Component({
  selector: 'app-generate-test-report',
  templateUrl: './generate-test-report.component.html',
  styleUrls: ['./generate-test-report.component.css']
})
export class GenerateTestReportComponent implements  AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'type','status','activity'];
  fileUrl;
  public testsArray; 


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.initializeTable();
  }

  initializeTable() {
        this.testsService.getAllTests().subscribe((response: any) => {
          console.log("response", response);
          this.testsArray = new MatTableDataSource(response.tests)
        });

  }
  constructor(private authService:AuthService,private testsService: TestService, private dialog:MatDialog,private sanitizer: DomSanitizer) {

  }
  ngAfterViewInit() {
   this.initializeTable();
  }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
   //  this.dataSource.filter = filterValue.trim().toLowerCase();
   
    
   }
  
}
