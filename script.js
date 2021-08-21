var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function (data) {



    // create li tag wth text node

    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)


    // create delt btn 

    var delBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE")
    delBtn.setAttribute("class", "btn")
    delBtn.setAttribute('id', data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    // edit btn

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT")
    editBtn.appendChild(editText)
    editBtn.setAttribute('id', data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.setAttribute('class', 'editbtn')




    li.appendChild(delBtn)
    li.appendChild(editBtn)


    list.appendChild(li)




})



function addTodo() {
    var todo_item = document.getElementById("todo-item");
    var key = firebase.database().ref('todos').push().key;

    var todo = {
        value: todo_item.value,
        key: key
    }

    firebase.database().ref('todos').child(key).set(todo)



    todo_item.value = ""




}
function deleteItem(e) {
    e.parentNode.remove()
    firebase.database().ref('todos').child(e.id).remove()

}


function editItem(e) {
    var val = prompt("Edit your task", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;

}



function deleteAll() {
    list.innerHTML = ""
    firebase.database().ref('todos').remove()
    
}