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

let idItem = 0

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
    newTodo.className = classNames.TODO_ITEM
    newTodo.id = idItem++

    todoCheckBox.onclick = ()=> checkFunction(newTodo.id)
    delButton.onclick = () => delFunction(newTodo.id)

    list.appendChild(newTodo)
    itemCount +=1
    itemCountSpan.innerHTML = itemCount
    uncheckedCount +=1
    uncheckedCountSpan.innerHTML = uncheckedCount
  }
}


function checkFunction(idItem){
  let checked = document.getElementById(idItem).getElementsByClassName(classNames.TODO_CHECKBOX)[0].checked
  // console.log(checked)
  if(checked === false){
    uncheckedCount +=1
  }
  else{
      uncheckedCount -=1
  }
  uncheckedCountSpan.innerHTML = uncheckedCount
}

function delFunction(idItem){
  let delItem = document.getElementById(idItem)
  let checked = delItem.getElementsByClassName(classNames.TODO_CHECKBOX)[0].checked
  itemCount -=1
  itemCountSpan.innerHTML = itemCount

  if(uncheckedCount >0 && !checked){
    uncheckedCount -=1
  }
  uncheckedCountSpan.innerHTML = uncheckedCount
  list.removeChild(delItem)
}
