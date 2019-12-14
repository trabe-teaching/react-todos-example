import React from "react";
import AppState from "./app-state";
import Theme from "./theme";
import Page from "./page";
import Header from "./header";
import Content from "./content";
import TodoList from "./todo-list";

const App = () => (
  <AppState>
    {({ todos, counters, addTodo, updateTodo, removeTodo }) => (
      <Theme>
        <Page title="Awesome todos!">
          <Header counters={counters} onAddTodo={addTodo} />
          <Content>
            <TodoList todos={todos} onUpdateTodo={updateTodo} onRemoveTodo={removeTodo} />
          </Content>
        </Page>
      </Theme>
    )}
  </AppState>
);

export default App;
