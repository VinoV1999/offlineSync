import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to the Home Page</h1>
      <p className="hint">
        <span className="highlight">Hint:</span> Before trying the form submission, make sure to turn off your internet or cut off the network tab in the inspector tool. This will simulate an offline scenario for the form.
      </p>
      <div className="buttons-container">
        <button className="button">
          <Link to="/form" className="link">Go to Form</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
