import React from "react";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/registration/Signup";
import Home from "./components/home/Home";
import "./App.css";
import { useSelector } from "react-redux";
import { reduxStateInt, userInt } from "./utils/interfaces";

function App() {
  const user: userInt | null = useSelector(
    (state: reduxStateInt) => state.user.currentUser
  );

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
        <Route exact path="/">
          {user ? (
            <Route
              exact
              path="/"
              render={(routerProps: RouteComponentProps) => (
                <Home {...routerProps} />
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
