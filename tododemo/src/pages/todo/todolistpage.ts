
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {todoItem} from './todoitem';

@Component({
    selector:'todo-list',
    templateUrl : 'todolist.html'
})
export class TodoListPage {
    todolist : todoItem[] =[];
    
    constructor(public navCtrl:NavController){
            var item = new  todoItem();
            item.title="Task 1";
            this.todolist.push(item);
    }
}