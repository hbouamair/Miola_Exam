import * as ActionTypes from './ActionTypes';

export const Salles = (state ={
        errMess : null,
        salles: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SALLES:
            return {...state, isLoading:false, errMess: null, salles : action.payload}

        case ActionTypes.SALLES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, salles : []}

        case ActionTypes.ADD_SALLE:
            var salle = action.payload;
            return {...state, salles: state.salles.concat(salle)}

        default:
          return state;
      }
};