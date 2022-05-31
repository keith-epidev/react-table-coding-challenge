import React, { useEffect, useRef, useState } from 'react';
import { Movie, MovieAPI } from './API';
import { useMovieAPI } from './useAPI';
import './MovieTable.css';

interface MovieTableI{

}


export function MovieTable(props:MovieTableI) {


    const movieAPI = useMovieAPI();
    const loadingRef = useRef(false); // ref to get stop react.strict double loading in dev mode
    
    async function load(){
      if(!loadingRef.current){
        loadingRef.current = true;
        console.log("loading");
        await movieAPI.load();
        console.log("init load",movieAPI.result)
        loadingRef.current = false;
      }
    }
  
    useEffect( () => {
      load();
    },[]);
  
    const styles:{[name:string]:React.CSSProperties} = {
        content:{
            opacity:movieAPI.loading?0.5:1
        }
    }



    if(movieAPI.result != null){
 
  
    return (
      <div className="MovieTable">
      
       
     <table className="content" style={styles.content} >
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Title</th>
                    <th>IMDB ID</th>
                </tr>
            </thead>
            <tbody>
                {movieAPI.result.data.map( movie => <tr key={movie.imdbID}>
                    <td>{movie.Year}</td>
                    <td>{movie.Title}</td>
                    <td>{movie.imdbID}</td>
            </tr> )}
            </tbody>
        </table>

  
            <div className="controls">
                <button onClick={() => movieAPI.firstPage()} >First</button> 
                <button onClick={() => movieAPI.prevPage()} >Previous</button> 
                <div className="pageDetails">{movieAPI.result.page} / {movieAPI.result.total_pages}</div>
                <button onClick={() => movieAPI.nextPage()} >Next</button>
                <button onClick={() => movieAPI.lastPage()} >Last</button>
            </div>


        <div className="loadingMessage">
            {movieAPI.loading?"Loading":""}
        </div>
      </div>
    );

    }else{
        return null;
    }

  }
  





