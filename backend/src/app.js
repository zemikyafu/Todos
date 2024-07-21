const express = require("express");
const app = express();
const todosServices=require('./services/todosService.js');



app.get('/todos', async (req, res) => {

  todosServices.readtodos(file,(error,data)=>{
    if(error)
    {
      console.log('error: ',error)
      res.status(500).send({'Error':'Internal Server error'})
    }
    else
    {
      console.log("todos: ",JSON.parse(data));
      res.status(200).json(JSON.parse(data).todos);
    }
    
   });
      
});

app.get('/todos/:id',async (req,res)=>{
    const id= parseInt(req.params.id);
   await todosServices.readtodo(id,(error,data)=>{
    if(error)
    {
      res.status(500).send({'error':'Internal server error'})
      console.log('error: ',error)
    }
    else if(data)
    {
        res.status(200).json(data);
     
    }
    else
    {
       res.status(404).json({"error":"Todo not found"})
    }
    
   });
  
});

app.put('/todo/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const newTodo=req.body;
  todosServices.updateTodos(id,newTodo,(error,data)=>{
    if(error)
      {
        res.status(500).send({'error':'Internal server error'})
        console.log('error: ',error)
      }
      else if(data)
      {
          res.status(200).json(data);
       
      }
      else
      {
         res.status(404).json({"error":"Todo not found"})
      }
      
  })

});

app.post('/todos',(req,res)=>{
  try{
      const newTodos = todosServices.readtodos();
      newTodos.push(data);
      // await todosServices.writeFile(todos);
      todosServices.writeFile(todos);
      res.status(201).Json(newTodos);
  }
  catch(error)
  {
    console.log('Error right: ',error);
    return [];

  }
  

});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listing on port ${port}`));
