export default function createProjectFormHtmlElement() {
  const div = document.createElement("div");
  const form = document.createElement("form");
  const ul = document.createElement("ul");
  const liName = document.createElement("li");
  const liDescription = document.createElement("li");
  const liButtons = document.createElement("li");
  const labelName = document.createElement("label");
  const labelDescription = document.createElement("label");
  const h4Name = document.createElement("h4");
  const h4Description = document.createElement("h4");
  const inputName = document.createElement("input");
  const inputDescription = document.createElement("input");
  const inputButtonSubmit = document.createElement("input");
  const inputButtonClose = document.createElement("input");

  //Set attributes and classes of Elements
  div.classList.add("project");
  div.classList.add("new-project-div");
  form.classList.add("add-project-form");
  h4Name.textContent = "New Project Name:";
  h4Description.textContent = "Description:";
  labelName.htmlFor = "project-name-form-id";
  labelDescription.htmlFor = "project-description-form-id";
  inputName.classList.add("project-name-form");
  inputName.id = "project-name-form-id";
  inputName.setAttribute("type", "text");
  inputName.required = true;
  inputName.maxLength = "15";
  inputDescription.classList.add("project-description-form");
  inputDescription.id = "project-description-form-id";
  inputDescription.required = true;
  inputDescription.maxLength = "24";
  inputDescription.setAttribute("type", "text");
  liButtons.classList.add("project-buttons-form");
  inputButtonSubmit.classList.add("submit-project-button-form");
  inputButtonSubmit.setAttribute("type", "submit");
  inputButtonSubmit.setAttribute("value", "create");
  inputButtonClose.classList.add("close-project-button-form");
  inputButtonClose.setAttribute("type", "button");
  inputButtonClose.setAttribute("value", "close");

  //Create DOM structure
  div.appendChild(form);
  form.appendChild(ul);
  form.appendChild(ul);

  ul.appendChild(liName);
  liName.appendChild(labelName);
  labelName.appendChild(h4Name);
  liName.appendChild(inputName);

  ul.appendChild(liDescription);
  liDescription.appendChild(labelDescription);
  labelDescription.appendChild(h4Description);
  liDescription.appendChild(inputDescription);

  ul.appendChild(liButtons);
  liButtons.appendChild(inputButtonSubmit);
  liButtons.appendChild(inputButtonClose);

  return div;
}
