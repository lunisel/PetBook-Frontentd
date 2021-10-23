import React from "react";
import { BrowserRouter, Route, RouteComponentProps } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/registration/Signup"
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
        <Route
          path="/signup"
          exact
          render={(routerProps: RouteComponentProps) => (
            <Signup {...routerProps} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
