//tüm elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){//tüm event listenerler

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);



}
function clearAllTodos(e){

    if(confirm("Tümünü Silmek İstediğinizden Emin Misiniz ?")){
            //Arayüzden todoları kaldırma
            //todoList.innerHTML= "";//yavaş yöntem
            while(todoList.firstElementChild != null){
                todoList.removeChild(todoList.firstElementChild);

            }
            localStorage.removeItem("todos");


            

    }
    






}
function filterTodos(e){

    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1)
        {
            //bulamadı
            listItem.setAttribute("style","display : none !important");

        }
        else
        {
            listItem.setAttribute("style" , "display : block");
        }
    });


}
function deleteTodo(e){
    
    if(e.target.className=="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarıyla Silindi.");

    }

}
function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo===deletetodo){
            todos.splice(index,1);//arrayden değer silme.

        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));

    
}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);

    })
}
function addTodo(e){

    const newTodo=todoInput.value.trim();
    const varmi=getTodosFromStorage();
    let mevcut=false;
    varmi.forEach(function(todo){
        if (todo === newTodo){
            return mevcut=true;
        }
    });


    if(newTodo === ""){
       
        showAlert("danger","Lütfen Bir Todo Giriniz...");
    }else if(mevcut){
        showAlert("danger","Zaten Mevcut");

    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo Başarıyla Eklendi");
    }




    e.preventDefault();

}
function getTodosFromStorage(){//storageden todoları alma
    
    let todos;

    if(localStorage.getItem("todos") == null){
        todos= [] ;
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;


}

function addTodoToStorage(newTodo){
let todos=getTodosFromStorage();
    
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));



}


function showAlert(type,message){

    const alert=document.createElement("div");

    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    
    firstCardBody.appendChild(alert);
   //set time out metodu

   setTimeout(function(){
alert.remove();
   },1500);




}
function addTodoToUI(newTodo){//string değerini list ıtem olarak uı ya ekleyecek

/*<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
*/
//LİNK OLUŞTURMA
const listItem=document.createElement("li");
const link =document.createElement("a");
link. href="#";
link.className="delete-item";
link.innerHTML=`<i class = "fa fa-remove"></i>`
listItem.className="list-group-item d-flex justify-content-between"
//text note ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
//totoliste listItem ekleme
todoList.appendChild(listItem);
todoInput.value= "";

}