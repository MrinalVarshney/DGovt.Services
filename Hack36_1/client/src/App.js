import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/signup";
import ContractInteraction from "./Contract_Instances/Instances";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" Component={ContractInteraction} />
      </Routes>
    </div>
  );
};

export default App;
