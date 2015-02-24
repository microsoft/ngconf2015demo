/// <reference path='globals.d.ts'/>
/// <reference path='firebase/firebase.d.ts'/>
define(["require", "exports", 'angular2/angular2', 'angular2/di', 'firebase/AngularFire'], function (require, exports, _angular2, _di, _AngularFire) {
    function addAnnotation(c, annotation) {
        (c.annotations || (c.annotations = [])).push(annotation);
        return c;
    }
    function TSComponent(arg, parameters) {
        return function (c) {
            c.parameters = parameters.map(function (p) { return [p]; });
            addAnnotation(c, new _angular2.Component(arg));
            return;
        };
    }
    function TSTemplate(arg) {
        return function (c) { return addAnnotation(c, new _angular2.Template(arg)); };
    }
    var TodoApp = (function () {
        function TodoApp(sync) {
            this.todoService = sync.asArray();
            this.todoEdit = null;
        }
        TodoApp.prototype.enterTodo = function ($event, newTodo) {
            if ($event.which === 13) {
                this.addTodo(newTodo.value);
                newTodo.value = '';
            }
        };
        TodoApp.prototype.editTodo = function ($event, todo) {
            this.todoEdit = todo;
        };
        TodoApp.prototype.doneEditing = function ($event, todo) {
            var which = $event.which;
            var target = $event.target;
            if (which === 13) {
                todo.title = target.value;
                this.todoService.save(todo);
                this.todoEdit = null;
            }
            else if (which === 27) {
                this.todoEdit = null;
                target.value = todo.title;
            }
        };
        TodoApp.prototype.addTodo = function (newTitle) {
            this.todoService.add({
                title: newTitle,
                completed: false
            });
        };
        TodoApp.prototype.completeMe = function (todo) {
            todo.completed = !todo.completed;
            this.todoService.save(todo);
        };
        TodoApp.prototype.deleteMe = function (todo) {
            this.todoService.remove(todo);
        };
        TodoApp.prototype.toggleAll = function ($event) {
            var isComplete = $event.target.checked;
            this.todoService.list.forEach(function (todo) {
                todo.completed = isComplete;
                this.todoService.save(todo);
            }.bind(this));
        };
        TodoApp.prototype.clearCompleted = function () {
            var toClear = {};
            this.todoService.list.forEach(function (todo) {
                if (todo.completed) {
                    toClear[todo._key] = null;
                }
            });
            this.todoService.bulkUpdate(toClear);
        };
        TodoApp = TSComponent({
            selector: 'todo-app',
            componentServices: [
                _AngularFire.AngularFire,
                _di.bind(Firebase).toValue(new Firebase('https://webapi.firebaseio-demo.com/test'))
            ]
        }, [_AngularFire.AngularFire])(
            TodoApp = TSTemplate({
                url: '/todo.html',
                directives: [_angular2.Foreach]
            })(TodoApp) || TodoApp) || TodoApp;
        return TodoApp;
    })();
    function main() {
        _angular2.bootstrap(TodoApp);
    }
    exports.main = main;
});
