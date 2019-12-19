import React from "react";
import Todo from "./todo";
import List from "./list";
import { useAppState } from "./app-state.jsx";
import styles from "./todo-list.module.css";

const ChangeStateButton = ({ checked, onChange }) => (
  <button className={styles.ChangeStateButton} onClick={onChange}>
    {checked ? "mark as pending" : "mark as done"}
  </button>
);

const TodoList = () => {
  const { loading, todos, updateTodo, removeTodo } = useAppState();
  return (
    <List
      data={todos}
      fallback={
        loading ? (
          <p className={styles.LoadingTodos}>Loading...</p>
        ) : (
          <p className={styles.NoTodos}>No todos! well done!</p>
        )
      }
    >
      {todo => (
        <Todo
          todo={todo}
          changeStateButton={<ChangeStateButton />}
          onUpdateTodo={updateTodo}
          onRemoveTodo={removeTodo}
        />
      )}
    </List>
  );
};

export default TodoList;
