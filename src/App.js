import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import MyBoard from "./components/MyBoard";
import LoginPage from "./components/LoginPage";
import Community from "./components/Community";
import AddArticle from './components/AddArticle';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/add-article' component={AddArticle} />
          <Route exact path="/" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/myboard" component={MyBoard} />
          <PrivateRoute path="/community" component={Community} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
