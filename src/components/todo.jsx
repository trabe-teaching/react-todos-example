import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./todo.module.css";

const Todo = ({
  todo: { id, text, pending },
  changeStateButton = <input type="checkbox" />,
  removeButton = <button className={styles.RemoveTodo}>x</button>,
  onUpdateTodo,
  onRemoveTodo,
}) => {
  const handleChange = () => onUpdateTodo(id, !pending);
  const handleRemove = () => onRemoveTodo(id);

  return (
    <div className={styles.Todo}>
      <span className={cn({ [styles.Todo___done]: !pending })}>{text}</span>
      <span>
        {cloneElement(changeStateButton, { checked: !pending, onChange: handleChange })}
        {cloneElement(removeButton, { onClick: handleRemove })}
      </span>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
  }),
  changeStateButton: PropTypes.element,
  removeButton: PropTypes.element,
  onUpdateTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default Todo;
