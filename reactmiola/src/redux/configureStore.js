import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Salles} from './salles';
import {Etudiants} from './etudiants';
import {Professeurs} from './professeurs';
import {Courses} from './courses';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            salles: Salles,
            etudiants: Etudiants,
            professeurs: Professeurs,
            courses: Courses,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}