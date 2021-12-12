import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MovieList.css'

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);


    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'GET_GENRES' });
    }, []);

    const addMovie = () =>{
        history.push('/addMovie')
    }

    const imageClick = (movie)=>{
        dispatch({
            type: 'SET_MOVIE_DETAILS',
            payload:movie 
        });
        dispatch({
            type: 'SET_MOVIE_GENRE',
            payload: movie
        });

        history.push('/details')
    };

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={addMovie}>Add a Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={()=>{imageClick(movie)}} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;