import { onSnapshot, query, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from '../firebase';
import RenderTodo from './components/RenderToDo';
import {
  toggleComplete,
  creatTodo,
  deleteTodo,
  editTodo,
} from './components/CRUD';
import style from './components/Style';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleSubmit(event) {
    creatTodo(event, { input, setInput });
  }

  // Read todo
  useEffect(() => {
    const q = query(collection(db, 'todo'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form
          onSubmit={handleSubmit}
          className={style.form}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={style.input}
            placeholder="Add todo"
          />
          <button
            type="button"
            className={style.plusButton}
          >
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <RenderTodo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>
            You have
            {todos.length}
            {' '}
            todos
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
