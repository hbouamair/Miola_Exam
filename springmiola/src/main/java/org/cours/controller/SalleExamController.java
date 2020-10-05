package org.cours.controller;

import org.cours.model.Cours;
import org.cours.model.Examen;
import org.cours.model.Salle;
import org.cours.model.SalleExam;
import org.cours.model.SalleExamDTO;
import org.cours.repository.CoursRepository;
import org.cours.repository.ExamenRepository;
import org.cours.repository.ResultatRepository;
import org.cours.repository.SalleExamRepository;
import org.cours.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SalleExamController {

    @Autowired
    SalleExamRepository salleExamRepository;
	@Autowired
    ExamenRepository examenRepository;
	@Autowired
    SalleRepository salleRepository;
	@Autowired
    CoursRepository coursRepository;
	
    @GetMapping("/salleExams")
    Iterable<SalleExam> getAllSallesExam(){
        return salleExamRepository.findAll();
    }

    @PostMapping("/salleExams")
    SalleExam addSalleExam(@RequestBody SalleExam v){
        return salleExamRepository.save(v);
    }
    
    @PostMapping(value="/salleExams", headers="action=put-salle-exam-with-ids")
    SalleExam addSalleExamWithIds(@RequestBody SalleExamDTO v){
    	Examen examen=examenRepository.findById(v.getExamenId()).orElse(null);
    	Salle salle= salleRepository.findById(v.getSalleId()).orElse(null);
    	SalleExam salleExam= new SalleExam();
    	salleExam.setExamen(examen);
    	salleExam.setSalle(salle);
        return salleExamRepository.save(salleExam);
    }
    /*@PostMapping(value="/salleExams", headers="action=put-salle-exam-with-salle-id-nom-cours")
    SalleExam addSalleExamWithIdAndNom(@RequestBody SalleExamDTO v){
    	Cours cours=coursRepository.findByNom(v.getNomCours());
    	Examen examen=examenRepository.findByCours(cours);
    	Salle salle= salleRepository.findById(v.getSalleId()).orElse(null);
    	SalleExam salleExam= new SalleExam();
    	salleExam.setExamen(examen);
    	salleExam.setSalle(salle);
        return salleExamRepository.save(salleExam);
    }*/

    @GetMapping("/salleExams/{id}")
    SalleExam getSalleExamById(@PathVariable Long id){
        return salleExamRepository.findById(id).orElse(null);
    }

    @PutMapping("/salleExams/{id}")
    SalleExam editSalleExamById(@PathVariable Long id,@RequestBody SalleExamDTO v){
    	SalleExam v1 = salleExamRepository.findById(id).orElse(null);
    	Examen examen=examenRepository.findById(v.getExamenId()).orElse(null);
    	Salle salle= salleRepository.findById(v.getSalleId()).orElse(null);
    	v1.setExamen(examen);
    	v1.setSalle(salle);
        return salleExamRepository.save(v1);
    }

    @DeleteMapping("/salleExams/{id}")
    void deleteSalleExam(@PathVariable Long id){
    	salleExamRepository.deleteById(id);
    }
}
