import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { MatDialogRef} from '@angular/material/dialog';
import {RecordedTestCentreComponent} from '../recorded-tc/recorded-tc.component'
import {TestC} from "../tc.model"
import {TestCService} from '../tc.service' ;
@Component({
  selector: 'app-record-new-tc',
  templateUrl: './record-new-tc.component.html',
  styleUrls: ['./record-new-tc.component.css']
})
export class RecordNewTestCentreComponent implements OnInit {


  constructor(private dialogRef:MatDialogRef<RecordedTestCentreComponent>,private testCService: TestCService) { }
  //Add new test centre to TestCService
  public onAddTest(form:NgForm){
    if(form.invalid){
      return;
    }
      this.testCService.addTest(form.value.name)
      console.log(form.value.name)
    this.dialogRef.close();

      // this.postService.addPosts(form.value.title , form.value.content)

  }
  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close();
  }

}
