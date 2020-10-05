package org.cours.controller;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.cours.model.Cours;
import org.cours.model.CoursDTO;
import org.cours.model.Examen;
import org.cours.model.Professeur;
import org.cours.repository.CoursRepository;
import org.cours.repository.ExamenRepository;
import org.cours.repository.ProfesseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CoursController {
	@Autowired
    CoursRepository coursRepository;
	@Autowired
    ProfesseurRepository professeurRepository;
	@Autowired
	ExamenRepository examenRepository;
	@PersistenceContext
	EntityManager entityManager;

    @GetMapping(value="/courses")
    Iterable<Cours> getAllResultat(){
		/*Cours cours = new Cours();
    	for (long i=1;i<coursRepository.count();i++) {
    		cours=coursRepository.getOne(i);
    		System.out.println(cours.getProfesseur().getNom());
    	}*/
    	//System.out.println(coursRepository.findById((long)4).get().getProfesseur().getNom());
    	//System.out.println(coursRepository.findById((long)1).get().getExamen().getDateExam());
        return coursRepository.findAll();
    }

    private boolean checkProf(Professeur prof) {
    	if (professeurRepository.findByNom(prof.getNom())==null)
    	return false;
    	else return true;
    }
    
    @PostMapping(value="/courses", headers="action=add-cours")
    Cours addCours(@RequestBody(required=true) Cours v){
    	//System.out.println(v.getNom());
    	Professeur professeur = new Professeur();
    	professeur=v.getProfesseur();
    	System.out.println(checkProf(professeur));
    	Cours cours=new Cours();
    	cours.setNom(v.getNom());
    	if (checkProf(professeur)==true) {
    		//professeur=professeurRepository.findByNom(v.getProfesseur().getNom());
    		//professeurRepository.save(professeur);
    		cours.setProfesseur(professeurRepository.findByNom(v.getProfesseur().getNom()));
    	}
    	else {
        	cours.setProfesseur(v.getProfesseur());
    	}
    	professeurRepository.save(cours.getProfesseur());

    	//cours.setExamen(v.getExamen());
    	//cours.setId(v.getId());
    	
    	//System.out.println(professeur);
    	//entityManager.persist(cours);
    	
        return coursRepository.save(cours);
    }
    
//another add cours with nomcours and id professor
    @PostMapping(value="/courses", headers="action=add-cours-with-prof-id")
    Cours addCoursWithProfId(@RequestBody CoursDTO coursdto){
    	//System.out.println(coursdto.getNom()+" "+coursdto.getProfesseurId());
    	Professeur professeur = new Professeur();
    	professeur=professeurRepository.findById(coursdto.getProfesseurId()).orElse(null);
    	Cours cours=new Cours();
    	cours.setNom(coursdto.getNom());
    	cours.setProfesseur(professeur);
    	professeurRepository.save(professeur);
        return coursRepository.save(cours);
    }
    @PostMapping(value="/courses", headers="action=add-cours-with-prof-nom")
    Cours addCoursWithProfNom(@RequestBody CoursDTO coursdto){
    	//System.out.println(coursdto.getNom()+" "+coursdto.getProfesseurId());
    	Professeur professeur = new Professeur();
    	professeur=professeurRepository.findByNom(coursdto.getProfesseurNom());
    	Cours cours=new Cours();
    	cours.setNom(coursdto.getNom());
    	cours.setProfesseur(professeur);
    	professeurRepository.save(professeur);
        return coursRepository.save(cours);
    }
    
    @GetMapping("/courses/{id}")
    Cours getCoursById(@PathVariable Long id){
        return coursRepository.findById(id).orElse(null);
    }
    
    @GetMapping("/courses/{id}/professeur")
    Professeur getProfesseurByCoursId(@PathVariable Long id){
        return coursRepository.findById(id).get().getProfesseur();
    }

    @PutMapping(value="/courses/{id}",headers="action=put-cours-with-prof-no-exam")
    Cours editCoursById(@PathVariable Long id,@RequestBody Cours c){
    	Cours c1 = coursRepository.findById(id).orElse(null);
        c1.setNom(c.getNom());
        
        
        Professeur professeur = new Professeur();
    	professeur=c.getProfesseur();
        if (checkProf(professeur)==true) {
    		//professeur=professeurRepository.findByNom(v.getProfesseur().getNom());
    		//professeurRepository.save(professeur);
    		c1.setProfesseur(professeurRepository.findByNom(professeur.getNom()));
    	}
    	else {
    		professeur.setNom(c.getProfesseur().getNom());
        	professeur.setPrenom(c.getProfesseur().getPrenom());
        	professeurRepository.save(professeur);
        	c1.setProfesseur(professeur);
    	}
         	
    	System.out.println(professeur.getNom());
    	
    	//professeurRepository.save(professeur);
        //c1.setProfesseur(professeur);
        return coursRepository.save(c1);
        //maybe add examen too
    }
    /*@PutMapping(value="/courses/{id}",headers="action=put-cours-with-prof-and-exam")
    Cours editCoursByIdWithExam(@PathVariable Long id,@RequestBody Cours c){
    	Cours c1 = coursRepository.findById(id).orElse(null);
        c1.setNom(c.getNom());
        Professeur professeur = new Professeur();
    	professeur=c.getProfesseur();
        if (checkProf(professeur)==true) {
    		c1.setProfesseur(professeurRepository.findByNom(professeur.getNom()));
    	}
    	else {
    		professeur.setNom(c.getProfesseur().getNom());
        	professeur.setPrenom(c.getProfesseur().getPrenom());
        	professeurRepository.save(professeur);
        	c1.setProfesseur(professeur);
    	}    	
    	//System.out.println(professeur.getNom());
    	
    	//examen
    	//Examen examen=c.getExamen();
    	//c1.getExamen().setDateExam(c.getExamen().getDateExam());;
        return coursRepository.save(c1);
        //maybe add examen too
    }*/
    @PutMapping(value="/courses/{id}", headers="action=put-nom-only")
    Cours editCoursByIdNomOnly(@PathVariable Long id,@RequestBody CoursDTO c){
    	Cours c1 = coursRepository.findById(id).orElse(null);
        c1.setNom(c.getNom());
    	//c1.getExamen().setDateExam(c.getExamen().getDateExam());;
        return coursRepository.save(c1);
        //maybe add examen too
    }
    @PutMapping(value="/courses/{id}", headers="action=put-nom-prof")
    Cours editCoursByIdNomProf(@PathVariable Long id,@RequestBody CoursDTO c){
    	Cours c1 = coursRepository.findById(id).orElse(null);
        c1.setNom(c.getNom());
        c1.setProfesseur(professeurRepository.findByNom(c.getProfesseurNom()));
    	//c1.getExamen().setDateExam(c.getExamen().getDateExam());;
        return coursRepository.save(c1);
        //maybe add examen too
    }

    @DeleteMapping("/courses/{id}")
    void deleteCoursById(@PathVariable Long id){
    	coursRepository.deleteById(id);
    }
}