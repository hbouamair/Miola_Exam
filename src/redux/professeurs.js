import * as ActionTypes from './ActionTypes';

export const Professeurs = (state ={
        errMess : null,
        professeurs: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROFESSEURS:
            return {...state, isLoading:false, errMess: null, professeurs : action.payload}

        case ActionTypes.PROFESSEURS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, professeurs : []}

        case ActionTypes.ADD_PROFESSEUR:
            var professeur = action.payload;
            return {...state, professeurs: state.professeurs.concat(professeur)}

        default:
          return state;
      }
};