# todo-app

Main Learnings - 

*Modular Architecture Import/Export:
Code is split into multiple modules (e.g., application.js, createTodoHtmlElement.js, createProjectHtmlElement.js) for better maintainability and separation of concerns.
Utilises ES6 module syntax for importing dependencies 

*Class-Based Object-Oriented Programming (OOP):
The code defines a class App which encapsulates all methods and properties related to the application.
A constructor initialises the projects object and sets a default project and the number of projects.

*Event-Driven Programming:
Use of event handlers (click, change, etc.) to trigger functions based on user actions.

*DOM Manipulation:
Extensive use of document.createElement, appendChild, remove, and querySelector for creating, updating, and removing DOM elements dynamically.
Functions like populateProjectsDom() and populateTodosDom() dynamically update the DOM based on application state.

*Form Handling and Validation:
Built-in form validation using attributes like required on form inputs.
Custom validation and form handling.

*CSS Styling and Classes:
Dynamic class manipulation (classList.add, classList.remove) for styling elements based on their state (e.g., project-refresh-selected, todo-selected).

*Local Storage:
Functions setToLocalStorage() and getLocalStorage() handle saving and retrieving data from the browser's local storage.
Ensures data persistence between sessions.

*Data Management:
Use of a central todoApp object to manage application state.
Projects and todos are stored and manipulated within this object, providing a single source of truth.

*Utility Functions:
Helper functions like toCamelCase() for string manipulation.
Functions for enabling/disabling buttons (disableAddTodoButtons(), enableAddTodoButtons()).

*Use of external Library:
Use of date fns to format dates corectly.

*Responsive Layout Adjustments:
Functions like setThreeColumnLayout() and setTwoColumnLayout() adjust the layout of the application dynamically based on user interactions.

*Project and Todo Management:
Functions for adding, updating, and deleting projects and todos (addProject(), submitTodoValues().
Ensures comprehensive CRUD (Create, Read, Update, Delete) operations for project and task management.


Summary:
The application uses modular JavaScript architecture, class driven design,dynamic DOM manipulation, form handling with validation, and local storage for persistence. It employs a variety of techniques for managing projects and todos, including utility functions, responsive layout adjustments, and modular template creation. Biggest challenge was keeping todoApp object state seperate for DOM state. This is what I would focus on when refactoring.   







