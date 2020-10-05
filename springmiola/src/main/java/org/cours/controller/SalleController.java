package org.cours.controller;

import org.cours.model.Salle;
import org.cours.model.SalleDTO;
import org.cours.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class SalleController {

    @Autowired
    SalleRepository salleRepository;

    @GetMapping("/salles")
    Iterable<Salle> getAllSalles(){
        return salleRepository.findAll();
    }

    @PostMapping("/salles")
    Salle addSalle(@RequestBody Salle v){
        return salleRepository.save(v);
    }
    @PostMapping(value="/salles",headers="action=post-salle-with-nom-nbplace")
    Salle addSalleNomPlaces(@RequestBody SalleDTO v){
    	Salle salle=new Salle();
    	salle.setNom(v.getNom());
    	salle.setNbPlaces(v.getNbPlaces());
    	salle.setSalleExamen(null);
        return salleRepository.save(salle);
    }

    @GetMapping(value="/salles/{id}",headers="action=getbyid")
    Salle getSalleById(@PathVariable Long id){
        return salleRepository.findById(id).orElse(null);
    }
    @GetMapping("/salles/{nom}")
    Salle getSalleByNom(@PathVariable String nom){
        return salleRepository.findByNom(nom);
    }

    @PutMapping(value="/salles/{id}")
    Salle editSalleById(@PathVariable Long id,@RequestBody Salle v){
    	Salle v1 = salleRepository.findById(id).orElse(null);
        v1.setNom(v.getNom());
        v1.setNbPlaces(v.getNbPlaces());
        return salleRepository.save(v1);
    }
    /*@PutMapping("/salles/{nom}")
    Salle editSalleByNom(@PathVariable String nom,@RequestBody Salle v){
    	Salle v1 = salleRepository.findByNom(nom);
        v1.setNom(v.getNom());
        v1.setNbPlaces(v.getNbPlaces());
        return salleRepository.save(v1);
    }*/

    @DeleteMapping("/salles/{id}")
    void deleteSalle(@PathVariable Long id){
        salleRepository.deleteById(id);
    }
}
