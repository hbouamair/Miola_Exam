import * as ActionTypes from './ActionTypes';

export const Resultats = (state ={
        errMess : null,
        resultats: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_RESULTATS:
            return {...state, isLoading:false, errMess: null, resultats : action.payload}

        case ActionTypes.RESULTATS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, resultats : []}

        case ActionTypes.ADD_RESULTAT:
            var resultat = action.payload;
            return {...state, resultats: state.resultats.concat(resultat)}

        default:
          return state;
      }
};