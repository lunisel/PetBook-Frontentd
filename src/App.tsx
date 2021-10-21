import React from "react";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Login from "./components/login/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/login"
          exact
          render={(routerProps: RouteComponentProps) => (
            <Login {...routerProps} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
