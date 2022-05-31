import React, { useEffect, useRef, useState } from 'react';


interface HackerRankSearchResult{
  data:Movie[],
  page:number,
  per_page:number,
  total:number,
  total_pages:number
}

interface Movie{
  title:string;
  year:number;
  imdbID:string
}

async function loadMoviePage(page:number):Promise<HackerRankSearchResult>{
  let result = await fetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${page}`);
  let json: HackerRankSearchResult = await result.json() as HackerRankSearchResult; // assume consistent well formed data
  return json;
}


function App() {


  let [page,setPage] = useState(1);
  let loadingRef = useRef(false); // ref to get stop react.strict double loading in dev mode
  let [movies,setMovies] = useState<Movie[]|null>(null)
  


  
  async function load(){
    if(!loadingRef.current){
      console.log("loading");
      loadingRef.current = true;
      let result = await loadMoviePage(page);
      let movies:Movie[] = result.data;
      console.log(movies);
      setMovies(movies);
      loadingRef.current = false;
    }
  }

  useEffect( () => {
    load();
  },[]);

  return (
    <div className="App">
      hello world
    </div>
  );
}



export default App;
