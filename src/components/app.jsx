import React from "react";
import AppState from "./app-state";
import Theme from "./theme";
import Page from "./page";
import Header from "./header";
import Content from "./content";
import TodoList from "./todo-list";
import ErrorBoundary from "./error-boundary";

const App = () => (
  <ErrorBoundary>
    <AppState>
      <Theme>
        <Page title="Awesome todos!">
          <Header />
          <Content>
            <TodoList />
          </Content>
        </Page>
      </Theme>
    </AppState>
  </ErrorBoundary>
);

export default App;
