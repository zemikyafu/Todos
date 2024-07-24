import { useEffect, useState } from "react";
import { fetchTodos } from "../api/apiTodos";


function TodoList(prob) {

  const[todoLists,setTododlists]=useState([]);
  const[active,setActive]=useState(true);

  const getbordercolor = (deadlineStatus) => {
  
    switch (deadlineStatus) {
      case "done":
        return "rgba(133, 240, 133, 0.5)"; //'lightgreen';
      case "notstarted":
        return "rgba(246, 44, 44, 0.5)"; //'lightred';
      case "inprogress":
        return "rgb(247, 247, 113,0.5)"; //'lightyellow';
      default:
        return "white";
    }
  };


  useEffect(()=>{
   const getTodos=  async ()=>{
    try {
    
      const todos = await fetchTodos();
      console.log("useeffect start", todos)
      setTododlists(todos)
    } catch (error) {
      console.log("Error fetching data: ",error.message)
    }
   };
   getTodos();
  },[])
 
  const updateTodo=(item)=>{
    setActive(false);
    prob.onLinkClicked(active,item);
  }

  const todolist = todoLists.map((item,index) => (
    <li key={index} onClick={()=>updateTodo(item)} style={{ borderColor: `${getbordercolor(item.status)}` }}>
      {" "}
      <span className="title">{item.title}</span>{" "}
      <span className="deadLine">Deadline: {item.deadline}</span>
    </li>
  ));

  return (
    <div className="todoList">
      <h3>Todo List</h3>

      <ul className="lists">{todolist}</ul>
      <ul className="statusbar">
       <li style={{ borderColor: `${getbordercolor("done")}` }}> Done</li>
        <li style={{ borderColor: `${getbordercolor("notstarted")}` }}>
          {" "}
          Not Started
        </li>
        <li style={{ borderColor: `${getbordercolor("inprogress")}` }}>
          {" "}
          In progress
        </li>
      </ul>
    </div>
  );
}
export default TodoList;
