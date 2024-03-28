var taskArray = []
const taskList=document.getElementById('task-space');
const addTaskInp=document.getElementById('addingTask');
const taskCounter=document.getElementById('task-count');

//initially setting localstorage taskarray as empty array
localStorage.setItem("taskarray",JSON.stringify([]))

// The function which will take the input and simply append a <li> tag to our html file

function MakeVisibleTheTask(task){
	const li=document.createElement("li");

	// Creating <li> tag
	li.innerHTML=`
	    <input type="checkbox" id="${task.id}" data-id="12" class="custom-checkbox" ${task.status?"checked":""}/>
        <label for="${task.id}"><p>${task.text}</p></label>
        <img src="bin.svg" class="delete" data-id="${task.id}">
    `;

    // Inserting <li> tag to the html file

	taskList.append(li)
};


// Rendering the task list whenever task added or removed

function renderList(){

	// Remove the task
	taskList.innerHTML="";
	
	// updating taskArray before rerender the app
	taskArray = JSON.parse(localStorage.getItem("taskarray"));
	

	// Loop over the tasks present in taskArray and call MakeVisibleTheTask function and it will create the list
	for(let i=0; i<taskArray.length; i++){
		MakeVisibleTheTask(taskArray[i]);
	}
	// Updating task counter, how many taks left in the taskArray
	taskCounter.innerHTML=`<p>${taskArray.length}</p>`;
	
	

	
}

renderList();

// To remove the task from the list

function removeTask(TaskID){

	// filter the specfic task and removing

	const newTasks=taskArray.filter(function(task){
		return task.id !== TaskID;
	});

	// Updating the new taskArray with the filtered list
	localStorage.setItem("taskarray",JSON.stringify(newTasks))

	renderList();

	notification("Task removed successfully")

}

// Adding taks to list

function addTask(newtask){
	if(newtask){
		taskArray.push(newtask);
		localStorage.setItem("taskarray",JSON.stringify(taskArray))
		renderList();
		notification("Task added successfully");
		return;
	}
	notification("Task connot be added")
}

// Notification on actions

function notification(msg){
	alert(msg);
};

// Keypress Event handler

function taskNameInitialize(text,event) {
		if(!text){
			notification("Please enter some task");
			return;
		}
		const Task={
			text:text,
			id:Date.now().toString(),
			status:false
		}
		event.target.value="";
		addTask(Task);
}

function handleInputKeyPress(event){
	if(event.key==="Enter"){
		const text=event.target.value;
		taskNameInitialize(text,event)
	}
}

// Mouse clicks handler

function handleClicks(clickss){
	const target = clickss.target;
	if(target.className === "delete"){
		const taskId= target.dataset.id;
		removeTask(taskId);
		return;
	} else if(target.className==="clear-all-task"){
		localStorage.setItem("taskarray",JSON.stringify([]))
		renderList();
		return;
	} else if (target.className==="input-img"){
		taskNameInitialize(addTaskInp.value,clickss)

	} else if (target.className==="complete-all-task-btn"){
		taskArray.filter((item,i)=>{
			item.status = true
		})
		localStorage.setItem("taskarray",JSON.stringify(taskArray))
		renderList();
	}
}

// addEventListeners

addTaskInp.addEventListener("keyup",handleInputKeyPress);
document.addEventListener("click",handleClicks);
