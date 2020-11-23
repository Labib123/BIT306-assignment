import { Injectable } from '@angular/core';
import{Test} from "./test.model" ;
import { HttpClientModule }  from '@angular/common/http';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests:Test[] = [] ;
  private postsUpdated = new Subject<Test[]>();
  constructor(private http: HttpClient,private router:Router,public authService:AuthService) {
  }
  private BACKEND_URL = "http://localhost:3000/api"
  private jsonObject = {};

  public  getTests() {
       //this.http.get<[]>("http://localhost:3000/api/tester/tests").subscribe(
        //response => {
        //this.tests =  response;

        //},
        //error => {
          //console.log(error);
        //});
        //return this.tests;
        this.http.get<{message: string, tests: any}>('http://localhost:3000/api/tester/tests')
    .pipe(map((postData) => {
      return postData.tests.map(tests => {
        return{
          email:tests.email,
          date:tests.date,
          id:tests._id,
          patientType:tests.patientType,
          status:tests.status
        };
      });
    }))
    .subscribe(transformedPosts =>{
      this.tests = transformedPosts;
      this.postsUpdated.next([...this.tests]);
    })
    return this.tests;
  }
  public  getTest(id):Test{
    let currentPost ;
      this.tests.forEach(function(tests){
        if(tests.id === id) {
          currentPost = tests;
        }
      })
      return currentPost;
    }

  public addTest(testerId,date,status,userId,patientType,symptoms)  {
    const testData = {testerId,symptoms:symptoms, date:date, status:status,userId:userId,patientType:patientType};
    console.log(testData)
    this.http.post('http://localhost:3000/api/tests/add', testData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  public updateTest(id,username,password,name,patientType,symptoms,result){
    this.tests.forEach(function(test){
      if(test.id === id) {
        test.username = username;
        test.password = password;
        test.name = name ;
        test.patientType = patientType;
        test.symptoms = symptoms ;
        test.status = 'complete' ;
        test.result = result;
        test.resultDate = new Date() ;
      }
    })
  }


}


