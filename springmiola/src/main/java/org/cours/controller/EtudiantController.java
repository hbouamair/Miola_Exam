package org.cours.controller;

import org.cours.model.Etudiant;
import org.cours.repository.EtudiantRepository;
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
public class EtudiantController {
    @Autowired
    EtudiantRepository etudiantRepository;

    @GetMapping("/etudiants")
    Iterable<Etudiant> getAllEtudiants(){
        return etudiantRepository.findAll();
    }

    @PostMapping("/etudiants")
    Etudiant addEtudiant(@RequestBody Etudiant v){
        return etudiantRepository.save(v);
    }

    @GetMapping("/etudiants/{id}")
    Etudiant geEtudiantById(@PathVariable Long id){
        return etudiantRepository.findById(id).orElse(null);
    }

    @PutMapping("/etudiants/{id}")
    Etudiant editEtudiantById(@PathVariable Long id,@RequestBody Etudiant v){
    	Etudiant v1 = etudiantRepository.findById(id).orElse(null);
        v1.setNom(v.getNom());
        v1.setPrenom(v.getPrenom());
        return etudiantRepository.save(v1);
    }

    @DeleteMapping("/etudiants/{id}")
    void deleteEtudiant(@PathVariable Long id){
        etudiantRepository.deleteById(id);
    }
}
