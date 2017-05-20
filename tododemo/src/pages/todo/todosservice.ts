import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import PouchDB from 'pouchdb';
import { todoItem } from './todoItem';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Todos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodosService {
  data: todoItem[];
  db: any;
  remote: any;

  constructor(public http: Http) {
    console.log('Hello Todos Provider');
    this.db = new PouchDB('todos');
    this.remote = "http://localhost:5984/todos";

    let options = {
      live: true,
      retry: true,
      continuos: true
    };

    this.db.sync(this.remote, options);
  }

  gettodosnew():Observable<todoItem[]>{
    this.data = [];
      return new Observable(observer=>{
         this.db.allDocs({ include_docs: true })
         .then((result)=>{
            
            let docs = result.rows.map((row) => {
            this.data.push(row.doc);
          });
          observer.next(this.data);
         });
      });
  }

  gettodos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db.allDocs({ include_docs: true })
        .then((result) => {
          this.data = [];
          let docs = result.rows.map((row) => {
            this.data.push(row.doc);
          });

          resolve(this.data);

          this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
            this.handleChange();
          });


        }).catch((error) => {
          console.log(error);
        });
    });
  }
  
  handleChange(){
    
  }
  createtodos(todoItem:todoItem) {
   // console.log("adding" + todoItem);
    todoItem.status = 0;
    this.db.post(todoItem);
  }

}
