import logo from "./logo.svg";
import "./App.css";
import "./components/Todos.css";
import TodosForm from "./components/TodosForm";
import TodoList from "./components/TodoList";
import { useState } from "react";
// import { addTodos,fetchTodos } from "../api/apiTodos";

function App() {
  const [todoLists, setTodoLists] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [listActive, setListActive] = useState(false);

  function openForm() {
    if (!formActive) {
      setFormActive(true);
      setListActive(false);
    } else {
      setFormActive(false);
      setListActive(true);
    }
  }
function onLinkClicked(active,item)
{
  
 setFormActive(!active);
 setListActive(active);
}
  function onSubmit(active) {
    // setTodoLists([...todoLists, data]);
    try {
      setListActive(active);
      setFormActive(!active);
    } catch (error) {
      console.log("error", error.message);
    }
  }
  return (
    <div className="App">
      <button className="addButton" onClick={openForm}>
        {" "}
        add new todo
      </button>
      {formActive && <TodosForm onSubmit={onSubmit}></TodosForm>}
      {listActive && <TodoList onLinkClicked={onLinkClicked}></TodoList>}
    </div>
  );
}

export default App;
