import { createApp, nanoid } from "../../index.js";

let app = createApp();
app.root = document;

let todos = [];
let filter = "all"; // active, completed
let Action = function(){}

Action.prototype = {
    addTodo: function(name) {
        let todoItem = this.createTodo(name);
        todos.push(todoItem);
        return todoItem;
    },
    
    toggleAll: function(toActive) {
        todos = todos.map(todo => {
           todo.active = toActive;
           return todo;
        });
    },

    deleteTodo: function(id) {
        todos = todos.filter(todo => todo.id !== id);
        return id;
    },
  
    setTodoStatus: function(id, active) {
        let updatedTodo;
        todos = todos.map(todo => {
          if (id === todo.id) {
            todo.active = active;
            updatedTodo = todo;
            return todo;
          }
          return todo;
        });
        return updatedTodo;
    },
    
    renameTodo: function(id, name) {
        let updatedTodo;
        todos = todos.map(todo => {
          if (id === todo.id) {
            todo.name = name;
            updatedTodo = todo;
            return todo;
          }
          return todo;
        });
        return updatedTodo;
    },
    
    clearCompleted: function() {
        let removedTodos = todos.filter(todo => !todo.active);
        todos = todos.filter(todo => todo.active);
        return removedTodos;
    },
    
    applyFilter: function(filterType) {
        filter = filterType;
        return filter;
    },

    createTodo: function(name) {
        return {
            id: nanoid(),
            name, 
            active: true,
        };
    },
    
    inform: function() {
        return ({
            countAllTodos: todos.length,
            countActiveTodos: todos.filter(todo => todo.active).length,
        });
    }
};

let action = new Action();

let TodoNew = function(){};
TodoNew.prototype = {
    sel: () => app.root.querySelector('input.new-todo'),
    init: function() {
        let elem = this.sel();
        elem.addEventListener("keypress", e => {
            if (e.key === 'Enter') {
              let name = elem.value.trim();
              if (0 < name.length) {
                  app.do(action.addTodo, name).trigger(action.inform);
                  elem.value = "";
              }
            }
        });
    },
};

let ToggleAll = function(){};
ToggleAll.prototype = {
    sel: () => app.root.querySelector('input#toggle-all'),
    init: function() {
        let elem = this.sel();
        app.on(action.inform, inform => {
            elem.checked = inform.countActiveTodos === 0;
            elem.nextElementSibling.style.visibility = inform.countAllTodos === 0 ? "hidden" : "visible";
        });
        elem.addEventListener("change", e => {
            app.do(action.toggleAll, !elem.checked).trigger(action.inform);
        });
    },
   
};

let TodoList = function(){};
TodoList.prototype = {
    sel: () => app.root.querySelector('ul.todo-list'),
    init: function() {
        app.on(action.addTodo, addedTodo => this.sel().insertAdjacentElement("beforeend", app.view.TodoItem.buildView(addedTodo)));
        app.on(action.deleteTodo, todoId => app.view.TodoItem.sel(todoId).remove());
        app.on(action.clearCompleted, removedTodos => removedTodos.forEach(todo => app.view.TodoItem.sel(todo.id).remove()));
        app.on(action.applyFilter, filterType => {
            let todoElements = this.sel().querySelectorAll('li');
            let lookup = new Map(todos.map(todo => [todo.id, todo]));
            todoElements.forEach(todoElem => app.view.TodoItem.setDisplay(todoElem, lookup.get(todoElem.dataset.todoId), filterType));
        });
        app.on(action.toggleAll, () => {
            let todoElements = this.sel().querySelectorAll('li');
            let lookupTodo = new Map(todos.map(todo => [todo.id, todo]));
            todoElements.forEach(todoElem => app.view.TodoItem.setStatus(todoElem, lookupTodo.get(todoElem.dataset.todoId)));
        });
    }
};

let TodoItem = function(){};
TodoItem.prototype = {
    sel: (todoId) => app.root.querySelector('li[data-todo-id="'+todoId+'"]'),
    init: function() {
        app.on(action.setTodoStatus, todo => {
            let todoElem = this.sel(todo.id);
            todoElem.className = todo.active ? "view" : "completed";
            this.setDisplay(todoElem, todo, filter);
        });
    },
  
    buildView: function(todo) {
        let template = app.root.querySelector('template#todo-item');
        let clone = document.importNode(template.content, true);
        let todoElem = clone.children[0];
        todoElem.dataset.todoId = todo.id;
        this.setStatus(todoElem, todo);
        this.setDisplay(todoElem, todo, filter);
        let label = todoElem.querySelector('label');
        label.textContent = todo.name;
        label.contentEditable = "true";
        label.addEventListener("keypress", e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                let newName = label.textContent.trim();
                if (0 < newName.length) {
                    app.do(action.renameTodo, todo.id, newName);
                    label.textContent = newName;
                    document.activeElement.blur();
                }
            }
        });
        let btnDelete = todoElem.querySelector('button[class="destroy"]');
        btnDelete.addEventListener("click", e => app.do(action.deleteTodo, todo.id).trigger(action.inform));
        return todoElem;
    },
    
    setStatus: function(todoElem, todo){
        todoElem.className = todo.active ? "view" : "completed";
        let inputCompleted = todoElem.querySelector('input.toggle');
        inputCompleted.checked = !todo.active;
        inputCompleted.addEventListener("change", e => app.do(action.setTodoStatus, todo.id, !todo.active).trigger(action.inform));
    },
    
    setDisplay: function(todoElem, todo, filterType){
        if ("all" === filterType) {
            todoElem.style.display = "block";
        } else if ("active" === filterType) {
            todoElem.style.display = todo.active ? "block" : "none";
        } else if ("completed" === filterType) {
            todoElem.style.display = todo.active ? "none" : "block";
        }
    }
};

let TodoFooter = function(){};
TodoFooter.prototype = {
    sel: () => app.root.querySelector('footer'),
    init: function() {
        let footerElem = this.sel();
        let itemsLeftElem = footerElem.querySelector('span.todo-count');
        let itemsLeftCountElem = itemsLeftElem.querySelector('strong');
        let itemsLeftTextElem = itemsLeftElem.querySelector('span');
        let btnClearCompleted = footerElem.querySelector('button.clear-completed');
        let aAll = footerElem.querySelector('li > a[data-todo-filter="all"]');
        let aActive = footerElem.querySelector('li > a[data-todo-filter="active"]');
        let aCompleted = footerElem.querySelector('li > a[data-todo-filter="completed"]');
        
        app.on(action.inform, inform => {
            footerElem.style.display = 0 < inform.countAllTodos ? "block" : "none";
            itemsLeftCountElem.textContent = inform.countActiveTodos;
            itemsLeftTextElem.textContent = inform.countActiveTodos === 1 ? " item left" : " items left";
            btnClearCompleted.style.visibility = inform.countActiveTodos < inform.countAllTodos ? "visible" : "hidden";
        });
        
        let unselectFilter = () => {
            aAll.classList.remove("selected"); 
            aActive.classList.remove("selected"); 
            aCompleted.classList.remove("selected");
        };
        
        let filterMap = new Map();
        filterMap.set("all", aAll);
        filterMap.set("active", aActive);
        filterMap.set("completed", aCompleted);
        filterMap.forEach((elem, filterType) => elem.addEventListener("click", e => {
            app.do(action.applyFilter, filterType); 
            unselectFilter(); 
            elem.classList.add("selected");
        }));
        
        btnClearCompleted.addEventListener("click", e => app.do(action.clearCompleted).trigger(action.inform));
    },
};

app.action = action;

app.addView(TodoNew);
app.addView(ToggleAll);
app.addView(TodoList);
app.addView(TodoItem);
app.addView(TodoFooter);
