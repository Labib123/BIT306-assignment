import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { MatDialogRef} from '@angular/material/dialog';
import {RecordedTestkitComponent} from '../recorded-testkit/recorded-testkit.component'
import {TestK} from "../testkit.model"
import {TestKService} from '../testkit.service' ;
@Component({
  selector: 'app-record-new-testkit',
  templateUrl: './record-new-testkit.component.html',
  styleUrls: ['./record-new-testkit.component.css']
})
export class RecordNewTestkitComponent implements OnInit {


  constructor(private dialogRef:MatDialogRef<RecordedTestkitComponent>,private testService: TestKService) { }

  public onAddTest(form:NgForm){
    if(form.invalid){
      return;
    }
      this.testService.addTest(form.value.name, form.value.stock)
      console.log(form.value.name, form.value.stock)
    this.dialogRef.close();

      // this.postService.addPosts(form.value.title , form.value.content)

  }
  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close();
  }

}
