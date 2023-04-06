import {
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  collection,
} from 'firebase/firestore';
import { db } from '../../firebase';

// create todo
export const creatTodo = async (event, { input, setInput }) => {
  event.preventDefault();
  if (!input) {
    return;
  }
  await addDoc(collection(db, 'todo'), {
    text: input,
    completed: false,
  });
  setInput('');
};

// update
export const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todo', todo.id), {
    completed: !todo.completed,
  });
};

export const editTodo = async (todo) => {
  await updateDoc(doc(db, 'todo', todo.id), {
    text: todo.text,
  });
};

// Delete todo
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todo', id));
};
