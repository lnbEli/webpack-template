import Project from "./project.js";
import toCamelCase from "./toCamelCase.js";

export default class App {
  constructor() {
    this.projects = {
      defaultProject: new Project(
        "Default Project",
        "Location for lonely Todos"
      ),
    };
    this.numberOfProjects = 1;
  }

  addProject(name, description) {
    const camelCaseName = toCamelCase(name);
    //check if project name already exists
    if (this.projects[camelCaseName]) {
      console.log("Error, Name Already Exists");
    } else {
      //add new project
      const project = new Project(name, description);
      this.numberOfProjects++;
      this.projects[camelCaseName] = project;
    }
  }

  removeProject(name) {
    delete this.projects[toCamelCase(name)];
  }
}
