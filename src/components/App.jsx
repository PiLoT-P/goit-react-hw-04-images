import {useState } from "react";

import PhotoPage from "./PhotoPage/PhotoPage";
import Searchbar from "./Searchbar/Searchbar";

import "../index.css";
import css from "./App.module.css";

const App = () =>{
  const [queryText, setQueryText] = useState('');

  const changeQuery = (query) => {
    setQueryText(query);
  }
  return (
    <div className={css.app}>
      <Searchbar onSubmit={changeQuery} />
      <PhotoPage queryText={queryText} />
    </div>
  );
};

export default App; 