const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const checkedListDiv = document.createElement('DIV')
const checkedList = document.createElement("UL")

list.className =classNames.TODO_ITEM

function newTodo() {
  let newToDo = prompt("New TODO: ")
  if (newToDo != "" && newToDo != null && newToDo.trim()!=""){
    let todo = document.createElement("LI")
    let textToDo = document.createTextNode(newToDo)
    todo.appendChild(textToDo)
    todo.className = classNames.TODO_TEXT

    let del = document.createElement("button")
    let textDel = document.createTextNode("Delete")
    del.appendChild(textDel)

    todo.style.display = "inline-block"
    del.style.display = "inline-block"

    let todoLine =document.createElement("div")
    todoLine.appendChild(todo)
    todoLine.appendChild(del)
    list.appendChild(todoLine)

    itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML)+1

    // sai vì onclick là DOM property trong javascript không phải attribute onclick trong file innerHTML
    // nếu không định nghĩa là function mà gán như dòng dưới thì property sẽ = kết quả gọi hàm checkFunction(todo)-> vừa tạo mới vừa check 
    // todo.onclick = checkFunction(todo)
    todo.onclick =function(){
      checkFunction(todo)
    }
    del.onclick = function(){
      delFunction(todo, todoLine)
    }
  }
}

function checkFunction(todo){
  todo.style.textDecoration = "line-through"
  if(uncheckedCountSpan.innerHTML>0){
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML)-1
  }
  if (document.getElementsByClassName(classNames.TODO_CHECKBOX).length ==0){
    let text = document.createTextNode("checked")
    let checked =document.createElement("h3")

    checkedListDiv.appendChild(checked.appendChild(text))
    checkedListDiv.appendChild(checkedList)

    document.getElementsByClassName("container center")[0].appendChild(checkedListDiv)
  }
  for(let item of document.getElementsByClassName(classNames.TODO_CHECKBOX)){
    if (todo.innerHTML === item.innerHTML){
      return
    }
  }
  let checkedItem= document.createElement("LI")
  let textchecked = document.createTextNode(todo.innerHTML)
  checkedItem.appendChild(textchecked)
  checkedItem.className = classNames.TODO_CHECKBOX
  checkedList.appendChild(checkedItem)
}

function delFunction(todo, todoLine){
  todo.className = classNames.TODO_DELETE
  todoLine.innerHTML = null

  let checkedBoxes = document.getElementsByClassName(classNames.TODO_CHECKBOX)
  let checkedBoxesArr = Array(checkedBoxes)

  itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) - 1

  if (!checkedBoxesArr.includes(todo.innerHTML) && uncheckedCountSpan.innerHTML > 0){
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) - 1
  }
}
