import Todo from "./todo";

export default class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.todos = [];
    this.completedPercentage = 0;
  }

  addTodo(name, description, dueDate, priority, notes, completed) {
    const todo = new Todo(
      name,
      description,
      dueDate,
      priority,
      notes,
      completed
    );
    this.todos.push(todo);
  }

  //not used
  removeTodo(name) {
    const selectedTodoIndex = this.todos.findIndex((i) => i.name === name);
    this.todos.splice(selectedTodoIndex, 1);
  }
}
