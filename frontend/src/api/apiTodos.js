import App from "../App";

const API = "http://localhost:8080/api/todos";
const header = {
  "content-type": "application/json",
};

export const addTodos = async (todo) => {
  
  try {
    todo.id=todo.title.length;
    const respone =await fetch(API, {
      method: "POST",
      headers: header,
      body: JSON.stringify(todo),
    });
   
    
    if(!respone.ok)
    {
      throw new Error("Error on prost request");
    }
    const data= await respone.json();
    return data;
  } catch (error) {
    console.log("Error", error.message);
  }
  

  
};

export const updateTodos = async (todo,id) => {
  try {
    
    const respone= await fetch( API+"/"+id,{
    method: "PUT",
    headers:header,
    body:JSON.stringify(todo),
    });
    if(!respone.ok)
    {
   throw new Error("todos Update failed")
    }
    const data= await respone.json();
    return data;
  } catch (error) {
    console.log("Error: ",error.message)
  }
}

export const fetchTodos = async () => {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Error on fetchinng todos");
    }
    {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
