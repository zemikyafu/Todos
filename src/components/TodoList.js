function TodoList(prob) {
  const todlists = prob.todolists;

  const getbordercolor = (deadlineStatus) => {
    console.log(deadlineStatus);
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
  const todolist = todlists.map((item, index) => (
    <li style={{ borderColor: `${getbordercolor(item.status)}` }}>
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
