import React, { useState,useEffect } from "react";
import "./App.css";

// imports components


import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

function App () {
   

    // State
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    // Run only once 
    useEffect(() => {
        getLocalTodos();
    }, []);


    // useEffect
     useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos,status]);

    // Functions and Events
    const filterHandler = () => {
        switch(status) {
            case 'completed' :
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'uncompleted' :
                setFilteredTodos(todos.filter(todo => todo.completed === false));    
                break;
            default :
                setFilteredTodos (todos);
                break;    
        }
    };
    // Save to local 
    const saveLocalTodos = () => {
        if (localStorage.getItem('todos')=== null){
            localStorage.setItem('todos', JSON.stringify([]));
        }else {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    };  
    const getLocalTodos = () => {
        if (localStorage.getItem('todos')=== null){
            localStorage.setItem('todos', JSON.stringify([]));
        }else {
          let todoLocal= JSON>parseFloat(localStorage.getItem("todos"));
          setTodos(todoLocal);
        }
    };
    return (
        <div className = "App">
            <header>
                <h1> Sardor's ToDo List</h1>
            </header>
            <Form todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}  />
            <ToDoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
        </div>
    );
};