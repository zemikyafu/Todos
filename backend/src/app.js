const express = require("express");
const app = express();

app.get("/",(req,res)=>{
res.set({'content-type':'text/html'})
res.status(200).send('<p>Home page</p>')
});
app.get("/toodos", (req, res) => {
  const url = req.url;
  console.log(url);

  const todos = JSON.stringify({ id: 1, title: "test", status: "done" });
  res.set({'content-type':'text/html'})
  res.status(200).send(todos);
  res.send(todos);
});

app.listen("8080", () => console.log("Listing on port 8080"));
