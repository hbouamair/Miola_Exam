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
    	Salle s1=salleRepository.findByNom(v.getSalleNom());
    	SalleExam se1=new SalleExam();
    	Examen exam=new Examen();
    	exam.setCours(cours);
    	exam.setDateExam(v.getDateExam());
    	exam.setSallesExamen(new ArrayList<SalleExam>());
    	se1.setSalle(s1);
    	examenRepository.save(exam);
    	se1.setExamen(exam);
    	salleExamRepository.save(se1);
    	exam.getSallesExamen().add(se1);

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
    	Salle s1=salleRepository.findByNom(v.getSalleNom());
    	//System.out.println(s1);
    	//salleExamRepository.deleteByExamen(v1);
    	//System.out.println(i);
    	SalleExam se1=new SalleExam();
    	v1.setDateExam(v.getDateExam());
    	v1.setCours(c1);
    	se1.setSalle(s1);
    	se1.setExamen(v1);
    	examenRepository.save(v1);
    	se1.setExamen(v1);
    	v1.getSallesExamen().add(se1);
    	salleExamRepository.save(se1);
        //v1.setCours(v.getCours());
        return examenRepository.save(v1);
    }
    

    @DeleteMapping("/examens/{id}")
    void deleteExamenById(@PathVariable Long id){
    	Examen exam=examenRepository.findById(id).orElse(null);
    	//System.out.println(exam);
    	examenRepository.deleteById(id);
    	//System.out.println(exam.getId());
    }
}
