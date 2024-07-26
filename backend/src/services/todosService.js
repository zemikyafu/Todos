const fs = require("fs");
// const file = "../../config/db.json";
const filePath = "./backend/config/db.json";
const todoRead = {};


const readtodos = async (callback) => {
   fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(error,null)
    } else {
      const todos = JSON.parse(data).todos;
      console.log("todoservice todo read: ",todos)
     callback(null,todos);
    }
  });
};

///
const updateTodos = async (id,newTodo,callback) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(error,null)
    } else {
      const json = JSON.parse(data);
      json.todos.forEach(element => {
        if(element.id===id)
        {
          element.title = newTodo.title;
          element.deadline = newTodo.deadline;
          element.status = newTodo.status;
        }
      });
      writeData(json.todos);
      const todo = json.todos.find((item) => item.id === id);
      if (todo) {
       
       // console.log("updated todos", todo);
        callback(null,todo)
      } else {
        callback(null,null)
      };
    }
  });
};


const readtodo =   async (id,callback) => {
  
 fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log("Error reading data: ", error);
      callback(err,null)
      
    } else {
      const json = JSON.parse(data);
      const todo = json.todos.find((item) => item.id === id);
      if (todo) {
        callback(null,todo)
      } else {
        callback(null,null)
      }
    }
  });
};

const writeData = async (todos) => {
  try {
    const data = { todos };
    await fs.writeFile(filePath, JSON.stringify(data,null,2),err=>
    {
      if(err)throw err
      console.log('Done writing')
    });
  } catch (error) {
    console.log("Error writing data: ", error);
    return [];
  }
};

module.exports.writeFile = writeData;
module.exports.readtodos = readtodos;
module.exports.readtodo = readtodo;
module.exports.updateTodos=updateTodos;