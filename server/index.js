const express = require("express"); //import express
const app = express(); //initialize express
const cors = require("cors"); //import cors
const pool = require("./db"); //import pool from db

//middleware
app.use(cors()); //req,res
app.use(express.json()); //req.body

//ROUTES

//create a todo

app.post("/todos", async (req,res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//get all todos

app.get("/todos", async (req,res) => {  
    //req,res
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
}
);

//get a todo

app.get("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}
);

//update a todo

//delete a todo

app.listen(5001,() => {
    console.log("Server has started on port 5001")
})