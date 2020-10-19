package org.cours.controller;

import org.cours.model.Professeur;
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
public class ProfesseurController {
	@Autowired
    ProfesseurRepository professeurRepository;

    @GetMapping("/professeurs")
    Iterable<Professeur> getAllProfesseurs(){
        return professeurRepository.findAll();
    }

    @PostMapping("/professeurs")
    Professeur addProfesseur(@RequestBody Professeur v){
        return professeurRepository.save(v);

    }

    @GetMapping("/professeurs/{id}")
    Professeur getResultatById(@PathVariable Long id){
        return professeurRepository.findById(id).orElse(null);
    }
    /*@GetMapping("/professeurs/{nom}")
    Professeur getResultatById(@PathVariable String nom){
        return professeurRepository.findByNomCours(nom);
    }*/

    @PutMapping("/professeurs/{id}")
    Professeur editProfesseurById(@PathVariable Long id,@RequestBody Professeur v){
    	Professeur v1 = professeurRepository.findById(id).orElse(null);
    	v1.setNom(v.getNom());
    	v1.setPrenom(v.getPrenom());
        return professeurRepository.save(v1);
    }

    @DeleteMapping("/professeurs/{id}")
    void deleteProfesseur(@PathVariable Long id){
    	professeurRepository.deleteById(id);
    }
}


