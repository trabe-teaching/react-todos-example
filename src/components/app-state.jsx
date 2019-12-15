import React, { Component, createContext } from "react";

const initialTodos = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(
        Array.from(Array(2), (_, i) => ({
          id: i,
          text: `Todo ${i}`,
          pending: true,
        })),
      );
    }, 2000),
  );

const count = predicate => array => array.filter(predicate).length;
const not = pred => (...args) => !pred(...args);
const pendingTodo = todo => todo.pending;
const doneTodo = not(pendingTodo);
const countPendingTodos = count(pendingTodo);
const countDoneTodos = count(doneTodo);

const StateContext = createContext({});

class AppState extends Component {
  state = {
    loading: true,
    todos: [],
  };

  addTodo = todo => {
    this.setState(prevState => ({
      todos: [{ id: new Date().getTime(), ...todo }, ...prevState.todos],
    }));
  };

  updateTodo = (id, pending) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (todo.id === id ? { ...todo, pending } : todo)),
    }));
  };

  removeTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  getCounters = () => ({
    pending: countPendingTodos(this.state.todos),
    done: countDoneTodos(this.state.todos),
  });

  componentDidMount() {
    initialTodos().then(todos => this.setState({ loading: false, todos }));
  }

  render() {
    const api = {
      loading: this.state.loading,
      todos: this.state.todos,
      counters: this.getCounters(),
      addTodo: this.addTodo,
      updateTodo: this.updateTodo,
      removeTodo: this.removeTodo,
    };

    return <StateContext.Provider value={api}>{this.props.children}</StateContext.Provider>;
  }
}

export const WithState = ({ children }) => <StateContext.Consumer>{api => children(api)}</StateContext.Consumer>;

export const withState = Comp => {
  const Wrapper = props => <WithState>{api => <Comp {...api} {...props} />}</WithState>;
  Wrapper.displayName = `WithState(${Comp.name || Comp.displayName})`;
  return Wrapper;
};

export default AppState;
