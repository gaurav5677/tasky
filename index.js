const taskContainer = document.querySelector(".task__container");


const globalStore = []


const generateNewCard = (taskData) => ` <div class="col-md-6 col-lg-5"  id=${taskData.id}>

<div class="card text-center">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-ruler"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
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
  <div class="card-footer  ">
    <button type="button" class="btn btn-primary float-end">Open task</button>
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

const saveChanges = () => {
  const taskData = {
    id: ` ${Date.now()}`,
    imgaeUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,





  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

};







