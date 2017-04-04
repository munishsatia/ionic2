import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import PouchDB from 'pouchdb';
import { todoItem } from './todoItem';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {  SQLite,SQLiteObject } from '@ionic-native/sqlite';
//import { SQLite } from '@ionic-native';
import {TodosService} from './todosservice';

@Injectable()
export class sqlliteService {
    initializeApp() {
        let db = new SQLite();
        db.create({name:'tododb.db',location:'default'})
          .then((db:SQLiteObject)=>{
                     db.executeSql('create table todoItems(title varchar(50))',{})
                     .then(()=>console.log("Table Created"))
                     .catch(e => console.log(e));
        });
       // db.openDatabase()
    }
      initializeAppback() {
        //this.platform.ready().then(() => {
            // this.sqlite.create({name:'tododb.db',location:'default'})
            //             .then((db:SQLiteObject)=>{
            //                  db.executeSql('create table todoItems(title varchar(50))',{})
            //                     .then(()=>console.log("Table Created"))
            //                     .catch(e => console.log(e));

                            
            //             })
            //             .catch(e => console.log(e));
       // });
    }

    save(){
                // this.sqlite.create({name:'tododb.db',location:'default'})
                //         .then((db:SQLiteObject)=>{
                //              db.executeSql('insert into todoItems (title) VALUES (?)',["title2"])
                //                 .then(()=>console.log("Row Added"))
                //                 .catch(e => console.log(e));

                //         })
                //         .catch(e => console.log(e));
    }

    load(){
                // this.sqlite.create({name:'tododb.db',location:'default'})
                //         .then((db:SQLiteObject)=>{
                //              db.executeSql('select * todoItems',{})
                //                 .then((res)=>res.rows.items(0).title)
                //                 .catch(e => console.log(e));
                //         })
                //         .catch(e => console.log(e));
    }
}