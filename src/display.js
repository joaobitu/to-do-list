import {titleInput, descriptionInput, projectInput, dueDateInput,
    priorityInput, form, toDoContainer, projectList, projectClearButton} 
    from './domElements'
import { toDoRepository } from './toDoRepository';

const displayController = (() => {
        
    const clearToDoDisplay = () => {
        toDoContainer.innerHTML = ""
    }

    const renderToDo = (project) => {
        clearToDoDisplay(); // clears the display
        let valueCounter = 0;
            toDoRepository.catalog[project].forEach(element => {
                    toDoContainer.innerHTML += `

<div class="to-do">
    <div class="to-do-topside">
        <div class="to-do-topside-left">   
            <h3 class="${project}${valueCounter}">${element[0]}</h3>
            <p class="${project}${valueCounter}">${element[1]}</p>
            <p class="${project}${valueCounter}">Priority: ${element[2]}</p>
        </div>
            <p class="${project}${valueCounter}">${element[3]}</p>
        </div>
        <div class="button-container">
            <button class="edit-button-${project}" value="${valueCounter}">Edit</button>
            <button class="delete-button-${project}"  value="${valueCounter}">Delete</button>
        </div>
</div>        
            `
              valueCounter++
            });
    }

    const renderProject = () => {
            projectList.innerHTML = ""
            for (const item in toDoRepository.catalog) {
                 projectList.innerHTML += `<li id="${item}">${item}</li>`
              }
    } 
    const clearForm = () => {
        titleInput.value = "";
        descriptionInput.value = "";
        dueDateInput.value = "";
        projectInput.value = "";
        priorityInput.value = "";
    }
    
    return {renderToDo, renderProject, clearForm, clearToDoDisplay}
})();

export {displayController}