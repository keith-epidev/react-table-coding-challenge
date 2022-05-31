import React, { useEffect, useRef, useState } from 'react';
import { MovieTable } from './MovieTable';
import "./App.css"


function App() {

  const styles:{[key:string]:React.CSSProperties} = {
    title:{
      textAlign:"center"
    }
  }

  return (
    <div className="App">  
    <div className="body">
      <h1 className={"title"}>Movie Search App</h1>
      <MovieTable />
      </div>
    </div>
  );
}



export default App;
