import { Injectable } from '@angular/core';
import{TestK} from "./testkit.model" ;

@Injectable({
  providedIn: 'root'
})
export class TestKService {
  private testsK:TestK[] = [
    {id: 1, name: 'Hydrogen', stock: 10},
    {id: 2, name: 'Helium', stock: 100},
    {id: 3, name: 'Lithium', stock: 200},
  ]
  constructor() {
  }

  public  getTests():TestK[] {
    return this.testsK;
    }

    public  getTest(id):TestK {
      let currentPost ;
        this.testsK.forEach(function(testK){
          if(testK.id === id) {
            currentPost = testK;
          }
        })
        return currentPost;
    }
  public addTest(name,stock)  {
    let lastElementId = this.testsK[this.testsK.length-1].id;

    let testK:TestK  = {name:name,stock:stock,id:lastElementId+1,}
    this.testsK.push(testK);
  }
  public updateTest(id,name,stock){
    this.testsK.forEach(function(testK){
      if(testK.id === id) {
        testK.name = name ;
        testK.stock = stock;

      }
    })
  }


}


