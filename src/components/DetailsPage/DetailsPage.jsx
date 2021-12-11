import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function DetailsPage(){
    const detailsReducer = useSelector((store)=> store.detailsReducer)
    const history = useHistory();

    const handelBackClick = ()=>{
        history.push('/');
    }
    return (
        <div>
            <h4>Title: {detailsReducer.title}</h4>
            <img src ={detailsReducer.poster}/>
            <h4>Description: {detailsReducer.description}</h4>
            <button onClick={handelBackClick}>Back to the Movie Page</button>


        </div>
    )
}
export default DetailsPage;