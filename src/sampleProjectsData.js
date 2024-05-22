export default function sampleProjectsData(todoApp) {
  todoApp.addProject("Project One", "My First Project");

  todoApp.projects.projectOne.addTodo(
    "Goodbye Note",
    "Terrible task",
    "2018-07-22",
    "medium",
    "Notes are boring",
    false
  );

  todoApp.projects.projectOne.addTodo(
    "Must do!",
    "Amazing task",
    "2012-07-02",
    "low",
    "Notes are the best",
    false
  );

  todoApp.projects.projectOne.addTodo(
    "Welcome",
    "task",
    "2015-05-02",
    "low",
    "notes are boring",
    true
  );
  todoApp.projects.defaultProject.addTodo(
    "Feedback?",
    "Would be appreciated",
    "2018-11-24",
    "low",
    "Notes are awesome",
    false
  );

  todoApp.projects.defaultProject.addTodo(
    "My second note",
    "Amazing Default",
    "2016-02-24",
    "high",
    "Notes are OK",
    true
  );

  todoApp.projects.defaultProject.addTodo(
    "My third note",
    "taskish",
    "2018-09-21",
    "low",
    "notes are hmmm",
    true
  );
}
