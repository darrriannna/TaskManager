// TASK MANAGER

const taskManager = {
        tasks: [ ],


    addTask: function () { //adding the task to the list after submiting it in the foerm
     const taskForm = document.getElementById("taskForm");
     const taskList = document.getElementById("taskList");
     document.getElementById('taskList').style.display = 'block';
     document.getElementById('completedTasks').style.display = 'none'; //Making sure no other list than taskList displays when running this function
     document.getElementById('incompleteTasksList').style.display = 'none';

     taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

    
      const taskText = taskInput.value.trim()
      const taskItem = document.createElement("li");

      if (taskText !== "") { //if input is noe empty creating task item
        taskItem.classList.add("task-item");
        const id = checkIds()
        
        const newTask = {
            id: id,
            description: taskText,
            status: false,
        }
        taskManager.tasks.push(newTask) //pushing the task
        console.log(taskManager.tasks); //displaying tasks deatils in console
        taskList.prepend(taskItem); //displaying each new added task in the top of the list
        taskItem.textContent = taskText; //displaying task description to the user
         
        const taskInput = document.getElementById("taskInput");
        taskInput.value = ""; //clearing the input after submiting a task
      
      }
     })
     
     
    },
  
    listCompletedTasks: function () { //adding only tasks with status true(completed) to the list that is appearing by pressing the button
      
      const completedTasksContainer = document.getElementById("completedTasks");
      completedTasksContainer.innerHTML = ''; //clearing the previous content
  
      document.getElementById('taskList').style.display = 'none';
      document.getElementById('AddTaskForm').style.display = 'none'; //Making sure no other list displays when running this function
      document.getElementById('incompleteTasksList').style.display = 'none';

      const completedTasks = taskManager.tasks.filter(task => task.status); // Filtering tasks with status true(completed)
  
      completedTasks.forEach(task => { // for each task creating li element that displays  the task to user
          const taskItem = document.createElement("li");
          taskItem.textContent = task.description;
          taskItem.classList.add("task-item");
          completedTasksContainer.appendChild(taskItem);
      });
  
      
      if (completedTasks.length > 0) {
          completedTasksContainer.style.display = 'block';// Showing the container if there are completed tasks, otherwise hide it
      } else {
          completedTasksContainer.style.display = 'none';
      }
  },
  

  listIncompleteTasks: function () {
  
    const incompleteTasksContainer = document.getElementById("incompleteTasksList");
    
    incompleteTasksContainer.innerHTML = ''; //clearing the previous content
    document.getElementById('taskList').style.display = 'none';
    document.getElementById('AddTaskForm').style.display = 'none'; //Making sure no other list displays when running this function
    document.getElementById('completedTasks').style.display = 'none';
    const incompleteTasks = taskManager.tasks.filter(task => !task.status); // Filter tasks with status false (incomplete)

    incompleteTasks.forEach(task => {
        const taskItem = document.createElement("li"); //creating a list item for each input
        taskItem.textContent = task.description; // displaying the input user added
        taskItem.classList.add("task-item"); //giving a class to each item
        incompleteTasksContainer.appendChild(taskItem); //adding a task task in the end of the list
        
        // the event listener to each task item for user to be able to choose the task to complete
        taskItem.addEventListener("click", () => {
            manageTask(task); //caliing function to manage task
        });
    });

    
    if (incompleteTasks.length > 0) { //if there is no incomplete tasks it doesnt display
        incompleteTasksContainer.style.display = 'block';
    } else {
        incompleteTasksContainer.style.display = 'none';
    }
},

  };



  function listAllTasks() {
    document.getElementById('AddTaskForm').style.display = 'none';
    document.getElementById('completedTasks').style.display = 'none'; //Making sure no other list than taskList displays when running this function
    document.getElementById('incompleteTasksList').style.display = 'none';
    document.getElementById('taskList').style.display = 'block';

    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = ''; //clearing the previous content

    taskManager.tasks.forEach(task => {
        const statusText = task.status ? 'completed' : 'incomplete'; // giving two values to status true-completed, false-incomplete
        const taskDetails = `${task.description} - ${statusText}`; // displaying the task and it's status
        const taskItem = document.createElement("li"); //
        taskItem.textContent = taskDetails;
        taskItem.classList.add("task-item");
        taskListContainer.appendChild(taskItem);
    });
}


      function manageTask(task) { //user chooses to complete a task or сancel
          const choice = confirm(`Would you like to complete the task?\nOK to complete`);
          
          if (choice) {
              completeTask(task); // Complete the task
          } else {
              // Do nothing if the user cancels
          }
      }

      function completeTask(task) { // by completing a task the status of it changes to true
          task.status = true;
          console.log(`Task '${task.description}' marked as completed.`); 
      }


  function checkIds() { //checking ids and giving each new task an id(statarting with 1)
    const ids = taskManager.tasks.map(item => parseInt(item.id))
    const idMax = Math.max(...ids)
    let id

    if(idMax == -Infinity) {
      id = 1
    } else{
      id = idMax + 1
    }
    return id
  }
   
 
  function askUserName() { // function for asking the user to fill in their name
    let myName = null;

    while (myName === null || myName.trim() === "") { 
        myName = prompt("Hello and welcome to the Task Manager! Please enter your name");

        if (myName === "") { //if name input is empty
            const retry = confirm("Error! You didn't enter a valid name. Do you want to try again?");
            if (!retry) { //if user doent want to enter name and use taskmanager
                alert("Goodbye!");
                return; // foe exiting the function if user chooses not to retry
            }
        }
    }

    alert("Hello " + myName + ", nice to meet you! Let's get started"); //if name  input is NOT empty
    menu ();
    console.log(myName);
  }

  
  function menu(){ 
  // calling the functions by pressing a button
    document.getElementById('addTaskBtn').onclick = showForm;
    document.getElementById('listAllTasksBtn').onclick = listAllTasks;
    document.getElementById('listCompletedTasksBtn').onclick = taskManager.listCompletedTasks;
    document.getElementById('completeTaskBtn').onclick = taskManager.listIncompleteTasks;

    function showForm() { //showing a form for task input when pressing addTaskBtn
        document.getElementById('AddTaskForm').style.display = 'block';
        const taskInput = document.getElementById("taskInput");

        taskManager.addTask(taskInput.value);
      }
  }

    
    askUserName(); 
    menu();