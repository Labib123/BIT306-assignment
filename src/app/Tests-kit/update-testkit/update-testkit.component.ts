
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestK} from "../testkit.model";
import {TestKService} from "../testkit.service";
import {NgForm} from '@angular/forms'

import { Inject } from '@angular/core';
@Component({
  selector: 'app-update-testkit',
  templateUrl: './update-testkit.component.html',
  styleUrls: ['./update-testkit.component.css']
})
export class UpdateTestkitComponent implements OnInit {
  id ;
  currentTest:TestK;

  testResult;
  selectedType;
  constructor(   private dialogRef: MatDialogRef<TestK>,  @Inject(MAT_DIALOG_DATA) data,private testService: TestKService ) {
    this.id = data.id;
    this.currentTest= this.testService.getTest(this.id);


}



onCancel(){
  this.dialogRef.close()
}


onUpdateTest(form:NgForm){
  if(form.invalid){
    return;
  }
  this.testService.updateTest(this.currentTest.id, this.currentTest.name,this.currentTest.stock)
   this.dialogRef.close();
}



  ngOnInit(): void {
  }

}
