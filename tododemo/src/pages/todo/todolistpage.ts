
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {todoItem} from './todoitem';
import {  SQLite,SQLiteObject } from '@ionic-native/sqlite';
//import { SQLite } from '@ionic-native';
import {TodosService} from './todosservice';

@Component({
    selector:'todo-list',
    templateUrl : 'todolist.html'
})
export class TodoListPage {
    todolist : todoItem[] =[];
    
    constructor(public navCtrl:NavController,public platform: Platform,public todoservice:TodosService){
            var item = new  todoItem();
            item.title="Task 1";
            this.todolist.push(item);
            //this.initializeApp();
            this.loadfronPouch();
           
    }
    loadfronPouch(){
        this.todoservice.gettodos().then((data)=>{
            console.log(data);
            this.todolist = data;
        });
    }
    loadfronPouchnew(){
        this.todoservice.gettodosnew()
            .subscribe(
                data => {
                    this.todolist =data;
                }
            )
    }
    
    
    save(tasktitle:string){
        let item = new todoItem();
        item.title=tasktitle;
       this.todoservice.createtodos(item);
    }
}