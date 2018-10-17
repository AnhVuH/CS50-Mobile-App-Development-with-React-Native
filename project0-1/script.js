const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let itemCount = parseInt(itemCountSpan.innerHTML)
let uncheckedCount = parseInt(uncheckedCountSpan.innerHTML)
// let id = 0


function newTodo() {
  let text = prompt("New TODO: ")
  if(text !="" && text !=null && text.trim()!=""){

    let todoText = document.createElement("p")
    todoText.innerHTML = text
    todoText.className = classNames.TODO_TEXT
    todoText.style.display = "inline-block"

    let todoCheckBox = document.createElement("input")
    todoCheckBox.type = "checkbox"
    todoCheckBox.checked = false
    todoCheckBox.className = classNames.TODO_CHECKBOX
    todoCheckBox.style.display = "inline-block"


    let delButton = document.createElement("button")
    delButton.className = classNames.TODO_DELETE
    delButton.style.display = "inline-block"
    delButton.innerHTML ="Delete"


    let newTodo = document.createElement("li")
    newTodo.appendChild(todoText)
    newTodo.appendChild(todoCheckBox)
    newTodo.appendChild(delButton)
    // newTodo.id = id++


    todoCheckBox.onclick = ()=> checkFunction(todoCheckBox.checked)
    // delButton.onclick = () => delFunction(newTodo.id)
    delButton.onclick = () => delFunction(newTodo)

    list.appendChild(newTodo)
    itemCount +=1
    itemCountSpan.innerHTML = itemCount
    uncheckedCount +=1
    uncheckedCountSpan.innerHTML = uncheckedCount
  }
}

function checkFunction(checked){
  if(checked === false){
    uncheckedCount +=1
  }
  else{
      uncheckedCount -=1
  }
  uncheckedCountSpan.innerHTML = uncheckedCount
}

function delFunction(Todo){
  // let delTodo = getElementById(id)
  // delTodo = ""
  Todo.innerHTML = ""
  itemCount -=1
  itemCountSpan.innerHTML = itemCount
  if(uncheckedCount >0){
    uncheckedCount -=1
  }

  uncheckedCountSpan.innerHTML = uncheckedCount
}
