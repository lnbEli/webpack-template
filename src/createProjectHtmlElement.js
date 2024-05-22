export default function createProjectHtmlElement(name, description) {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const paragraph = document.createElement("p");
  const image = document.createElement("img");
  const span = document.createElement("span");
  div.classList.add("project");
  div.classList.add("project-refresh");
  h2.textContent = name;
  paragraph.textContent = description;
  image.classList.add("add-pointer");
  image.src = "./img/addNote.png";
  image.alt = "add-todo";
  image.title = "Click to add new todo";
  span.textContent = "✖";
  span.classList.add("project-delete");
  if (name === "Default Project") {
    span.style.visibility = "hidden";
  }
  div.appendChild(span);
  div.appendChild(h2);
  div.appendChild(paragraph);
  div.appendChild(image);

  return div;
}
