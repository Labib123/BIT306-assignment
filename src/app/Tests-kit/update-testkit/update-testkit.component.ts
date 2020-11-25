
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestK} from "../testkit.model";
import {TestKService} from "../testkit.service";
import {NgForm} from '@angular/forms';

import { Inject } from '@angular/core';
@Component({
  selector: 'app-update-testkit',
  templateUrl: './update-testkit.component.html',
  styleUrls: ['./update-testkit.component.css']
})
export class UpdateTestkitComponent implements OnInit {
  id ;
  currentTestKit;
  public testKitArray;

  testResult;
  TestKitname;
  TestKitstock;
  selectedType;
  constructor(   private dialogRef: MatDialogRef<TestK>,  @Inject(MAT_DIALOG_DATA) data,private testService: TestKService ) {
    this.id = data.id;
    this.onInitialize();
}


onInitialize(){
  this.testService.getTests().subscribe((response: any) => {

    this.testKitArray = response.testsK;
    this.testKitArray.forEach( (element) => {
      if(element._id == this.id){
        this.currentTestKit = element;
        this.TestKitname = this.currentTestKit.name
        this.TestKitstock = this.currentTestKit.stock
        console.log(this.currentTestKit.name)
      }
  });


  }); ;
}

onCancel(){
  this.dialogRef.close()
}


onUpdateTest(form:NgForm){
  if(form.invalid){
    return;
  }
  this.testService.updateTest(this.currentTestKit._id, form.value.name,form.value.stock)
   this.dialogRef.close();
}



  ngOnInit(): void {
    this.onInitialize();

  }

}
