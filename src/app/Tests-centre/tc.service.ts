import { Injectable } from '@angular/core';
import{TestC} from "./tc.model" ;

@Injectable({
  providedIn: 'root'
})
export class TestCService {
  private testsC:TestC[] = [
    {id: 1, name: 'Damansara'},
    {id: 2, name: 'Puchong'},
    {id: 3, name: 'Sunway'},
  ]
  constructor() {
  }

  public  getTests():TestC[] {
    return this.testsC;
    }

    public  getTest(id):TestC {
      let currentPost ;
        this.testsC.forEach(function(testC){
          if(testC.id === id) {
            currentPost = testC;
          }
        })
        return currentPost;
    }
  public addTest(name)  {
    let lastElementId = this.testsC[this.testsC.length-1].id;

    let testC:TestC  = {name:name,id:lastElementId+1}
    this.testsC.push(testC);
  }
  public updateTest(id,name){
    this.testsC.forEach(function(testC){
      if(testC.id === id) {
        testC.name = name ;
      }
    })
  }


}


