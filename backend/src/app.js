const express = require("express");
const app = express();
const todosServices = require("./services/todosService.js");
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cors(corsOptions));
app.get("/api/todos", async (req, res) => {
  await todosServices.readtodos((error, data) => {
    if (error) {
      console.log("error: ", error);
      res.status(500).send({ Error: "Internal Server error" });
    } else {
      console.log("todos: ", data);
      res.status(200).send(data);
    }
  });
});

app.get("/api/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await todosServices.readtodo(id, (error, data) => {
    if (error) {
      res.status(500).send({ error: "Internal server error" });
      console.log("error: ", error);
    } else if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
});

app.put("/api/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newTodo = req.body;
  todosServices.updateTodos(id, newTodo, (error, data) => {
    if (error) {
      res.status(500).send({ error: "Internal server error" });
      console.log("error: ", error);
    } else if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
});

app.post("/api/todos", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "Request body empty " });
    return;
  }

  const newTodos = req.body;
  await todosServices.readtodos((error, data) => {
    try {
      
      data.push(newTodos);
      // await todosServices.writeFile(todos);
      todosServices.writeFile(data);
      res.status(201).json(newTodos);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Error on posting todos")
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listing on port ${port}`));
