import React, { useState, useEffect, useRef } from "react";
import styles from "./todo-form.module.css";
import { useAppState } from "./app-state";
import { alert } from "./alert";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [pending, setPending] = useState(true);
  const taskRef = useRef();
  const { loading, addTodo } = useAppState();

  useEffect(() => {
    taskRef.current.focus();
  }, [loading]);

  const handleTaskChange = e => setTask(e.target.value);
  const handlePendingChange = () => setPending(!pending);

  const handleSubmit = e => {
    e.preventDefault();
    if (task === "") {
      alert("Cannot add empty todo").then(() => taskRef.current.focus());
    } else {
      addTodo({ text: task, pending });
      setTask("");
      setPending(true);
      taskRef.current.focus();
    }
  };

  return (
    <form className={styles.TodoForm}>
      <input ref={taskRef} type="text" value={task} placeholder="Task" disabled={loading} onChange={handleTaskChange} />
      <label>
        <input type="checkbox" checked={!pending} disabled={loading} onChange={handlePendingChange} /> done
      </label>
      <button className={styles.AddTodoButton} disabled={loading} onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
