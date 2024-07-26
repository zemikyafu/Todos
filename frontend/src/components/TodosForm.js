import { useState,useEffect } from "react";
import { addTodos,updateTodos } from "../api/apiTodos";
function TodosForm({ onSubmit, updateState: initialUpdateState, item }) {
  const today = new Date().toISOString().split("T")[0];
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const[updateState,setUpdateState]=useState(initialUpdateState);
  const [formState, setFormState] = useState({
    title: "",
    deadline: "",
    status: "",
  });
  
 

  useEffect(() => {
    //setUpdateState(false);
  
    if (item) {
      setUpdateState(initialUpdateState);
      setFormState({
        ...item, 
        deadline: item.deadline ? new Date(item.deadline).toISOString().split("T")[0] : "",
      });
      //console.log("item deadline update ",formState.deadline)
    }
  }, [initialUpdateState, item]);

  
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    if (formState.status ) {
      setActive(true);
      try {
        if(updateState)
        {  
          
           const id =item.id;
           const respone= await updateTodos(formState,id);
           console.log('update respons',respone);
           setUpdateState(false);
           onSubmit(true,true);
        }
        else
        {
          const response = await addTodos(formState);
           console.log('add respons',response);
           onSubmit(true,false);
        }  
      
    
  
      } catch (error) {
        setError("Error on post request");
        console.log("Error", error.message);
      }
    }
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };


  return (
    <div className="todoContainer">
      {error && <span className="errorMsg">{error}</span>}
      <form onSubmit={handleSubmit}>
      <h4>{updateState ? "Update Todo" : "Add new Todo"}</h4>
        
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          value={formState.title}
          onChange={handleOnchange}>
          </input>
        <input
          type="date"
          placeholder="Deadline"
          name="deadline"
          min={today}
          required
          value={formState.deadline}
          onChange={handleOnchange}
        ></input>
        <select
          placeholder="Status"
          name="status"
          value={formState.status}
          onChange={handleOnchange}
        >
          <option value="" disabled>
            Selct Status
          </option>
          <option value={"done"}> Done</option>
          <option value={"notstarted"}> Not started</option>
          <option value={"inprogress"}> In progress</option>
        </select>

        <div className="addAndCanceldiv">
          <button className="cancelButton" onClick={() => onSubmit(false)}>Cancel</button>
          <button className={!updateState? "addButton":"updateButton"}> {!updateState?"Add":"Update"}</button>
        </div>

       
      </form>
    </div>
  );
}
export default TodosForm;
