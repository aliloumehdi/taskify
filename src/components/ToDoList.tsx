import React from 'react';
import { Todo } from '../model';
import './Styles.css';
import TodoCard from './TodoCard';
interface Props{
     
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList:React.FC<Props> = ({todos,setTodos}:Props) => {
  return <div className='todos'>
    {  todos.map( todo=> 
      <TodoCard todo={todo} key={todo.id}></TodoCard>
     )}
  </div>;
};

export default TodoList;
