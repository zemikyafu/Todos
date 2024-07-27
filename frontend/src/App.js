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
  const [update, setUpdate]=useState(false);
  const [formState, setFormState] = useState({});


   const openForm=()=>{
    if (!formActive) {
      setFormActive(true);
      setListActive(false);
    } else {
      setFormActive(false);
      setListActive(true);
    }
  }
 const onLinkClicked=(active,update,item)=>
{
  
 setFormActive(active);
 setListActive(!active);
 setUpdate(update);
 setFormState(item);
 console.log("item on linkclicked",item);
}
  const onSubmit=(active,updateState)=> {
    

      setListActive(active);
      setFormActive(!active);
      if(updateState)
      {
        setUpdate(false);
        setFormState({});
      }
   
  }
  return (
    <div className="App">
      <div className="App-header"></div>
      <button className="addButton" onClick={()=>openForm()}>
        {" "}
       {formActive ? "todo Lists" : "add new todo"}
      </button>
      {formActive && <TodosForm onSubmit={onSubmit} updateState={update} item={formState} ></TodosForm>}
      {listActive && <TodoList onLinkClicked={onLinkClicked} ></TodoList>}
    </div>
  );
}

export default App;
