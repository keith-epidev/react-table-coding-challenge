import { useState, useEffect, useReducer } from 'react';
import { Movie, MovieAPI } from './API';

export function useMovieAPI() {
    const [api, ] = useState(() => new MovieAPI());
    const [, forceUpdate] = useReducer(x => x + 1, 0);
  
    useEffect(() => {
        api.subscribe(forceUpdate);
      return () => {
        api.unsubscribe();
      };
    });
  
    return api;
  
}