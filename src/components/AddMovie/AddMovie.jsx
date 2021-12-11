import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function AddMovie (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    //setting local state
    const[title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genres, setGenres] = useState('');

    //grabbing the genre reducer
    const genresReducer = useSelector((store) => store.genresReducer)

    const handleAddMovie = ()=>{
        console.log('in AddMovie');
        dispatch({
            type: 'ADD_MOVIE',
            payload:{
                title:title,
                poster:poster, 
                description:description, 
                genres:genres
            }
        })
    }
    function chooseCategory(event) {
        event.preventDefault();
        setGenres(event.target.value);
    };
    const backToMoviePage = ()=>{
        history.push('/')
    }

    return (
        <div>
            <input type='text' placeholder='Movie Title'
            value={title} onChange={(event) => setTitle(event.target.value)}/>
            <input type='text' placeholder='Movie poster url' 
            value={poster} onChange={(event) => setPoster(event.target.value)}/>
            <textarea type='text' placeholder='Add Description'
            value={description} onChange={(event) => setDescription(event.target.value)}/>
            <select value={genres}onChange={chooseCategory}>
                <option value="Adventure">Adventure</option>
                <option value="Animated">Animated</option>
                <option value="Biographical">Biographical</option>
                <option value="Comedy">Comedy</option>
                <option value="Disaster">Disaster</option>
                <option value="Drama">Drama</option>
                <option value="Epic">Epic</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Musical">Musical</option>
                <option value="Romantic">Romantic</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Space-Opera">Space-Opera</option>
                <option value="Superhero">Superhero</option>
            </select>
            
            <button onClick={handleAddMovie}>Add a Movie</button>
            <div>
                <button>Cancel Add Movie</button>
                <button onClick={backToMoviePage}>Back to Movie Page</button>
            </div>


        </div>
    )
}

export default AddMovie;