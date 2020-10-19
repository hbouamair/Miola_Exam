import * as ActionTypes from './ActionTypes';

export const Exams = (state ={
        errMess : null,
        exams: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXAMS:
            return {...state, isLoading:false, errMess: null, exams : action.payload}

        case ActionTypes.EXAMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, exams : []}

        case ActionTypes.ADD_EXAM:
            var exam = action.payload;
            return {...state, exams: state.exams.concat(exam)}

        default:
          return state;
      }
};