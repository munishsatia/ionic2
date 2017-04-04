import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TodoListPage } from '../pages/todo/todolistpage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {TodosService} from "../pages/todo/todosservice";

//import { TodoListPage } from '../pages/todo/todolistcomponent';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2
    ,TodoListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
   ,TodoListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SQLite,TodosService]
})
export class AppModule {}
