import { useState } from "react";
import { addTodos,fetchTodos } from "../api/apiTodos";
function TodosForm(prob) {
  const today = new Date().toISOString().split("T")[0];
  const [active, setActive] = useState(false);
  const [error,setError]= useState(null);
  const [formState, setFormState] = useState({
    title: "",
    deadline: "",
    status: "",
  });
  const handleSubmit = (e) => {
    console.log("submit start")
    e.preventDefault();
    if (formState.status) {
      setActive(true);    
      try {
        console.log('formstate: ',formState)
       const respons= addTodos(formState);
       if(!respons.ok)
       { 
        setError("Error on post request")
        throw new Error("Error on post request")
       }
          console.log('respons: ',respons)
          prob.onSubmit(true);
      } catch (error) {
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
     {error && <span className="errorMsg">{error}</span> }
      <form onSubmit={handleSubmit}>
        <h4>Add new Todo</h4>
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          value={formState.title}
          onChange={handleOnchange}
        ></input>
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
          <button className="cancelButton">Cancel</button>
          <button className="addButton" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
export default TodosForm;
