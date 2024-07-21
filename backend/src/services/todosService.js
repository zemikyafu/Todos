const fs = require("fs");
// const file = "../../config/db.json";
const file = "./backend/config/db.json";
const todoRead = {};


const readtodos = (callback) => {
  fs.readFile(file, (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(error,null)
    } else {
      const todos = JSON.parse(data).todos;
     callback(null,todos);
    }
  });
};

const updateTodos = async (id,newTodo,callback) => {
  fs.readFile("file", (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(error,null)
    } else {
      const json = JSON.parse(data);
      const todo = json.todos.find((item) => item.id === id);
      if (todo) {
        todo.title = newTodo.title;
        todo.deadline = newTodo.deadline;
        todo.status = newTodo.status;
        callback(null,todo)
      } else {
        callback(null,null)
      };
    }
  });
};


const readtodo =   (id,callback) => {
  
 fs.readFile(file, (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(err,null)
      
    } else {
      const json = JSON.parse(data);
      const todo = json.todos.find((item) => item.id === id);
      if (todo) {
        console.log("data1", JSON.stringify(todo));
        callback(null,todo)
      } else {
        callback(null,null)
      }
    }
  });
};

const writeData = async (data) => {
  try {
    const todos = { data };
    await fs.writeFile(file, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.log("Error writing data: ", error);
    return [];
  }
};

module.exports.writeFile = writeData;
module.exports.readtodos = readtodos;
module.exports.readtodo = readtodo;
module.exports.updateTodos=updateTodos;