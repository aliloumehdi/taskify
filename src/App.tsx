import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/ToDoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CrudService from './services/Crud.service'; 
const API = "http://localhost:3001/tasks/"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const tasksService = new CrudService();
 
  useEffect(() => {
    
   
 
   
    tasksService.getAll().then(res => { 
          // setTodos(res.data)
          // console.log(res.data);
          const data=res.data as Todo[]
          data.map((el:Todo)=>{
            
            
      el.isDone?setCompletedTodos([...CompletedTodos,el]):setTodos([...todos,el])

          })
          console.log(CompletedTodos);
          console.log(todos);
          
          return
        })
    return () => {
     
    };
  },[] );
  
 
  
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const t={ _id: '', todo: todo, isDone: false }
      tasksService.add(t)  .then(response => {
        setTodos([...todos, response.data])
        setTodo("")
    })
     
    }

  }
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
console.log(result);


    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "todos") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todos") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
 
    
   
      CompletedTodos.filter(td=>!td.isDone).map(td=>{
        console.log(td,"comp");
        
        tasksService.setDone(td._id,!td.isDone).then(res=>{

        })
      })
    
     
      todos.filter(td=>td.isDone).map(td=>{
        tasksService.setDone(td._id,!td.isDone).then(res=>{

        })
      })
    
     
     
    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
        <TodoList
          setTodos={setTodos} todos={todos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        ></TodoList>
      </div>
    </DragDropContext>
  );
}

export default App;
