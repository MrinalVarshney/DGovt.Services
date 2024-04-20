import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/signup";
import ContractInteraction from "./Contract_Instances/Instances";
import Storage from "./fileUploader/fileUploadComponent";
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" Component={ContractInteraction} /> */}
        <Route path="/storage" Component={Storage} />
      </Routes>
    </div>
  );
};

export default App;
