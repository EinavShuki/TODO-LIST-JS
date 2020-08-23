//selectors
const todoInput = document.querySelector(".todo-input"); //in charge of user input
const todoButton = document.querySelector(".todo-button"); //in charge of plus btn
const todoList = document.querySelector(".todo-list"); //in charge of todo list
const fillterButton = document.querySelector(".filter-todo");

//eventListeners
document.addEventListener("DOMContentLoaded", getTodos); //every time we refresh the page we will get to this function
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
fillterButton.addEventListener("click", filterTodo);

//function
//this function creates a ney todo which contains the user's input
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //creating todo div
  const todoDiv = document.createElement("div");
  //adding class
  todoDiv.classList.add("todo");
  //creating a new li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //adding cladd for the todos for css
  newTodo.classList.add("todo-item");
  //newTodo is a child of the div
  todoDiv.appendChild(newTodo);
  //Send the todo to the local storage
  saveTodo(todoInput.value);
  //check mark button
  const completedBtn = document.createElement("button");
  //adding it an icon instead of text using innerHTML
  completedBtn.innerHTML = '<i class="far fa-check-square"></i>';
  completedBtn.classList.add("complete-btn");
  //completedBtn is a child of the div
  todoDiv.appendChild(completedBtn);
  //a delete button
  const deleteBtn = document.createElement("button");
  //adding it an icon instead of text using innerHTML
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteBtn.classList.add("delete-btn");
  //completedBtn is a child of the div
  todoDiv.appendChild(deleteBtn);
  //Appand to the ul of the list
  todoList.appendChild(todoDiv);
  //clear todo input
  todoInput.value = "";
}

// This function do fit operations
// When the delete or check buttons are pressed
function deletecheck(event) {
  const item = event.target; //the botton i click on
  //delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //adding animation
    todo.classList.add("byebye");
    //remove from local storage
    removeFromLocalTodos(todo);
    todo.addEventListener(`transitionend`, function () {
      todo.remove();
    }); //transitionend is parallel to animation end in css
    //meaning, after the animation end, then i'll remove the todokist for good
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(event) {
  const todoItems = todoList.childNodes;
  todoItems.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  }); //since we using noselist we able to do foreach loop
}

function checkIfTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //converts the string from the web to object
  }
  console.log(todos);
  return todos;
}

//local storage
function saveTodo(todo) {
  let todos = checkIfTodo();
  // console.log(todos);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); //converts the object to a stringb in order to storage it in web
}
//incase of refreshing the page we can still see the toso list
function getTodos() {
  let todos = checkIfTodo();

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    //adding class
    todoDiv.classList.add("todo");
    //creating a new li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    //adding cladd for the todos for css
    newTodo.classList.add("todo-item");
    //newTodo is a child of the div
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedBtn = document.createElement("button");
    //adding it an icon instead of text using innerHTML
    completedBtn.innerHTML = '<i class="far fa-check-square"></i>';
    completedBtn.classList.add("complete-btn");
    //completedBtn is a child of the div
    todoDiv.appendChild(completedBtn);
    //a delete button
    const deleteBtn = document.createElement("button");
    //adding it an icon instead of text using innerHTML
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteBtn.classList.add("delete-btn");
    //completedBtn is a child of the div
    todoDiv.appendChild(deleteBtn);
    //Appand to the ul of the list
    todoList.appendChild(todoDiv);
  });
}

function removeFromLocalTodos(todo) {
  //checking if there is something
  let todos = checkIfTodo();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); //deleting 1 element in the place i mentioned
  localStorage.setItem("todos", JSON.stringify(todos)); //localStorage.setItem(<itemName>,<itemValue>),
}
