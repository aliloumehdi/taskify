import React from 'react';
import { Todo } from '../model';
import './Styles.css';

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TodoCard from './TodoCard';
interface Props {

  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}
const TodoList: React.FC<Props> = ({ todos, setTodos,  CompletedTodos,
  setCompletedTodos}: Props) => {
  return (
    <div className="container">
  <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <TodoCard
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId='TodosRemove'>
      {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <TodoCard
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
 
  
  )
};

export default TodoList;
