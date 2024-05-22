export default function createCenterColumnAddTodoHtmlButtonElement(project) {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const image = document.createElement("img");

  div.classList.add("center-add-todo-div");
  h2.textContent = "Add New Todo";

  image.classList.add("center-add-todo-button");
  image.dataset.project = project;
  image.src = "./img/addNote.png";
  image.alt = "add-todo";
  image.title = "Click to add new todo";

  div.appendChild(h2);
  div.appendChild(image);

  return div;
}
