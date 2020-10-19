package org.cours.controller;

import org.cours.model.Cours;
import org.cours.model.Examen;
import org.cours.model.ExamenDTO;
import org.cours.model.Salle;
import org.cours.model.SalleExam;
import org.cours.repository.CoursRepository;
import org.cours.repository.ExamenRepository;
import org.cours.repository.SalleExamRepository;
import org.cours.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
public class ExamenController {
	@Autowired
    ExamenRepository examenRepository;
	@Autowired
    CoursRepository coursRepository;
	@Autowired
    SalleExamRepository salleExamRepository;
	@Autowired
    SalleRepository salleRepository;

    @GetMapping("/examens")
    Iterable<Examen> getAllExamen(){
        return examenRepository.findAll();
    }

    @PostMapping("/examens")
    Examen addExamen(@RequestBody Examen v){
        return examenRepository.save(v);

    }
    
    @PostMapping(value="/examens", headers="action=post-exam-with-cours-id")
    Examen addExamenWithCoursId(@RequestBody ExamenDTO v){
    	Cours cours=coursRepository.findById(v.getCoursId()).orElse(null);
    	Examen exam=new Examen();
    	exam.setCours(cours);
    	exam.setDateExam(v.getDateExam());
        return examenRepository.save(exam);
    }
    @PostMapping(value="/examens", headers="action=post-exam-with-cours-nom")
    Examen addExamenWithCoursNom(@RequestBody ExamenDTO v){
    	Cours cours=coursRepository.findByNom(v.getCoursNom());
    	//System.out.println(v.getSallesNoms());
    	List<Salle> salles= new ArrayList<Salle>();
    	for (int i=0;i<v.getSallesNoms().size();i++) {
    		salles.add(salleRepository.findByNom(v.getSallesNoms().get(i)));
    	}
    	//Salle s1=salleRepository.findByNom(v.getSalleNom());
    	List<SalleExam> se=new ArrayList<SalleExam>();
    	Examen exam=new Examen();
    	exam.setCours(cours);
    	exam.setDateExam(v.getDateExam());
    	exam.setSallesExamen(se);
    	for (int i=0;i<salles.size();i++) {
    		se.add(new SalleExam());
    		se.get(i).setSalle(salles.get(i));
    	}
    	List<Examen> exams = new ArrayList<Examen>();
    	exams.add(exam);
    	//se1.setSalle(s1);
    	examenRepository.save(exam);
    	for (int i=0;i<se.size();i++) {
    		se.get(i).setExamen(exams);
    	}
    	//System.out.println(exam.getSallesExamen().get(1).getSalle())
    	salleExamRepository.saveAll(se);
    	//exam.getSallesExamen().addAll(se);
        return examenRepository.save(exam);

    }

    @GetMapping("/examens/{id}")
    Examen getExamenById(@PathVariable Long id){
        return examenRepository.findById(id).orElse(null);
    }
    /*@GetMapping("/examens/{nom}")
    Examen getResultatById(@PathVariale String nom){
        return examenRepository.findByNomCours(nom);
    }*/

    /*@PutMapping("/examens/{id}")
    Examen editExamenById(@PathVariable Long id,@RequestBody Examen v){
    	Examen v1 = examenRepository.findById(id).orElse(null);
        //v1.setCours(v.getCours());
        return examenRepository.save(v1);
    }*/
    @PutMapping(value="/examens/{id}")
    Examen editExamenById(@PathVariable Long id,@RequestBody Examen v){
    	
    	Examen v1 = examenRepository.findById(id).orElse(null);
    	v1.setDateExam(v.getDateExam());
        //v1.setCours(v.getCours());
        return examenRepository.save(v1);
    }
    
    @PutMapping(value="/examens/{id}", headers="action=put-exam-with-cours-salle-date")
    Examen editAllExamenById(@PathVariable Long id,@RequestBody ExamenDTO v){
    	Examen v1 = examenRepository.findById(id).orElse(null);
    	Cours c1=coursRepository.findByNom(v.getCoursNom());
    	
    	List<Salle> salles= new ArrayList<Salle>();
    	for (int i=0;i<v.getSallesNoms().size();i++) {
    		salles.add(salleRepository.findByNom(v.getSallesNoms().get(i)));
    		//System.out.println(salles.get(i).getNom());
    	}
    	
    	List<SalleExam> lse=new ArrayList<SalleExam>();
    	
    	for(int i=0;i<v1.getSallesExamen().size();i++) {
    		salleExamRepository.deleteById(v1.getSallesExamen().get(i).getId());
    	}
    	salleExamRepository.findByExamen(v1).clear();
    	
    	//List<SalleExam> lser=salleExamRepository.findByExamen(v1);
    	
    	
    	
    	/*for (int i=salles.size();i<lser.size();i++) {
    		lser.remove(i);
    	}*/
    	
    	//v1.getSallesExamen().clear();
    	for (int i=0;i<salles.size();i++) {
    		lse.add(new SalleExam());
    		//System.out.println("lser size" + lser.size() + "salles size" + salles.size() + " i" + i);
    		lse.get(i).setSalle(salles.get(i));
    		//System.out.println(lser.get(i).getSalle().getNom())
    	}
    	//examenRepository.save(v1);
    	List<Examen> exams = new ArrayList<Examen>();
    	exams.add(v1);
    	for (int i=0;i<lse.size();i++) {
    		lse.get(i).setExamen(exams);
    	}
    	
    	salleExamRepository.saveAll(lse);
    	
    	//System.out.println(v1.getSallesExamen());
    	System.out.println(lse.get(0).getSalle().getNom());
    	v1.setSallesExamen(lse);	 	
    	v1.setDateExam(v.getDateExam());
    	v1.setCours(c1);
    	//se1.setSalle(s1);
        //v1.setCours(v.getCours());
    	//System.out.println(lser);
        return examenRepository.save(v1);
    }
    

    @DeleteMapping("/examens/{id}")
    void deleteExamenById(@PathVariable Long id){
    	Examen exam=examenRepository.findById(id).orElse(null);
    	/*List<SalleExam> lse=salleExamRepository.findByExamen(exam);
    	for (int i=0;i<lse.size();i++) 
    		salleExamRepository.deleteById(lse.get(i).getId());
    	}*/
    	salleExamRepository.deleteByExamen(exam);
    	//System.out.println(exam);
    	examenRepository.deleteById(id);
    	//System.out.println(exam.getId());
    }
}
