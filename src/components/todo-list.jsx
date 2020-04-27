import React from "react";
import PropTypes from "prop-types";
import Todo from "./todo";
import styles from "./todo-list.module.css";

const ChangeStateButton = ({ checked, onChange }) => (
  <button className={styles.ChangeStateButton} onClick={onChange}>
    {checked ? "mark as pending" : "mark as done"}
  </button>
);

const TodoList = ({ todos, onUpdateTodo, onRemoveTodo }) =>
  todos.length === 0 ? (
    <p className={styles.NoTodos}>No todos! well done!</p>
  ) : (
    <ul className={styles.Todos}>
      {todos.map((todo, i) => (
        <li className={styles.Todo} key={i}>
          <Todo
            todo={todo}
            changeStateButton={<ChangeStateButton />}
            onUpdateTodo={onUpdateTodo}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  );

TodoList.propTypes = {
  todos: PropTypes.arrayOf(Todo.propTypes.todo).isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
