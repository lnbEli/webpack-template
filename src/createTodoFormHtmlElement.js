export default function createTodoFormHtmlElement(project) {
  const div = document.createElement("div");

  const form = document.createElement("form");

  const ul = document.createElement("ul");

  const ulNotes = document.createElement("ul");

  const liName = document.createElement("li");
  const liDescription = document.createElement("li");
  const liDueDate = document.createElement("li");
  const liPriority = document.createElement("li");
  const liCompleted = document.createElement("li");
  const liNotes = document.createElement("li");
  const liButtons = document.createElement("li");

  const h4Name = document.createElement("h4");
  const h4Description = document.createElement("h4");
  const h4DueDate = document.createElement("h4");
  const h4Priority = document.createElement("h4");
  const h4Completed = document.createElement("h4");
  const h4Notes = document.createElement("h4");

  const labelName = document.createElement("label");
  const labelDescription = document.createElement("label");
  const labelDueDate = document.createElement("label");
  const labelPriority = document.createElement("label");
  const labelCompleted = document.createElement("label");
  const labelNotes = document.createElement("label");

  const paragraphName = document.createElement("p");
  const paragraphDescription = document.createElement("p");
  const paragraphDueDate = document.createElement("p");
  const paragraphPriority = document.createElement("p");
  const paragraphCompleted = document.createElement("p");
  const paragraphNotes = document.createElement("p");

  const inputName = document.createElement("input");
  const inputDescription = document.createElement("input");
  const inputDueDate = document.createElement("input");
  const inputButtonSubmit = document.createElement("input");
  const inputButtonClose = document.createElement("input");

  const selectPriority = document.createElement("select");
  const selectCompleted = document.createElement("select");

  const optionLow = document.createElement("option");
  const optionMedium = document.createElement("option");
  const optionHigh = document.createElement("option");
  const optionYes = document.createElement("option");
  const optionNo = document.createElement("option");

  const textArea = document.createElement("textarea");

  //Set attributes and classes of Elements
  div.classList.add("new-todo-div");
  div.dataset.project = project;
  form.classList.add("add-todo-form");
  ul.classList.add("add-todo-form-list");

  h4Name.textContent = "Todo Name:";
  labelName.htmlFor = "todo-name-form-id";
  inputName.setAttribute("type", "text");
  inputName.classList.add("todo-name-form");
  inputName.id = "todo-name-form-id";
  inputName.required = true;
  inputName.minLength = "4";
  inputName.maxLength = "20";

  h4Description.textContent = "Description:";
  labelDescription.htmlFor = "todo-description-form-id";
  inputDescription.setAttribute("type", "text");
  inputDescription.classList.add("todo-description-form");
  inputDescription.id = "todo-description-form-id";
  inputDescription.required = true;
  inputDescription.minLength = "15";
  inputDescription.maxLength = "50";

  h4DueDate.textContent = "Due Date:";
  labelDueDate.htmlFor = "todo-date-form-id";
  inputDueDate.setAttribute("type", "date");
  inputDueDate.classList.add("todo-date-form");
  inputDueDate.id = "todo-date-form-id";
  inputDueDate.required = true;

  h4Priority.textContent = "Priority:";
  labelPriority.htmlFor = "todo-priority-form-id";
  selectPriority.setAttribute("id", "priority-select");
  selectPriority.classList.add("todo-priority-form");
  selectPriority.id = "todo-priority-form-id";

  optionLow.textContent = "Low";
  optionLow.setAttribute("value", "low");
  optionMedium.textContent = "Medium";
  optionMedium.setAttribute("value", "medium");
  optionMedium.selected = "selected";
  optionHigh.textContent = "High";
  optionHigh.setAttribute("value", "high");

  h4Completed.textContent = "Completed:";
  labelCompleted.htmlFor = "todo-completed-form-id";
  selectCompleted.setAttribute("id", "yes-no-select");
  selectCompleted.classList.add("todo-completed-form");
  selectCompleted.id = "todo-completed-form-id";

  optionYes.textContent = "Yes";
  optionYes.setAttribute("value", "yes");
  optionNo.textContent = "No";
  optionNo.setAttribute("value", "no");
  optionNo.selected = "selected";

  ulNotes.classList.add("add-todo-form-notes-list");
  h4Notes.textContent = "Notes:";
  labelNotes.htmlFor = "todo-notes-form-id";
  textArea.setAttribute("rows", "10");
  textArea.classList.add("todo-notes-form");
  textArea.id = "todo-notes-form-id";

  liButtons.classList.add("add-todo-form-submit-button");
  inputButtonSubmit.classList.add("submit-todo");
  inputButtonSubmit.classList.add("submit");
  inputButtonSubmit.setAttribute("type", "submit");
  inputButtonSubmit.setAttribute("value", "Create");
  inputButtonClose.classList.add("submit");
  inputButtonClose.classList.add("close-todo");
  inputButtonClose.setAttribute("type", "button");
  inputButtonClose.setAttribute("value", "Close");

  //Create DOM structure
  div.appendChild(form);
  form.appendChild(ul);
  form.appendChild(ulNotes);

  ul.appendChild(liName);
  liName.appendChild(labelName);
  labelName.appendChild(h4Name);
  liName.appendChild(paragraphName);
  paragraphName.appendChild(inputName);

  ul.appendChild(liDescription);
  liDescription.appendChild(labelDescription);
  labelDescription.appendChild(h4Description);
  liDescription.appendChild(paragraphDescription);
  paragraphDescription.appendChild(inputDescription);

  ul.appendChild(liDueDate);
  liDueDate.appendChild(labelDueDate);
  labelDueDate.appendChild(h4DueDate);
  liDueDate.appendChild(paragraphDueDate);
  paragraphDueDate.appendChild(inputDueDate);

  ul.appendChild(liPriority);
  liPriority.appendChild(labelPriority);
  labelPriority.appendChild(h4Priority);
  liPriority.appendChild(paragraphPriority);
  paragraphPriority.appendChild(selectPriority);
  selectPriority.appendChild(optionLow);
  selectPriority.appendChild(optionMedium);
  selectPriority.appendChild(optionHigh);

  ul.appendChild(liCompleted);
  liCompleted.appendChild(labelCompleted);
  labelCompleted.appendChild(h4Completed);
  liCompleted.appendChild(paragraphCompleted);
  paragraphCompleted.appendChild(selectCompleted);
  selectCompleted.appendChild(optionYes);
  selectCompleted.appendChild(optionNo);

  ulNotes.appendChild(liNotes);
  liNotes.appendChild(labelNotes);
  labelNotes.appendChild(h4Notes);
  liNotes.appendChild(paragraphNotes);
  paragraphNotes.appendChild(textArea);

  ulNotes.appendChild(liButtons);
  liButtons.appendChild(inputButtonSubmit);
  liButtons.appendChild(inputButtonClose);

  return div;
}
