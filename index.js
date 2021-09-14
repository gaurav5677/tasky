const taskContainer = document.querySelector(".task_container");


const globalStore = [];




const generateNewCard = (taskData) => ` <div class="col-md-6 col-lg-4" id=${taskData.id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2 ">
    <button type="button" class="btn btn-success"><i class="fas fa-pencil-ruler"></i></button>
    <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i></button>
  </div> 
  <img
    src=${taskData.imageUrl}
    class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text"> ${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
      <div class="card-footer   ">
        <button type="button" class="btn btn-primary float-end">open task </button>
      </div>
  </div>
</div>
`;


const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("tasky");

  const { cards } = JSON.parse(getCardData);

  cards.map((cardObject) => {
    
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStore.push(cardObject); 
  })

};




const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    tasktitle: document.getElementById("Tasktitle").value,
    taskType: document.getElementById("Tasktype").value,
    taskDescription: document.getElementById("Taskdiscription").value,
  };



  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));


};







