package org.cours.repository;

import org.cours.model.Cours;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource
public interface CoursRepository extends JpaRepository<Cours,Long> {
    //List<Cours> findByIdProf(@Param("idProf") String idProf);
    Cours findByNom(@Param("nom") String nom);

}