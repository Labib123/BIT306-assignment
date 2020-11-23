import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestC} from "../tc.model";
import {TestCService} from "../tc.service";
import {NgForm} from '@angular/forms';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-update-tc',
  templateUrl: './update-tc.component.html',
  styleUrls: ['./update-tc.component.css']
})
export class UpdateTestCentreComponent implements OnInit {


  id ;
  currentTest:TestC;

  testResult;
  selectedType;
  constructor(   private dialogRef: MatDialogRef<TestC>,  @Inject(MAT_DIALOG_DATA) data,private testCService: TestCService ) {
    this.id = data.id;
    this.currentTest= this.testCService.getTest(this.id);
}

onCancel(){
  this.dialogRef.close()
}

onUpdateTest(form:NgForm){
  if(form.invalid){
    return;
  }
  this.testCService.updateTest(this.currentTest.id, form.value.name)
  this.dialogRef.close();
}

  ngOnInit(): void {
  }

}
