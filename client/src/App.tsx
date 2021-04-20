import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

export interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
