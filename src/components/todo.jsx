import React, { cloneElement, Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Confirm from "./confirm";
import styles from "./todo.module.css";

class Todo extends Component {
  state = {
    confirmingRemove: false,
  };

  render() {
    const {
      todo: { id, text, pending },
      changeStateButton = <input type="checkbox" />,
      removeButton = <button className={styles.RemoveTodo}>x</button>,
      onUpdateTodo,
      onRemoveTodo,
    } = this.props;

    const { confirmingRemove } = this.state;

    const handleChange = () => onUpdateTodo(id, !pending);
    const handleRemove = () => {
      this.setState({ confirmingRemove: true });
    };

    const handleAcceptRemove = () => {
      onRemoveTodo(id);
    };

    const handleCancelRemove = () => {
      this.setState({ confirmingRemove: false });
    };

    return (
      <>
        <Confirm
          visible={confirmingRemove}
          message={`Quieres borrar "${text}"`}
          onAccept={handleAcceptRemove}
          onCancel={handleCancelRemove}
        />
        <div className={styles.Todo}>
          <span className={cn({ [styles.Todo___done]: !pending })}>{text}</span>
          <span>
            {cloneElement(changeStateButton, { checked: !pending, onChange: handleChange })}
            {cloneElement(removeButton, { onClick: handleRemove })}
          </span>
        </div>
      </>
    );
  }
}

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
