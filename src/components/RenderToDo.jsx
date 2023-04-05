import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import style from './Style';

const RenderTodo = ({
  todo, toggleComplete, deleteTodo, editTodo,
}) => {
  const [text, setText] = useState(todo.text);
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      const updatedTodo = { ...todo, text };
      editTodo(event, updatedTodo);
    }
  };
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked' : ''}
        />
        <input
          className={todo.completed ? style.textCompletion : style.text}
          value={text}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      <button type="button" onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

RenderTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default RenderTodo;
