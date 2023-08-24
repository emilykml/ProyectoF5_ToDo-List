const taskInput = document.querySelector(".add_newtask")
const descriptionInput = document.querySelector(".add_description")
const addButton = document.querySelector('#enter-button');
const taskList = document.getElementById('list');
const delteButton = document.getElementById('.fa-solid fa-trash-arrow-up');
const checkButton = document.getElementById('.fa-regular fa-circle');


//CREATE--> METODO POST
async function createtask(){
    const task = taskInput.value;
    const description = descriptionInput.value; 
    await fetch ("http://localhost:3000/tasks", {
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            task:task,
            description:description,
            complete:false,
        })
    })
}

document.addEventListener("DOMContentLoaded", showTask)
async function showTask(){
let result= await fetch ("http://localhost:3000/tasks")
let data= await result.json()
data.forEach(task => {
    const lista= document.createElement("li")
    let checkedAttribute = task.completed ? "checked" : ""; 
    lista.innerHTML=`
    <input type="checkbox" onclick="completeTask(${task.id}, this)" ${checkedAttribute} id="${task.id}"> 
    ${task.task}
    <span>${task.description}</span>
    <i class="fa-solid fa-trash-arrow-up" onClick="delete_task(${task.id})"></i>
    <button class="editBtn" onClick="editBtn(${task.id})">TASK EDIT</button>
    `
    taskList.appendChild(lista) 
});

}

// //READ--> METODO GET

// async function getTask(){
//     let result= await fetch("http://localhost:3000/tasks");
//     let data= await result.json()
//     console.log(data)
// }
// getTask()

//UPDATE--> METODO PATCH

async function updatetask(){
    
}

//DELETE--> METODO DELETE

async function delete_task(id){
    await fetch ( `http://localhost:3000/tasks/${id}`,{
        method:"DELETE"
    }
    
    )}


async function completeTask(id, checkbox) {
    let completed = checkbox.checked;
    let result = await fetch(`http://localhost:3000/tasks/${id}`);
    let task = await result.json();

    task.completed = completed;

    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
} 

//EDIT
async function editBtn(id){
    localStorage.setItem('id', id)
    window.location.href = "index2.html"
} 






