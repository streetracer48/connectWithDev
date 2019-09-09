import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./layout/Navbar.jsx";
import Landing from "./layout/Landing.jsx";
import Footer from "./layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./layout/Alert";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
  store.dispatch(loadUser());
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </section>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
