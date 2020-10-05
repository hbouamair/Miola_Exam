package org.cours.repository;
import org.cours.model.Cours;
import org.cours.model.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import lombok.NonNull;

import java.util.List;
//@RepositoryRestResource

public interface ExamenRepository extends JpaRepository<Examen,Long> {

	
  //List<Examen> findByIdCours(@Param("idCours") Long idCours);
  //Examen findByNomCours(@Param("nomCours") String nomCours);
  Examen findByCours(@Param("cours") Cours cours);

}