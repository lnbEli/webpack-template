import { isValid, format, parseISO } from "date-fns";

export default function createTodoHtmlElement(
  name,
  completed,
  due,
  dataSetIndex,
  dataSetProject
) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const h5Completed = document.createElement("h5");
  const h5Due = document.createElement("h5");
  const spanOuter = document.createElement("span");
  const spanInnerOne = document.createElement("span");
  const spanInnerTwo = document.createElement("span");
  const paragraph = document.createElement("p");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const dateFormatted = format(parseISO(due), "dd/MM/yy");

  div.classList.add("todo");
  div.setAttribute("data-index", dataSetIndex);
  div.setAttribute("data-project", dataSetProject);
  h3.textContent = name;
  spanOuter.classList.add("todo-btns");
  label.classList.add("completed-label");
  h5Completed.textContent = "Completed";
  input.setAttribute("id", `checkbox-${dataSetIndex}`);
  input.setAttribute("type", "checkbox");
  input.classList.add("checkbox");
  completed ? (input.checked = true) : (input.checked = false);
  h5Due.textContent = "Due Date";
  paragraph.textContent = dateFormatted;
  spanInnerTwo.classList.add("bin");
  spanInnerTwo.textContent = "🗑";

  div.appendChild(h3);
  div.appendChild(spanOuter);
  spanOuter.appendChild(label);
  label.appendChild(h5Completed);
  label.appendChild(input);
  spanOuter.appendChild(spanInnerOne);
  spanInnerOne.appendChild(h5Due);
  spanInnerOne.appendChild(paragraph);
  spanOuter.appendChild(spanInnerTwo);

  return div;
}
