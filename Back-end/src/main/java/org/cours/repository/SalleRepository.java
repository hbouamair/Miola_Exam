package org.cours.repository;

import org.cours.model.Salle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
//@RepositoryRestResource
public interface SalleRepository extends JpaRepository<Salle,Long> {
    List<Salle> findByNbPlaces(@Param("Places") Short places);
    Salle findByNom(@Param("Nom") String nom);
    
}