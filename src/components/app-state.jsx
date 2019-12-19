import React, { createContext, useReducer, useEffect, useContext } from "react";
import useEffectError from "../hooks/use-effect-error";

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

const getCounters = todos => ({
  pending: countPendingTodos(todos),
  done: countDoneTodos(todos),
});

const StateContext = createContext({});

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TODOS":
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [{ id: new Date().getTime(), ...action.todo }, ...state.todos],
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.id ? { ...todo, pending: action.pending } : todo)),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
};

const appInitialState = {
  loading: true,
  todos: [],
};

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appInitialState);
  const throwEffectError = useEffectError();

  useEffect(() => {
    initialTodos()
      .then(todos => dispatch({ type: "LOAD_TODOS", todos }))
      .catch(throwEffectError);
  }, [throwEffectError]);

  const addTodo = todo => dispatch({ type: "ADD_TODO", todo });
  const updateTodo = (id, pending) => dispatch({ type: "UPDATE_TODO", id, pending });
  const removeTodo = id => dispatch({ type: "REMOVE_TODO", id });

  const api = {
    loading: state.loading,
    todos: state.todos,
    counters: getCounters(state.todos),
    addTodo,
    updateTodo,
    removeTodo,
  };

  return <StateContext.Provider value={api}>{children}</StateContext.Provider>;
};

export const WithState = ({ children }) => <StateContext.Consumer>{api => children(api)}</StateContext.Consumer>;

export const withState = Comp => {
  const Wrapper = props => <WithState>{api => <Comp {...api} {...props} />}</WithState>;
  Wrapper.displayName = `WithState(${Comp.name || Comp.displayName})`;
  return Wrapper;
};

export const useAppState = () => useContext(StateContext);

export default AppState;
