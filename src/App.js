import logo from "./logo.svg";
import "./App.css";
import "./components/Todos.css";
import TodosForm from "./components/TodosForm";
import TodoList from "./components/TodoList";
import { useState } from "react";

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

  function onClickAdd(active, data) {
    setTodoLists([...todoLists, data]);
    setListActive(active);
    setFormActive(!active);
  }
  return (
    <div className="App">
      <button className="addButton" onClick={openForm}>
        {" "}
        add new todo
      </button>
      {formActive && <TodosForm onClickAdd={onClickAdd}></TodosForm>}
      {listActive && <TodoList todolists={todoLists}></TodoList>}
    </div>
  );
}

export default App;
