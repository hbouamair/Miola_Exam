package org.cours.controller;

import org.cours.model.Cours;
import org.cours.model.CoursSuivi;
import org.cours.model.Etudiant;
import org.cours.model.Examen;
import org.cours.model.Professeur;
import org.cours.model.Resultat;
import org.cours.model.ResultatDTO;
import org.cours.repository.CoursRepository;
import org.cours.repository.CoursSuiviRepository;
import org.cours.repository.EtudiantRepository;
import org.cours.repository.ExamenRepository;
import org.cours.repository.ResultatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ResultatController {
	@Autowired
    ResultatRepository resultatRepository;
	@Autowired
    CoursSuiviRepository coursSuiviRepository;
	@Autowired
    CoursRepository coursRepository;
	@Autowired
    EtudiantRepository etudiantRepository;

    @GetMapping("/resultats")
    Iterable<Resultat> getAllResultat(){
        return resultatRepository.findAll();
    }

    @PostMapping("/resultats")
    Resultat addResultat(@RequestBody Resultat v){
        return resultatRepository.save(v);

    }
    private void setRattrapage(CoursSuivi cs) {
    	if (cs.getNoteFinale()<10) cs.setRattrapage(true);cs.setRattrapage(false);
    }
    @PostMapping(value="/resultats", headers="action=post-result-with-ids")
    Resultat addResultatWithIds(@RequestBody ResultatDTO resultatdto){
    	System.out.println(resultatdto);
    	CoursSuivi coursSuivi=coursSuiviRepository.findById(resultatdto.getCoursSuiviId()).orElse(null);
    	if (coursSuivi.getNoteFinale()==null || coursSuivi.getNoteFinale()<resultatdto.getNote()) coursSuivi.setNoteFinale(resultatdto.getNote());
    	setRattrapage(coursSuivi);
    	Resultat resultat= new Resultat();
    	resultat.setCoursSuivi(coursSuivi);
    	//resultat.setEtudiant(etudiant);
    	//resultat.setExamen(exam);
    	resultat.setNote(resultatdto.getNote());
        return resultatRepository.save(resultat);
    }

    /*@PostMapping(value="/resultats", headers="action=post-result-no-ids")
    Resultat addResultatNoIds(@RequestBody Resultat result){
    	Examen exam=new Examen();
    	Etudiant etudiant = new Etudiant();
    	//long idExam=result.getExamen().getCours().getId();
    	//System.out.println(idExam);
    	//exam=examenRepository.findByCours(result.getExamen().getCours());
    	//etudiant=etudiantRepository.findByPrenom(result.getEtudiant().getPrenom());
    	Resultat resultat= new Resultat();
    	//resultat.setEtudiant(etudiant);
    	//resultat.setExamen(exam);
    	resultat.setNote(result.getNote());
        return resultatRepository.save(resultat);
    }*/
    @PostMapping(value="/resultats", headers="action=post-result-no-ids")
    Resultat addResultatNoIds(@RequestBody ResultatDTO resultdto){
		Cours cours=coursRepository.findByNom(resultdto.getNomCours());
		Etudiant etudiant = new Etudiant();
		etudiant=etudiantRepository.findByNomAndPrenom(resultdto.getNomEtudiant(), resultdto.getPrenomEtudiant());
		CoursSuivi coursSuivi=coursSuiviRepository.findByCoursAndEtudiant(cours, etudiant);
		//coursSuivi.setCours(cours);
		//coursSuivi.setEtudiant(etudiant);
		//coursSuivi.setNoteFinale(resultdto.getNote());
    	if (coursSuivi.getNoteFinale()==null || coursSuivi.getNoteFinale()<resultdto.getNote()) coursSuivi.setNoteFinale(resultdto.getNote());
    	setRattrapage(coursSuivi);
		Resultat resultat= new Resultat();
		resultat.setCoursSuivi(coursSuivi);
		resultat.setNote(resultdto.getNote());
		return resultatRepository.save(resultat);
    }
    @GetMapping("/resultats/{id}")
    Resultat getResultatById(@PathVariable Long id){
        return resultatRepository.findById(id).orElse(null);
    }

    
    
    @PutMapping(value="/resultats/{id}")
    Resultat editResultatById(@PathVariable Long id,@RequestBody ResultatDTO r){
    	Resultat r1 = resultatRepository.findById(id).orElse(null);
    	r1.setNote(r.getNote());
    	if (r1.getCoursSuivi().getNoteFinale()==null || r1.getCoursSuivi().getNoteFinale()<r.getNote()) r1.getCoursSuivi().setNoteFinale(r.getNote());

        return resultatRepository.save(r1);
        
    }

    @DeleteMapping("/resultats/{id}")
    void deleteResultat(@PathVariable Long id){
    	resultatRepository.deleteById(id);
    }
}
