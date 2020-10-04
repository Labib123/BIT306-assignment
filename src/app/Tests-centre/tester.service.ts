import { Injectable } from '@angular/core';
import{Tester} from "./tester.model" ;

@Injectable({
  providedIn: 'root'
})
export class TesterService {
  private testers:Tester[] = [
    {id: 1, name: 'Will', username: 'will', password:'will',position:'Tester', testC:'Damansara'},
    {id: 1, name: 'Dan', username: 'Dan', password:'Dan',position:'Tester', testC:'Puchong'},
    {id: 1, name: 'Tan', username: 'Tan', password:'Tan',position:'Tester', testC:'Sunway'},
  ]
  constructor() {
  }

  public  getTesters():Tester[] {
    return this.testers;
    }

    public  getTester(id):Tester {
      let currentPost ;
        this.testers.forEach(function(testC){
          if(testC.id === id) {
            currentPost = testC;
          }
        })
        return currentPost;
    }
  public addTester(name,username,password,position,testC)  {
    let lastElementId = this.testers[this.testers.length-1].id;

    let tester:Tester  = {name:name,username:username,password:password,position:position,testC:testC,id:lastElementId+1}
    this.testers.push(tester);
  }
  public updateTester(id,name,username,password){
    this.testers.forEach(function(tester){
      if(tester.id === id) {
        tester.name = name ;
        tester.username = username ;
        tester.password = password ;
      }
    })
  }


}


