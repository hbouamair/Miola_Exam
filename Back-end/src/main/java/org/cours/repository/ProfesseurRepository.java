package org.cours.repository;

import org.cours.model.Professeur;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
//@RepositoryRestResource
public interface ProfesseurRepository extends JpaRepository<Professeur,Long> {
    Professeur findByNom(@Param("nom") String nom);
    List<Professeur> findByPrenom(@Param("prenom") String prenom);

}