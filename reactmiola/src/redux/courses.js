import * as ActionTypes from './ActionTypes';

export const Courses = (state ={
        errMess : null,
        courses: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COURSES:
            return {...state, isLoading:false, errMess: null, courses : action.payload}

        case ActionTypes.COURSES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, courses : []}

        case ActionTypes.ADD_COURS:
            var cours = action.payload;
            return {...state, courses: state.courses.concat(cours)}

        default:
          return state;
      }
};