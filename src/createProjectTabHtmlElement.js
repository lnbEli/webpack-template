export default function createProjectTabHtmlElement() {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const image = document.createElement("img");

  div.classList.add("project");
  div.classList.add("new-project-tab");
  h2.textContent = "Add New Project";

  image.classList.add("add-project");
  image.classList.add("new-project-button-tab");
  image.src = "./img/addLibrary.png";
  image.alt = "add-project";
  image.title = "Click to add new project";

  div.appendChild(h2);
  div.appendChild(image);

  return div;
}
