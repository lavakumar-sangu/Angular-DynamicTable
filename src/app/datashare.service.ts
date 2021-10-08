import { Injectable } from '@angular/core';
export interface user {
  name: string;
  passwords: string;
}

@Injectable({
  providedIn: 'root'
})
export class datashareService {

  data: user[] = [];
  constructor() {}
  setArray(loginData: user) {
    this.data=[]
    let storedData = JSON.parse(localStorage.getItem('dataSource.data') || '[]');
    if(storedData.length>0){
      for (let dataSaved of storedData){
        this.data.push(dataSaved)
      } 
    }
    this.data.push(loginData)
    localStorage.setItem('dataSource.data', JSON.stringify(this.data));
  }
  
  getArray() {
    return this.data;
  }
}
