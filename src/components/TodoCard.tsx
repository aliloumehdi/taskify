import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './TodoCard.css';
import { Draggable } from 'react-beautiful-dnd';
import CrudService from '../services/Crud.service';

type Props = {
  todo: Todo,
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}
const tasksService = new CrudService();
const TodoCard = ({ todo, todos, setTodos, index }: Props) => {
  const handleDone = (id: string) => {
    // setTodos(todos.map(
    //   todo => todo._id == id ? { ...todo, isDone: !todo.isDone }:todo
    //   )
    //   );
    if (todo) {
      tasksService.setDone(todo._id, !todo.isDone).then(response => {
        setTodos([...todos, response.data])
        setTodos(todos.map(
          todo => todo._id == id ? { ...todo, isDone: !todo.isDone } : todo
        )
        );
      })

    }
  };
  const handleDelete = (id: string) => {

    tasksService.delete(id).then(res => {
      setTodos(todos.filter(todo => {
        return todo._id != id
      }))
    })
  }
  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const ed = todo
    ed.todo = editTodo
    tasksService.update(ed).then(res => {
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, todo: editTodo } : todo))
      );

    }).finally(() => {
      setEdit(false);
    })

  };
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();


  }, [edit]);
  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo._id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo._id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>


  )
};

export default TodoCard;
