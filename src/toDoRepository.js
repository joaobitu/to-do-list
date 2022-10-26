const toDoRepository = ( () =>{
    let catalog = {};


    const addToDo = (addedToDo, project) => {
        if (project in catalog) {
            catalog[project].push(Object.values(addedToDo));   
        } else {
            //logic to run if a project is not yet defined,
            catalog[project] = []
            catalog[project].push(Object.values(addedToDo));
            //need to emit whenver a book is added so render can be done
        }
    }

    const removeToDo = (project, index) => {
            
            catalog[project].splice(index, 1);
            // logic to emit this to also prompt a render
    }
    const clearProject = () => {
        for (const pro in catalog) {
            if (catalog[pro].length == 0) {
                delete catalog[pro];
            }
        } 
    }
    return { addToDo, removeToDo, catalog, clearProject };

})();

export {toDoRepository}