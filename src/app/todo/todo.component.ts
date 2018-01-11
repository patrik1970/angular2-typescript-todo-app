import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {
	private todos;
	private activeTasks;
	private newTodo = '';
	private path;

  private lastId = 0;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  getTodos(query = ''){
  	return this.todoService.get(query).then(todos => {
  		this.todos = todos;
     
      if(query === 'all'){        
        this.activeTasks = this.todos.length;
      } else if(query === 'active'){
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      } else if(query === 'completed'){
        this.activeTasks = this.todos.filter(todo => todo.isDone).length;
      }
  	});
  }

  addTodo(){
    var nextId = ++this.lastId;

    if(this.newTodo === ''){ return false }
    
  	this.todoService.add({ title: this.newTodo, isDone: false, id: nextId}).then(() => {
      return this.getTodos();
  	}).then(() => {
      this.activeTasks = this.todos.length;
    	this.newTodo = '';

  	});
	}

	updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.todoService.put(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

	destroyTodo(todo){
    this.todoService.delete(todo.id).then(() => {
      this.activeTasks = this.todos.length;
      return this.getTodos(this.path);
    });
  }  

  toogleComplete() {
    this.getTodos(this.path);
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      return this.getTodos(this.path);
    });
  }
}
