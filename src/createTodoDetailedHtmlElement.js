export default function createTodoDetailedHtmlElement(
  name,
  description,
  dueDate,
  priority,
  notes,
  completed,
  dataSetIndex,
  dataSetProject
) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const ul = document.createElement("ul");
  const liDescription = document.createElement("li");
  const liDueDate = document.createElement("li");
  const liPriority = document.createElement("li");
  const liCompleted = document.createElement("li");
  const liNotes = document.createElement("li");
  const h4Description = document.createElement("h4");
  const h4DueDate = document.createElement("h4");
  const h4Priority = document.createElement("h4");
  const h4Completed = document.createElement("h4");
  const h4Notes = document.createElement("h4");
  const paragraphDescription = document.createElement("p");
  const paragraphDueDate = document.createElement("p");
  const paragraphPriority = document.createElement("p");
  const paragraphCompleted = document.createElement("p");
  const paragraphNotes = document.createElement("p");
  const input = document.createElement("input");
  const selectPriority = document.createElement("select");
  const selectCompleted = document.createElement("select");
  const optionLow = document.createElement("option");
  const optionMedium = document.createElement("option");
  const optionHigh = document.createElement("option");
  const optionYes = document.createElement("option");
  const optionNo = document.createElement("option");

  //Set attributes and classes of Elements
  div.classList.add("selected-todo");
  div.dataset.index = dataSetIndex;
  div.dataset.project = dataSetProject;
  h3.textContent = name;
  ul.classList.add("todo-details-list");
  liDescription.classList.add("todo-detail-list-item");
  h4Description.textContent = "Description:";
  paragraphDescription.textContent = description;
  liDueDate.classList.add("todo-detail-list-item");
  h4DueDate.textContent = "Due Date:";
  input.classList.add("due-date");
  input.setAttribute("type", "date");
  input.setAttribute("value", dueDate);
  liPriority.classList.add("todo-detail-list-item");
  h4Priority.textContent = "Priority:";
  selectPriority.setAttribute("id", "priority-select");

  optionLow.textContent = "Low";
  optionLow.setAttribute("value", "low");
  optionMedium.textContent = "Medium";
  optionMedium.setAttribute("value", "medium");
  optionHigh.textContent = "High";
  optionHigh.setAttribute("value", "high");

  if (priority === "high") {
    optionHigh.selected = "selected";
  } else if (priority === "medium") {
    optionMedium.selected = "selected";
  } else if (priority === "low") {
    optionLow.selected = "selected";
  } else {
    console.log("Error, check spelling");
  }

  liCompleted.classList.add("todo-detail-list-item");
  h4Completed.textContent = "Completed:";
  selectCompleted.setAttribute("id", "yes-no-select");
  optionYes.textContent = "Yes";
  optionYes.setAttribute("value", "yes");
  optionNo.textContent = "No";
  optionNo.setAttribute("value", "no");
  completed
    ? (optionYes.selected = "selected")
    : (optionNo.selected = "selected");
  liNotes.classList.add("todo-notes");
  liNotes.classList.add("todo-detail-list-item");
  h4Notes.textContent = "Notes:";
  paragraphNotes.setAttribute("contenteditable", "true");
  paragraphNotes.classList.add("notes-deatiled-todo");
  paragraphNotes.textContent = notes;

  //Create DOM structure
  div.appendChild(h3);
  div.appendChild(ul);
  ul.appendChild(liDescription);
  liDescription.appendChild(h4Description);
  liDescription.appendChild(paragraphDescription);
  ul.appendChild(liDueDate);
  liDueDate.appendChild(h4DueDate);
  liDueDate.appendChild(paragraphDueDate);
  paragraphDueDate.appendChild(input);
  ul.appendChild(liPriority);
  liPriority.appendChild(h4Priority);
  liPriority.appendChild(paragraphPriority);
  paragraphPriority.appendChild(selectPriority);
  selectPriority.appendChild(optionLow);
  selectPriority.appendChild(optionMedium);
  selectPriority.appendChild(optionHigh);
  ul.appendChild(liCompleted);
  liCompleted.appendChild(h4Completed);
  liCompleted.appendChild(paragraphCompleted);
  paragraphCompleted.appendChild(selectCompleted);
  selectCompleted.appendChild(optionYes);
  selectCompleted.appendChild(optionNo);
  ul.appendChild(liNotes);
  liNotes.appendChild(h4Notes);
  liNotes.appendChild(paragraphNotes);

  return div;
}
