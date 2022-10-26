//input values
const titleInput = document.querySelector('#title-input');
const descriptionInput = document.querySelector('#description-input');
const projectInput = document.querySelector('#project-input');
const dueDateInput = document.querySelector('#dueDate');
const priorityInput = document.querySelector('#priority-input');
//selecting the form to remove the default behavior 
const form =  document.querySelector('form')
//todo-container
const toDoContainer = document.querySelector('#to-do-display');
//project-menu-ul
const projectList = document.querySelector('#projects-menu-list');
//project menu button
const projectClearButton = document.querySelector('#project-clear-button')

export {titleInput, descriptionInput, projectInput, dueDateInput,
    priorityInput, form, toDoContainer, projectList, projectClearButton}