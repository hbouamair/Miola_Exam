import * as ActionTypes from './ActionTypes';

export const Etudiants = (state ={
        errMess : null,
        etudiants: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ETUDIANTS:
            return {...state, isLoading:false, errMess: null, etudiants : action.payload}

        case ActionTypes.ETUDIANTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, etudiants : []}

        case ActionTypes.ADD_ETUDIANT:
            var etudiant = action.payload;
            return {...state, etudiants: state.etudiants.concat(etudiant)}

        default:
          return state;
      }
};