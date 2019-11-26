module.exports = {
    intToBoolean,
    booleanToInt,
    updateProjectBools
};

function intToBoolean(int) {
    return int === 1 ? true : false;
};

function booleanToInt(bool) {
    return bool === true ? 1 : 0;
};

// takes in a project object
function updateProjectBools(project) {
    const updatedProject = {
        ...project,
        completed: intToBoolean(project.completed), // projects have a completed key that has a value of 1 or 0 - using intToBoolean we can make the completed key be true or false instead
    };

    // code should only run if the project has tasks on it
    if (project.tasks) {
        project.tasks = project.tasks.map(task => {
            return {
                ...task,
                completed: intToBoolean(task.completed), // same as the projects above we can update the tasks completed key to return a true or false instead of a 0 or 1
            };
        });
    }
    
    return updatedProject;
};