import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function AddMovie (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    //setting local state
    const[title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genre_id, setGenre_id] = useState(0);

    //grabbing the genre reducer
    const genresReducer = useSelector((store) => store.genresReducer)

    useEffect(()=>{
        dispatch({
            type: 'GET_GENRES'
        })
    }, []);

    const handleAddMovie = ()=>{
        console.log('in AddMovie');
        dispatch({
            type: 'ADD_MOVIE',
            payload:{
                title:title,
                poster:poster, 
                description:description, 
                genre_id: genre_id
            }
        })
    }
    function chooseCategory(event) {
        event.preventDefault();
        setGenre_id(event.target.value);
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
            {/* Trying the drop down that was seen in our pets repo */}
            <select value={genre_id}onChange={chooseCategory}>
                <option disabled value='0'>Select Genre</option>
                {genresReducer.map((genre) => {
                    return <option key={genre.id} value={genre.id}>{genre.name}</option>
                })}
            </select>
            <button onClick={handleAddMovie}>Add a Movie</button>
            <div>
                <button onClick={backToMoviePage}>Cancel Movie/Back to Movie Page</button>
            </div>


        </div>
    )
}

export default AddMovie;