/// <reference path='globals.d.ts'/>
/// <reference path='firebase/firebase.d.ts'/>

import {Component, Template, bootstrap, Foreach} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';

function addAnnotation(c: any, annotation: any): any {
    (c.annotations || (c.annotations = [])).push(annotation);
    return c;
}

function TSComponent(arg: any, @paramtypes parameters?: any[]) {
    return (c) => {
        c.parameters = parameters.map(p => [p]);
        addAnnotation(c, new Component(arg))
        return
    }
}

function TSTemplate(arg: any) {
    return c => addAnnotation(c, new Template(arg));
}

@TSComponent({
  selector: 'todo-app',
  componentServices: [
    AngularFire,
    bind(Firebase).toValue(new Firebase('https://webapi.firebaseio-demo.com/test'))
]})
@TSTemplate({
  url: '/todo.html',
  directives: [Foreach]
})
class TodoApp {
  todoService: FirebaseArray;
  todoEdit: any;

  constructor(sync: AngularFire) {
    this.todoService = sync.asArray();
    this.todoEdit = null;
  }
  enterTodo($event, newTodo) {
    if($event.which === 13) { // ENTER_KEY
      this.addTodo(newTodo.value);
      newTodo.value = '';
    }
  }
  editTodo($event, todo) {
    this.todoEdit = todo;
  }
  doneEditing($event, todo) {
    var which = $event.which;
    var target = $event.target;
    if(which === 13) {
      todo.title = target.value;
      this.todoService.save(todo);
      this.todoEdit = null;
    } else if (which === 27) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }
  addTodo(newTitle) {
    this.todoService.add({
      title: newTitle,
      completed: false
    });
  }
  completeMe(todo) {
    todo.completed = !todo.completed;
    this.todoService.save(todo);
  }
  deleteMe(todo) {
    this.todoService.remove(todo);
  }
  toggleAll($event) {
    var isComplete = $event.target.checked;
    this.todoService.list.forEach(function(todo) {
      todo.completed = isComplete;
      this.todoService.save(todo);
    }.bind(this));
  }
  clearCompleted() {
    var toClear = {};
    this.todoService.list.forEach((todo) => {
      if(todo.completed) {
        toClear[todo._key] = null;
      }
    });
    this.todoService.bulkUpdate(toClear);
  }

}

export function main() {
  bootstrap(TodoApp);
}
