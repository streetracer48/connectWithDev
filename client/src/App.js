import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Navbar.jsx";
import Landing from "./layout/Landing.jsx";
import Footer from "./layout/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
