import React, { Component, createRef } from "react";
import styles from "./todo-form.module.css";
import { withState } from "./app-state";
import { alert } from "./alert";

class TodoForm extends Component {
  state = {
    task: "",
    pending: true,
  };

  taskRef = createRef();

  handleTaskChange = e => {
    this.setState({
      task: e.target.value,
    });
  };

  handlePendingChange = () => {
    this.setState(prevState => ({
      pending: !prevState.pending,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.task === "") {
      alert("Cannot add empty todo").then(() => this.taskRef.current.focus());
    } else {
      this.props.addTodo({ text: this.state.task, pending: this.state.pending });
      this.setState({
        task: "",
        pending: true,
      });
      this.taskRef.current.focus();
    }
  };

  componentDidMount() {
    this.taskRef.current.focus();
  }

  render() {
    const { task, pending } = this.state;
    return (
      <form className={styles.TodoForm}>
        <input ref={this.taskRef} type="text" value={task} placeholder="Task" onChange={this.handleTaskChange} />
        <label>
          <input type="checkbox" checked={!pending} onChange={this.handlePendingChange} /> done
        </label>
        <button className={styles.AddTodoButton} onClick={this.handleSubmit}>
          Add
        </button>
      </form>
    );
  }
}

export default withState(TodoForm);
