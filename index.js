const taskContainer = document.querySelector(".task__container");


let globalStore = []


const generateNewCard = (taskData) => ` <div class="col-md-6 col-lg-5"  id=${taskData.id}>

<div class="card text-center">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" id=${taskData.id}  class="btn btn-outline-success" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-ruler" id=${taskData.id} onclick="editCard.apply(this, arguments)" ></i>
    </button> 
    <button type="button" id=${taskData.id}  class="btn btn-outline-danger"  onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div> 
  <img
    src="${taskData.imgaeUrl}"
    class="card-img-top" alt="..."
    />
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer  text-muted ">
    <button type="button" id=${taskData.id} class="btn btn-primary float-end">Open task</button>
  </div>
</div>

 
</div>`;



const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("tasky");

  const { cards } = JSON.parse(getCardData);

  cards.map((cardObject) => {


    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStore.push(cardObject);

 
    
  })


};




const updateLocalStorage =() =>
localStorage.setItem ("tasky" , JSON.stringify({cards:globalStore}));

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imgaeUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,





  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
 
  updateLocalStorage();  

};


const deleteCard = (event) => {
  event = window.event;

  const targetID = event.target.id;

  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);

  updateLocalStorage(); 
  
  if (tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }




};



const editCard = (event) => {

  event = window.event;

  const targetID = event.target.id;

  const tagname = event.target.tagName;

  let parentElement;
  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];


  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEditchanges.apply(this,arguments)");
  submitButton.innerHTML = "Save Changes";


};



const saveEditchanges = (event) => {
  event = window.event;

  const targetID = event.target.id;
 console.log(targetID);
  const tagname = event.target.tagName;

  let parentElement;
  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1];


  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,

  };

  globalStore = globalStore.map((task) => {
    if (task.id === targetID) {
      return {
        id: task.id,
        imgaeUrl: task.imgaeUrl,
        taskTitle: updateData.taskTitle,
        taskType: updateData.taskType,
        taskDescription: updateData.taskDescription
      };
    }
   return task; //Important
  });
 
   updateLocalStorage();

}; 