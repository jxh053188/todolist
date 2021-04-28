$(document).ready(function(){
   $.getJSON("api/todos")
   .then(addTodos);

   $('#todoInput').on("keypress", function(event) {
       if(event.which == 13) {
        createTodo();
       }
   })

   $('.list').on("click", 'li' , function(){
    updateTodo($(this));
})

   $('.list').on("click", 'span' , function(e){
    e.stopPropagation();   
    deleteTodo($(this).parent());
   })

});


function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    })
        
}

function addTodo(todo){
    let newTodo = $('<li class="task">' + todo.name + '<span>x</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
        if(todo.completed){
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
    
}

function createTodo(){
    let userInput = $('#todoInput').val();
    $.post('api/todos', {name: userInput})
    .then(function(newTodo){
     addTodo(newTodo);
     $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err)
    })
}

function deleteTodo(todo){
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
}

function updateTodo(todo) {
    let updateUrl = '/api/todos/' + todo.data('id');
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}