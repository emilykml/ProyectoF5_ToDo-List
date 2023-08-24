const idTemp = localStorage.getItem('id')
const title = document.getElementById("title")
const inputEdit = document.getElementById("inputEdit")
const newDescription = document.getElementById("inputNewDescription")

title.textContent = idTemp

document.addEventListener("submit", saveBtn)

async function saveBtn(e){
    e.preventDefault()
    const newTask = inputEdit.value
    const descriptionEdited = newDescription.value

    await fetch(`http://localhost:3000/tasks/${idTemp}`, {
        method: "PUT",
        headers:{
            "Content-type": "application/json; charset=utf-8"
        },
        body:JSON.stringify(
            {
                task: newTask,
                description: descriptionEdited,
                completed: false,
            }
        )
    })

    location.href = "index.html"
} 