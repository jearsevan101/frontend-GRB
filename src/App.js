import React, {Fragment} from "react";
import "./App.css";


//components
import InputQuery from "./components/query";
import InputBook from "./components/inputBook";
import ListBook from "./components/listBook";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputBook />
        <ListBook />
        <InputQuery />
      </div>
    </Fragment>
  );
}

export default App;
