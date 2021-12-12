import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { generatePath } from 'react-router-dom/cjs/react-router-dom.min';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('ADD_MOVIE', addNewMovie)
    yield takeEvery('GET_GENRES', getGenres)
    yield takeEvery('GET_MOVIES_GENRES', getMovieGenre)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}
//Creating a Saga to GET genres from the DB
function* getGenres(action){
    try{
        const response = yield axios.get('/api/genre');
        console.log('get all genres:', response.data);
        
        yield put({
            type:'SET_GENRES',
            payload: response.data
        })
    }catch (err){
        console.log('in GET Genres', err);
    }
}
// Creating a Saga function to post movies from the AddMovie inputs
function* addNewMovie(action){
    try{
        console.log('in addNewMovie', action.payload);
        const response = yield axios.post({
            method: 'POST',
            url: '/api/movie',
            data: action.payload
        })
        yield put ({
            type: 'FETCH_MOVIES'
        })
        }catch(err){
            console.log('in POST error', err);
        }
    }

// Adding a saga for the get route with the joining of DB for movies and genres
function* getMovieGenre (action){
    try{
        console.log('in getMovieGenre', action.payload.id);
        const response = yield axios.get ({
            method: 'GET',
            url: `/api/movie/${action.payload}`
        })
        yield put({
            type: 'SET_MOVIE_GENRE',
            payload: response.data
        })
        console.log('response.data', response.data);
        
    }catch(err){
        console.log('In GET movie and genre error', err)
    }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie details
const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
const movieGenreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genresReducer,
        detailsReducer, 
        movieGenreReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
