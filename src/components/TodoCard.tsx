import React from 'react';
import { Todo } from '../model';
type Prosp{
todo:Todo,
todos:Todo[]
setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
} 
const TodoCard = ({todo,todos,setTodos}) => {
  return <div>

AiFillEdit
AiFillDelete
AiOutlineFileDone
  </div>;
};

export default TodoCard;
