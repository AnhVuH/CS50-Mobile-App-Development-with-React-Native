const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

list.className =classNames.TODO_ITEM

function newTodo() {
  let newToDo = prompt("New TODO: ")
  if (newToDo != "" && newToDo != null && newToDo.trim()!=""){
    let node = document.createElement("LI")

    let textToDo = document.createTextNode(newToDo)
    node.appendChild(textToDo)
    node.className = classNames.TODO_TEXT


    list.appendChild(node)

    itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1
    uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML)+1

    node.onclick = function(){
      node.style.textDecorationLine = "line-through"
      if(uncheckedCountSpan.innerHTML>0){
        uncheckedCountSpan.innerHTML = parseInt(uncheckedCountSpan.innerHTML) - 1
      }

    }

  }
}
