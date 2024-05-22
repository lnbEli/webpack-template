import "./style.css";
import App from "./application.js";
import createTodoHtmlElement from "./createTodoHtmlElement.js";
import createProjectHtmlElement from "./createProjectHtmlElement.js";
import createTodoDetailedHtmlElement from "./createTodoDetailedHtmlElement.js";
import createTodoFormHtmlElement from "./createTodoFormHtmlElement.js";
import createProjectFormHtmlElement from "./createProjectFormHtmlElement.js";
import createProjectTabHtmlElement from "./createProjectTabHtmlElement.js";
import sampleProjectsData from "./sampleProjectsData.js";
import toCamelCase from "./toCamelCase.js";
import createCenterColumnAddTodoHtmlButtonElement from "./createCenterColumnAddTodoHtmlButtonElement";
import Project from "./project.js";
import storageAvailable from "./storageAvailable.js";

const todoApp = new App();
const leftColumn = document.querySelector(".left");
const centerColumn = document.querySelector(".center");
const rightColumn = document.querySelector(".right");
const bottom = document.querySelector(".bottom");

//start up
function init() {
  getAnyAvailableLocalStorage();
  leftColumn.appendChild(createProjectTabHtmlElement());
  addEventListenerAddProjectButton();
  populateProjectsDom();
  populateTodosDom("defaultProject");
  changeColorOfFirstProjectAndTodo();
  populateTodoDetailsDom("defaultProject", 0);
}
init();

function openAddTodoForm(project) {
  bottom.appendChild(createTodoFormHtmlElement(project));
  removeCenterColumnAddTodoButton();
  addEventListenerToTodoFormButtons();
  setTwoColumnLayout();
  disableAddTodoButtons();
  disableAddProjectButton();
}

function submitTodo(e) {
  const name = document.querySelector(".todo-name-form");
  const description = document.querySelector(".todo-description-form");
  const date = document.querySelector(".todo-date-form");
  const todoFormElement = document.querySelector(".new-todo-div");
  const project = todoFormElement.dataset.project;
  console.log(project);
  const lastTodoIndex = todoApp.projects[project].todos.length - 1;
  // Uses Browser validation
  if (name.value === "" || description.value === "" || date.value === "") {
    return;
  } else {
    e.preventDefault();
    submitTodoValues();
    todoFormElement.remove();
    setThreeColumnLayout();
    populateTodosDom(project);
    changeColorOfLastAddedTodoDom();
    populateTodoDetailsDom(project, lastTodoIndex + 1);
    enableAddTodoButtons();
    enableAddProjectButton();
  }
}

function closeTodo(e) {
  e.preventDefault();
  const todoFormElement = document.querySelector(".new-todo-div");
  const project = todoFormElement.dataset.project;
  const numberOfTodosInProject = todoApp.projects[project].todos.length;
  todoFormElement.remove();
  if (numberOfTodosInProject > 0) {
    setThreeColumnLayout();
  } else {
    centerColumn.style.display = "grid";
  }
  populateTodosDom(project);
  enableAddTodoButtons();
  enableAddProjectButton();
}

function addProject() {
  const addProjectTab = document.querySelector(".new-project-tab");
  addProjectTab.remove();
  leftColumn.prepend(createProjectFormHtmlElement());
  addEventListenerNewProjectButtons();
  disableAddTodoButtons();
}

function createProject(e) {
  const addProjectName = document.querySelector(".project-name-form");
  const addProjectDescription = document.querySelector(
    ".project-description-form"
  );

  if (addProjectName.value !== "" && addProjectDescription.value !== "") {
    e.preventDefault();
    todoApp.addProject(addProjectName.value, addProjectDescription.value);

    addCenterColumnAddTodoButton(toCamelCase(addProjectName.value));
    addProjectName.value = "";
    addProjectDescription.value = "";
    setToLocalStorage();
    populateProjectsDom();
    closeProject();
    changeColorOfLastAddedProjectDom();
  } else {
    return;
  }
}

function closeProject() {
  const addProjectForm = document.querySelector(".new-project-div");
  addProjectForm.remove();
  leftColumn.prepend(createProjectTabHtmlElement());
  addEventListenerAddProjectButton();
  enableAddTodoButtons();
}

//Add EventListeners to buttons functions
function addEventListenerToTodoFormButtons() {
  const submitTodoButton = document.querySelector(".submit-todo");
  const closeTodoButton = document.querySelector(".close-todo");
  closeTodoButton.addEventListener("click", closeTodo);
  submitTodoButton.addEventListener("click", submitTodo);
}

function addEventListenerToAddTodoButtons() {
  const addTodoButton = document.querySelectorAll(".add-pointer");
  addTodoButton.forEach((element) => {
    element.addEventListener("click", () => {
      const project = toCamelCase(
        element.parentElement.children[1].textContent
      );
      openAddTodoForm(project);
    });
  });
}

function addEventListenerNewProjectButtons() {
  const createProjectButton = document.querySelector(
    ".submit-project-button-form"
  );
  const closeProjectButton = document.querySelector(
    ".close-project-button-form"
  );
  createProjectButton.addEventListener("click", createProject);
  closeProjectButton.addEventListener("click", closeProject);
}

function addEventListenerAddProjectButton() {
  const addProjectButton = document.querySelector(".new-project-button-tab");
  addProjectButton.addEventListener("click", addProject);
}

function addEventListenerPopulateProjectTodos() {
  const projectsDom = document.querySelectorAll(".project-refresh");
  projectsDom.forEach((project) => {
    project.addEventListener("click", () => {
      const selectedProject = toCamelCase(project.children[1].textContent);
      toggleHoverColorProjects(project);
      populateTodosDom(selectedProject);
      changeColorOfSelectedTodoDom();
      populateTodoDetailsDom(selectedProject, 0);
    });
  });
}

function addEventListenerPopulateTodoDetails() {
  const todosDom = document.querySelectorAll(".todo");
  todosDom.forEach((todo) => {
    todo.addEventListener("click", () => {
      const selectedtodoIndex = Number(todo.dataset.index);
      const currentProject = todo.dataset.project;
      populateTodoDetailsDom(currentProject, selectedtodoIndex);
      toggleHoverColorTodos(todo);
    });
  });
}

function addEventListenerToDeleteTodoButtons() {
  const deleteButtons = document.querySelectorAll(".bin");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      //stops event bubbling
      e.stopPropagation();
      const currentProject = button.parentElement.parentElement.dataset.project;
      const todoIndex = button.parentElement.parentElement.dataset.index;
      todoApp.projects[currentProject].todos.splice(todoIndex, 1);
      setToLocalStorage();
      populateTodosDom(currentProject);
      populateTodoDetailsDom(currentProject, Math.max(0, todoIndex - 1));
      changeColorOfLastAddedTodoDom();
    });
  });
}

function addEventListenerToDeleteProjectButtons() {
  const deleteButtons = document.querySelectorAll(".project-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      //stops event bubbling
      e.stopPropagation();
      const currentProject = toCamelCase(
        button.parentElement.querySelector("h2").textContent
      );
      delete todoApp.projects[currentProject];
      setToLocalStorage();
      populateProjectsDom();
      const approxFirstProjectInProjects = Object.keys(todoApp.projects)[0];
      populateTodosDom(approxFirstProjectInProjects);
      populateTodoDetailsDom(approxFirstProjectInProjects, 0);
      changeColorOfFirstProjectAndTodo();
    });
  });
}

function addEventListenerToCenterAddTodoButton() {
  const addTodoButton = document.querySelector(".center-add-todo-button");
  const currentProject = addTodoButton.dataset.project;

  addTodoButton.addEventListener("click", () => {
    openAddTodoForm(currentProject);
  });
}

function addEventListenerToCompletedTodoCheckbox() {
  const completedCheckboxes = document.querySelectorAll(".checkbox");
  completedCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const currentProject =
        checkbox.parentElement.parentElement.parentElement.dataset.project;
      const todoIndex = Number(
        checkbox.parentElement.parentElement.parentElement.dataset.index
      );
      const todo = todoApp.projects[currentProject].todos[todoIndex];

      todo.completed ? (todo.completed = false) : (todo.completed = true);
      setToLocalStorage();
    });
  });
}

function addEventListenerToDetailedTodo() {
  const dueDateInput = document.querySelector(".due-date");
  const selectedTodo = document.querySelector(".selected-todo");
  const currentProject = selectedTodo.dataset.project;
  const todoIndex = selectedTodo.dataset.index;
  const todo = todoApp.projects[currentProject].todos[todoIndex];
  const completedInput = document.getElementById("yes-no-select");
  const priorityInput = document.getElementById("priority-select");
  const notesInput = document.querySelector(".notes-deatiled-todo");

  //eventListeners
  dueDateInput.addEventListener("change", () => {
    todo.dueDate = dueDateInput.value;
    populateTodosDom(currentProject);
    populateTodoDetailsDom(currentProject, todoIndex);
    changeColorOfTodo(todoIndex);
    setToLocalStorage();
  });

  completedInput.addEventListener("change", () => {
    completedInput.value === "yes"
      ? (todo.completed = true)
      : (todo.completed = false);
    populateTodosDom(currentProject);
    populateTodoDetailsDom(currentProject, todoIndex);
    changeColorOfTodo(todoIndex);
    setToLocalStorage();
  });

  priorityInput.addEventListener("change", () => {
    todo.priority = priorityInput.value;
    populateTodosDom(currentProject);
    populateTodoDetailsDom(currentProject, todoIndex);
    changeColorOfTodo(todoIndex);
    setToLocalStorage();
  });

  notesInput.addEventListener("focusout", () => {
    todo.notes = notesInput.textContent;
    setToLocalStorage();
  });
}

function removeAllProjectsDom() {
  const projectsNode = document.querySelectorAll(".project-refresh");
  projectsNode.forEach((element) => {
    element.remove();
  });
}

function removeAllTodosDom() {
  const todoNode = document.querySelectorAll(".todo");
  todoNode.forEach((element) => {
    element.remove();
  });
}

function removeTodoDetailsDom() {
  const todoDetail = document.querySelector(".selected-todo");
  if (todoDetail) {
    todoDetail.remove();
  }
}

//function to create project in DOM
function populateProjectsDom() {
  removeAllProjectsDom();
  const projects = Object.values(todoApp.projects);

  projects.forEach((project) => {
    leftColumn.appendChild(
      createProjectHtmlElement(project.name, project.description)
    );
  });
  addEventListenerToAddTodoButtons();
  addEventListenerPopulateProjectTodos();
  addEventListenerToDeleteProjectButtons();
  removeTodoDetailsDom();
  removeAllTodosDom();
}

function populateTodosDom(project) {
  removeAllTodosDom();
  const todoColumn = document.querySelector(".center");
  const todosArray = todoApp.projects[project].todos;
  if (todosArray.length <= 0 && centerColumn.children.length <= 0) {
    addCenterColumnAddTodoButton(project);
  } else if (todosArray.length <= 0 && centerColumn.children.length === 1) {
    return;
  } else {
    let dataSetIndex = 0;
    todosArray.forEach((todo) => {
      todoColumn.appendChild(
        createTodoHtmlElement(
          todo.name,
          todo.completed,
          todo.dueDate,
          dataSetIndex,
          project
        )
      );
      dataSetIndex++;
    });

    addEventListenerPopulateTodoDetails();
    addEventListenerToDeleteTodoButtons();
    addEventListenerToCompletedTodoCheckbox();
    removeCenterColumnAddTodoButton();
    addPriorityColorToTodos();
  }
}

function disableAddTodoButtons() {
  const addTodoButton = document.querySelectorAll(".project-refresh");
  addTodoButton.forEach((button) => {
    button.style.pointerEvents = "none";
  });
}

function enableAddTodoButtons() {
  const addTodoButton = document.querySelectorAll(".project-refresh");
  addTodoButton.forEach((button) => {
    button.style.pointerEvents = "auto";
  });
}

function disableAddProjectButton() {
  const addProjectButton = document.querySelector(".new-project-button-tab");
  addProjectButton.style.pointerEvents = "none";
}

function enableAddProjectButton() {
  const addProjectButton = document.querySelector(".new-project-button-tab");
  addProjectButton.style.pointerEvents = "auto";
}

function submitTodoValues() {
  const name = document.querySelector(".todo-name-form");
  const description = document.querySelector(".todo-description-form");
  const dueDate = document.querySelector(".todo-date-form");
  const priority = document.querySelector(".todo-priority-form");
  const completed = document.querySelector(".todo-completed-form");
  const notes = document.querySelector(".todo-notes-form");
  const project = document.querySelector(".new-todo-div").dataset.project;

  todoApp.projects[project].addTodo(
    name.value,
    description.value,
    dueDate.value,
    priority.value,
    notes.value,
    completed.value
  );

  setToLocalStorage();
}

function populateTodoDetailsDom(project, todoIndex) {
  const selectedTodo = todoApp.projects[project].todos[todoIndex];
  removeTodoDetailsDom();
  if (selectedTodo) {
    rightColumn.appendChild(
      createTodoDetailedHtmlElement(
        selectedTodo.name,
        selectedTodo.description,
        selectedTodo.dueDate,
        selectedTodo.priority,
        selectedTodo.notes,
        selectedTodo.completed,
        todoIndex,
        project
      )
    );
    addEventListenerToDetailedTodo();
    addPriorityColorToDetailedTodo();
  }
}

function setThreeColumnLayout() {
  centerColumn.style.display = "grid";
  rightColumn.style.display = "block";
  bottom.style.gridTemplateColumns = "1fr 1fr 1fr";
}

function setTwoColumnLayout() {
  bottom.style.gridTemplateColumns = "1fr 1fr";
  centerColumn.style.display = "none";
  rightColumn.style.display = "none";
}

function addCenterColumnAddTodoButton(project) {
  //can remove?
  // centerColumn.style.gridAutoRows = "100%";
  while (centerColumn.firstChild) {
    centerColumn.removeChild(centerColumn.firstChild);
  }
  centerColumn.appendChild(createCenterColumnAddTodoHtmlButtonElement(project));
  addEventListenerToCenterAddTodoButton();
  bottom.style.gridTemplateColumns = "1fr 1fr";
  rightColumn.style.display = "none";
}

function removeCenterColumnAddTodoButton() {
  // centerColumn.style.gridAutoRows = "22%";
  const centerAddTodoButton = document.querySelector(".center-add-todo-div");
  if (centerAddTodoButton) {
    centerAddTodoButton.remove();
    bottom.style.gridTemplateColumns = "1fr 1fr 1fr";
    rightColumn.style.display = "block";
  }
}

function setToLocalStorage() {
  const currentProjectsJSON = JSON.stringify(todoApp.projects);
  localStorage.setItem("projects", currentProjectsJSON);
}

function getLocalStorage() {
  const localStorageProjectsJSON = localStorage.getItem("projects");
  const projects = JSON.parse(localStorageProjectsJSON);
  for (let project in projects) {
    Object.setPrototypeOf(projects[project], Project.prototype);
  }
  return projects;
}

function getAnyAvailableLocalStorage() {
  if (storageAvailable("localStorage")) {
    if (getLocalStorage() === null) {
      sampleProjectsData(todoApp);
    } else {
      todoApp.projects = getLocalStorage();
    }
  } else {
    console.log("Local storage not available");
  }
}

//Function to change colour of currently selected todos and projects.

function toggleHoverColorProjects(projectElement) {
  const projectsDom = document.querySelectorAll(".project-refresh");
  projectsDom.forEach((element) => {
    element.classList.remove("project-refresh-selected");
  });
  projectElement.classList.add("project-refresh-selected");
}

function changeColorOfLastAddedProjectDom() {
  const projectsDom = document.querySelectorAll(".project-refresh");
  const lastProject = projectsDom[projectsDom.length - 1];

  if (lastProject) {
    lastProject.classList.add("project-refresh-selected");
  }
}

function toggleHoverColorTodos(todoElement) {
  const todosDom = document.querySelectorAll(".todo");
  todosDom.forEach((element) => {
    element.classList.remove("todo-selected");
  });
  todoElement.classList.add("todo-selected");
}

function changeColorOfSelectedTodoDom() {
  const firstTodoDom = document.querySelector(".todo");
  if (firstTodoDom) {
    firstTodoDom.classList.add("todo-selected");
  }
}

function changeColorOfLastAddedTodoDom() {
  const todosDom = document.querySelectorAll(".todo");
  const lastTodo = todosDom[todosDom.length - 1];

  if (lastTodo) {
    lastTodo.classList.add("todo-selected");
  }
}

function changeColorOfFirstProjectAndTodo() {
  const firstProject = document.querySelector(".project-refresh");
  firstProject.classList.add("project-refresh-selected");
  const firstTodo = document.querySelector(".todo");
  firstTodo.classList.add("todo-selected");
}

function changeColorOfTodo(todoIndex) {
  const todosDom = document.querySelectorAll(".todo");
  const selectedTodo = todosDom[todoIndex];
  selectedTodo.classList.add("todo-selected");
}

function addPriorityColorToTodos() {
  const todosDom = document.querySelectorAll(".todo");
  todosDom.forEach((todo) => {
    const projectName = todo.dataset.project;
    const priority =
      todoApp.projects[projectName].todos[todo.dataset.index].priority;
    todo.classList.add(`todo-priority-${priority}`);
  });
}

function addPriorityColorToDetailedTodo() {
  const detailedTodoDom = document.querySelector(".selected-todo");
  const projectName = detailedTodoDom.dataset.project;
  const todoIndex = detailedTodoDom.dataset.index;
  const priority = todoApp.projects[projectName].todos[todoIndex].priority;
  detailedTodoDom.classList.add(`detailed-todo-priority-${priority}`);
}
