package org.cours.controller;

import org.cours.model.Cours;
import org.cours.model.CoursSuivi;
import org.cours.model.CoursSuiviDTO;
import org.cours.model.Etudiant;
import org.cours.model.Professeur;
import org.cours.repository.CoursRepository;
import org.cours.repository.CoursSuiviRepository;
import org.cours.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.NonNull;

@CrossOrigin
@RestController
public class CoursSuiviController {
	@Autowired
    CoursSuiviRepository coursSuiviRepository;
	@Autowired
    CoursRepository coursRepository;
	@Autowired
    EtudiantRepository etudiantRepository;
	
    @GetMapping("/coursSuivis")
    Iterable<CoursSuivi> getAllCoursSuivis(){
        return coursSuiviRepository.findAll();
    }

    @PostMapping("/coursSuivis")
    CoursSuivi addCoursSuivi(@RequestBody CoursSuivi v){
        return coursSuiviRepository.save(v);

    }
    
    private void setRattrapage(CoursSuivi cs) {
    	if (cs.getNoteFinale()<10) cs.setRattrapage(true);cs.setRattrapage(false);
    }
    @PostMapping(value="/coursSuivis", headers="action=post-courssuivi-with-ids")
    CoursSuivi addCoursSuiviWithIds(@RequestBody CoursSuiviDTO v) {
    	Cours cours=coursRepository.findById(v.getCoursId()).orElse(null);
    	Etudiant etudiant = etudiantRepository.findById(v.getEtudiantId()).orElse(null);
    	CoursSuivi coursSuivi=new CoursSuivi();
    	coursSuivi.setCours(cours);
    	coursSuivi.setEtudiant(etudiant);
    	coursSuivi.setNoteFinale(v.getNoteFinale());
    	setRattrapage(coursSuivi);
    	/*if (v.getNoteFinale()>(long)10) coursSuivi.setRattrapage(false);
    	else coursSuivi.setRattrapage(true);*/
    	return coursSuiviRepository.save(coursSuivi);
    }
    
    @PostMapping(value="/coursSuivis", headers="action=post-courssuivi-with-ids-no-note")
    CoursSuivi addCoursSuiviWithIdsNoNote(@RequestBody CoursSuiviDTO v) {
    	Cours cours=coursRepository.findById(v.getCoursId()).orElse(null);
    	Etudiant etudiant = etudiantRepository.findById(v.getEtudiantId()).orElse(null);
    	CoursSuivi coursSuivi=new CoursSuivi();
    	coursSuivi.setCours(cours);
    	coursSuivi.setEtudiant(etudiant);
    	coursSuivi.setNoteFinale(v.getNoteFinale());
    	return coursSuiviRepository.save(coursSuivi);
    }
    
    
    Etudiant getEtudiantByNomPrenom(String nom, String prenom) {
    	Etudiant etud = new Etudiant();
    	//if (etudiantRepository.findByNom(nom)!=null && etudiantRepository.findByNom(prenom)!=null)
    	for (long i=1;i<etudiantRepository.count();i++) {
    		if (etudiantRepository.findById(i).get().getNom()==nom && etudiantRepository.findById(i).get().getPrenom()==prenom) {
    			etud=etudiantRepository.findById(i).orElse(null);
    		}
    	}
    	
    	return etud;
    }
    
    @PostMapping(value="/coursSuivis", headers="action=post-courssuivi-with-noms-no-note")
    CoursSuivi addCoursSuiviWithNoms(@RequestBody CoursSuiviDTO v) {
    	Cours cours=coursRepository.findByNom(v.getNomCours());
    	Etudiant etudiant = new Etudiant();
    	etudiant=etudiantRepository.findByNomAndPrenom(v.getNomEtudiant(), v.getPrenomEtudiant());
    	CoursSuivi coursSuivi=new CoursSuivi();
    	coursSuivi.setCours(cours);
    	coursSuivi.setEtudiant(etudiant);
    	return coursSuiviRepository.save(coursSuivi);
    }
    @PostMapping(value="/coursSuivis", headers="action=post-courssuivi-with-noms-and-note")
    CoursSuivi addCoursSuiviWithNomsAndNote(@RequestBody CoursSuiviDTO v) {
    	Cours cours=coursRepository.findByNom(v.getNomCours());
    	Etudiant etudiant = new Etudiant();
    	etudiant=etudiantRepository.findByNomAndPrenom(v.getNomEtudiant(), v.getPrenomEtudiant());
    	CoursSuivi coursSuivi=new CoursSuivi();
    	coursSuivi.setCours(cours);
    	coursSuivi.setEtudiant(etudiant);
    	coursSuivi.setNoteFinale(v.getNoteFinale());
    	setRattrapage(coursSuivi);
    	return coursSuiviRepository.save(coursSuivi);
    }
    @PutMapping(value="/coursSuivis/{id}")
    CoursSuivi editCoursSuiviById(@PathVariable Long id,@RequestBody CoursSuivi cv){
    	CoursSuivi cv1 = coursSuiviRepository.findById(id).orElse(null);
        cv1.setNoteFinale(cv.getNoteFinale());
        if (cv1.getNoteFinale()>=10) cv1.setRattrapage(false);
    	else cv1.setRattrapage(true);
        return coursSuiviRepository.save(cv1);
        //maybe add examen too
    }

    @GetMapping("/coursSuivis/{id}")
    CoursSuivi getCoursSuiviById(@PathVariable Long id){
        return coursSuiviRepository.findById(id).orElse(null);
    }

    /*@PutMapping("/coursSuivis/{id}")
    CoursSuivi editCoursSuiviById(@PathVariable Long id,@RequestBody CoursSuivi v){
    	CoursSuivi v1 = coursSuiviRepository.findById(id).orElse(null);
    	//v1.setEtudiant(v.getEtudiant());
        v1.setNoteFinale(v.getNoteFinale());
        v1.setRattrapage(v.getRattrapage());
        return coursSuiviRepository.save(v1);
    }*/

    @DeleteMapping("/coursSuivis/{id}")
    void deleteCoursSuivi(@PathVariable Long id){
    	coursSuiviRepository.deleteById(id);
    }
}
