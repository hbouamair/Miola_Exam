import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';



export const postSalle = (nom,nbPlaces) => (dispatch) =>{

    const newSalle = {
        nom: nom,
        nbPlaces: nbPlaces
    }
    newSalle.salleExamen=null;

    return fetch(baseUrl+'salles',{
        method: 'POST',
        body: JSON.stringify(newSalle),
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addSalle(response)))
        .catch(error => {console.log('Post Salle');alert('Your salle could not be posted\n '+error.message)})
}

export const fetchSalles = () => (dispatch) => {
    
    return fetch(baseUrl + 'salles')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(salles => dispatch(addSalles(salles)))
        .catch(error => dispatch(sallesFailed(error.message)));
}
export const addSalle = (salle) => ({
    type: ActionTypes.ADD_SALLE,
    payload: salle
});
export const addSalles = (salles) => ({
    type: ActionTypes.ADD_SALLES,
    payload: salles
});
export const sallesFailed = (errmess) => ({
    type: ActionTypes.SALLES_FAILED,
    payload: errmess
});



export const postEtudiant = (nom,prenom,courses) => (dispatch) =>{

    //console.log(courses);
    const newEtudiant = {
        nom: nom,
        prenom: prenom,
        coursNoms:courses
    }
    console.log(JSON.stringify(newEtudiant));

    return fetch(baseUrl+'etudiants',{
        method: 'POST',
        body: JSON.stringify(newEtudiant),
        headers: {
            'Content-Type': 'application/json',
            'Action' : 'post-etud-cours'
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addEtudiant(response)))
        .catch(error => {console.log('Post etudiant');alert('Your etuydiant could not be posted\n '+error.message)})
}

export const fetchEtudiants = () => (dispatch) => {
    
    return fetch(baseUrl + 'etudiants')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(etudiants => dispatch(addEtudiants(etudiants)))
        .catch(error => dispatch(etudiantsFailed(error.message)));
}
export const addEtudiant = (etudiant) => ({
    type: ActionTypes.ADD_ETUDIANT,
    payload: etudiant
});
export const addEtudiants = (etudiants) => ({
    type: ActionTypes.ADD_ETUDIANTS,
    payload: etudiants
});
export const etudiantsFailed = (errmess) => ({
    type: ActionTypes.ETUDIANTS_FAILED,
    payload: errmess
});


export const postProfesseur = (nom,prenom) => (dispatch) =>{

    const newProfesseur = {
        nom: nom,
        prenom: prenom
    }

    return fetch(baseUrl+'professeurs',{
        method: 'POST',
        body: JSON.stringify(newProfesseur),
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addProfesseur(response)))
        .catch(error => {console.log('Post professeur');alert('Your PROFESSEUR could not be posted\n '+error.message)})
}

export const fetchProfesseurs = () => (dispatch) => {
    
    return fetch(baseUrl + 'professeurs')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(professeurs => dispatch(addProfesseurs(professeurs)))
        .catch(error => dispatch(professeursFailed(error.message)));
}
export const addProfesseur = (professeur) => ({
    type: ActionTypes.ADD_PROFESSEUR,
    payload: professeur
});
export const addProfesseurs = (professeurs) => ({
    type: ActionTypes.ADD_PROFESSEURS,
    payload: professeurs
});
export const professeursFailed = (errmess) => ({
    type: ActionTypes.PROFESSEURS_FAILED,
    payload: errmess
});


export const postCours = (nom,professeurNom) => (dispatch) =>{

    const newCours = {
        nom: nom,
        professeurNom: professeurNom
    }

    return fetch(baseUrl+'courses',{
        method: 'POST',
        body: JSON.stringify(newCours),
        headers: {
            'Content-Type': 'application/json',
            'Action' : 'add-cours-with-prof-nom',
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addCours(response)))
        .catch(error => {console.log('Post cours');alert('Your COURS could not be posted\n '+error.message)})
}

export const fetchCourses = () => (dispatch) => {
    
    return fetch(baseUrl + 'courses')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(courses => dispatch(addCourses(courses)))
        .catch(error => dispatch(coursesFailed(error.message)));
}
export const addCours = (cours) => ({
    type: ActionTypes.ADD_COURS,
    payload: cours
});
export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
});
export const coursesFailed = (errmess) => ({
    type: ActionTypes.COURSES_FAILED,
    payload: errmess
});


export const postExam = (date,coursNom,sallesNoms) => (dispatch) =>{

    const newExam = {
        dateExam: date,
        coursNom: coursNom,
        sallesNoms: sallesNoms
    }
    console.log(JSON.stringify(newExam));

    return fetch(baseUrl+'examens',{
        method: 'POST',
        body: JSON.stringify(newExam),
        headers: {
            'Content-Type': 'application/json',
            'Action' : 'post-exam-with-cours-nom',
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addExam(response)))
        .then(alert("Exam ajouté avec succès. Confirmez pour actualiser"))
        .catch(error => {console.log('Post exam'+error.message);alert('Your EXAM could not be posted\n '+error.message)})
}

export const fetchExams = () => (dispatch) => {
    
    return fetch(baseUrl + 'examens')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(exams => dispatch(addExams(exams)))
        .catch(error => dispatch(examsFailed(error.message)));
}
export const addExam = (exam) => ({
    type: ActionTypes.ADD_EXAM,
    payload: exam
});
export const addExams = (exams) => ({
    type: ActionTypes.ADD_EXAMS,
    payload: exams
});
export const examsFailed = (errmess) => ({
    type: ActionTypes.EXAMS_FAILED,
    payload: errmess
});


export const postResultats = (note,nomCo,nom,prenom) => (dispatch) =>{
    console.log(nomCo+note+nom+prenom+" ");

    const newResultat = {
        note:note, nomCours:nomCo, nomEtudiant:nom, prenomEtudiant:prenom

    }
    console.log(nomCo+note+nom+prenom+" ");
    return fetch(baseUrl+'resultats',{
        method: 'POST',
        body: JSON.stringify(newResultat),
        headers: {
            'Content-Type': 'application/json',
            'action':'post-result-no-ids'
        },

    })
        .then(response =>{
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response=response;;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addResultat(response)))
        .catch(error => {console.log('Post resultat');alert('Your RESULTAT could not be posted\n '+error.message)})
}

export const fetchResultats = () => (dispatch) => {
    
    return fetch(baseUrl + 'resultats')
    .then(response =>{
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response=response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(resultats => dispatch(addResultats(resultats)))
        .catch(error => dispatch(resultatsFailed(error.message)));
}
export const addResultat = (resultat) => ({
    type: ActionTypes.ADD_RESULTAT,
    payload: resultat
});
export const addResultats = (resultats) => ({
    type: ActionTypes.ADD_RESULTATS,
    payload: resultats
});
export const resultatsFailed = (errmess) => ({
    type: ActionTypes.RESULTATS_FAILED,
    payload: errmess
});