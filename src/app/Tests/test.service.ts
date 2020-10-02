import { Injectable } from '@angular/core';
import{Test} from "./test.model" ; 

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests:Test[] = [
    {id:1,username:"Labib",password:'test@123',patientType:"Returnee",symptoms:'cold',date:new Date("2020-01-16"),resultDate:new Date("2020-01-16"),status:"pendind",name:"test",result:"pending"},
    {id:2,username:"Ali",password:'test@123',patientType:"Close Contact",symptoms:'cold',date:new Date("2020-01-16"),resultDate:new Date("2020-01-16"),status:"pendind",name:"test",result:"pending "},
    {id:3,username:"Fawaz",password:'test@123',patientType:"Returnee",symptoms:'cold',date:new Date("2020-01-16"),resultDate:new Date("2020-01-16"),status:"pendind",name:"test",result:" pending"},
  ]   
  constructor() { 
  }
 
  public  getTests():Test[] { 
    return this.tests; 
    }

    public  getTest(id):Test {
      let currentPost ; 
        this.tests.forEach(function(test){
          if(test.id === id) {
            currentPost = test; 
          }
        })
        return currentPost;
    }
  public addTest(username,password,name,patientType,symptoms)  {
    let lastElementId = this.tests[this.tests.length-1].id; 

    let test:Test  = {username:username,password:password,name:name,patientType:patientType,symptoms:symptoms,id:lastElementId+1,date:new Date(),status:"pending",result:"",resultDate:new Date()}
    this.tests.push(test); 
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


