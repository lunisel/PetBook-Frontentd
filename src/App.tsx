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
import Feed from "./components/feed/Feed"
import MePage from "./components/profile/MeProfile"
import Notes from "./components/notes/Notes"
import Messages from "./components/messages/Messages"
import "./App.css";
import { useSelector } from "react-redux";
import { reduxStateInt, userInt } from "./utils/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <Route exact path="/feed">
          {user ? (
            <Route
              exact
              path="/feed"
              render={(routerProps: RouteComponentProps) => (
                <Feed {...routerProps} />
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/me">
          {user ? (
            <Route
              exact
              path="/me"
              render={(routerProps: RouteComponentProps) => (
                <MePage {...routerProps} />
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/notes">
          {user ? (
            <Route
              exact
              path="/notes"
              render={(routerProps: RouteComponentProps) => (
                <Notes {...routerProps} />
              )}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/messages">
          {user ? (
            <Route
              exact
              path="/messages"
              render={(routerProps: RouteComponentProps) => (
                <Messages {...routerProps} />
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
