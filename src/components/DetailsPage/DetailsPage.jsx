import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';


function DetailsPage(){
    const detailsReducer = useSelector((store)=> store.detailsReducer)
    const genresReducer = useSelector((store) => store.genresReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    // const dispatch = useDispatch()
    const {id} = useParams();
;
useEffect(()=>{
    dispatch({ 
    type: 'GET_MOVIES_GENRES', 
    payload: { id: id }
})
}, []);

    console.log('detailsReducer', detailsReducer);
    console.log('genresReducer', genresReducer);
    const handelBackClick = ()=>{
        history.push('/');
    }
    return (
        <div>
            <h4>Title: {detailsReducer.title}</h4>
            <img src ={detailsReducer.poster}/>
            <h4>Description: {detailsReducer.description}</h4>
            <h4>Genres</h4>
            {genresReducer.map(genre => (
                <div key={genre.id}>
                    {genre.name}
                </div>
            ))}

            <button onClick={handelBackClick}>Back to the Movie Page</button>
        </div>
    )
}
export default DetailsPage;