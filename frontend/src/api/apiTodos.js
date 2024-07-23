import App from "../App";

const API = "http://localhost:8080/api";
const header = {
  "content-type": "application",
};

export const addTodos = async (todo) => {
  try {

    const response = await fetch(API + "/todos", {
      method: "POST",
      headers: header,
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Error on post request");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:" + error.message);
  }
};

export const fetchTodos = async () => {
  try {
    const response = await fetch(API + "/todos");
    if (!response.ok) {
      throw new Error("Error on fetchinng todos");
    }
    {
      const data = response.json();
      console.log("data fetched: ", data);
      return data;
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
