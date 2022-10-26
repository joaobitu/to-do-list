import './style.css'
import { displayController } from './display';
import { toDoRepository } from './toDoRepository';
import {titleInput, descriptionInput, projectInput, dueDateInput,
    priorityInput, form, toDoContainer, projectList, projectClearButton} 
    from './domElements'

// a class to make our ToDos and give them some functionality
class ToDo {

    constructor(title, dueDate, priority, description, project) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.project = project;
    }
    
    edit(project, index) { // makes the content of the to-do editable
       const nodeList =  document.getElementsByClassName(`${project}${index}`)
       for (let i = 0; i < nodeList.length; i++) {
            nodeList.item(i).contentEditable = "True";
       }
       document.querySelector(`.edit-button-${project}[value="${index}"]`).textContent = "Confirm Edit"
    }
    confirmEdit(project, index) { // checks all the values that the user edited and input them as new values on the catalog.
        const nodeList =  document.getElementsByClassName(`${project}${index}`)
        for (let i = 0; i < nodeList.length; i++) {
             nodeList.item(i).contentEditable = "False";
             toDoRepository.catalog[project][index][i] = nodeList.item(i).textContent
        }
        toDoRepository.catalog[project][index][4] = project
        document.querySelector(`.edit-button-${project}[value="${index}"]`).textContent = "Edit"

    }
}

//lets add some listeners
window.addEventListener('click', (e) => {
        const target = e.target  

        //delete task button
        if (target.className.slice(0, 13) == "delete-button") {
            toDoRepository.removeToDo(target.className.slice(14) , target.value);
            displayController.renderToDo(target.className.slice(14));
            console.log("delete-button event being called")
        }
        //delete empty projects button
        if (target == projectClearButton ) {
            toDoRepository.clearProject()
            displayController.renderProject()
            displayController.clearToDoDisplay()
        }

        //select the projects in the menu bar and display those to-dos
        if (target.id in toDoRepository.catalog) {
            displayController.renderToDo(target.id)
            projectInput.value = `${target.id}`
            console.log("project-display event being called")
        }

        //edit button logic
        if (target.className.slice(0,11) == "edit-button" && target.textContent == "Edit"){
           initialNote.edit(target.className.slice(12), target.value)
           console.log(toDoRepository.catalog)
           console.log("edit event being called")
        } else if (target.textContent == "Confirm Edit"){
            initialNote.confirmEdit(target.className.slice(12), target.value)
            console.log(toDoRepository.catalog)
            console.log("confirm edit event being called")

        }
});


//preventing the default behavior of the submit event
form.addEventListener('submit', (e)=> {
    const addedToDo = new ToDo(
        titleInput.value, 
        dueDateInput.value,
        priorityInput.options[priorityInput.selectedIndex].text,
        descriptionInput.value, 
        projectInput.value
    );

    toDoRepository.addToDo(addedToDo , addedToDo.project);
    displayController.renderToDo(addedToDo.project)
    displayController.clearForm();
    displayController.renderProject();

    e.preventDefault()
  });



//initial default project:

if (localStorage.getItem('catalog') == null || localStorage.getItem('catalog').length == 2){
    const initialNote = new ToDo('Title Area', '25-10-2022', 'High', 'Description Area' , 'Default');
    toDoRepository.addToDo(initialNote, initialNote.project);
    projectInput.value = `${initialNote.project}`;
    displayController.renderToDo(initialNote.project);
    displayController.renderProject()} 
else {
    console.log(localStorage.getItem('catalog').length)
    toDoRepository.addFromLocalStorage()   
    displayController.renderToDo(Object.keys(toDoRepository.catalog)[0]);
    displayController.renderProject();
    localStorage.removeItem('catalog');
}
const saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', () => {
    toDoRepository.setLocalStorage();
});