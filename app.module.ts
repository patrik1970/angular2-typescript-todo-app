import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'; 

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  	{ path: ':status', component: TodoComponent },
  	{ path: '**', redirectTo: '/all' }
];


@NgModule({
	declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
