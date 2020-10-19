package org.cours.repository;

import org.cours.model.Cours;
import org.cours.model.CoursSuivi;
import org.cours.model.Etudiant;
import org.cours.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import javax.transaction.Transactional;
//@RepositoryRestResource
public interface CoursSuiviRepository extends JpaRepository<CoursSuivi,Long> {
    //List<CoursSuivi> findByIdEtudiant(@Param("idEtudiant") Long idEtudiant);
    //List<CoursSuivi> findByIdCours(@Param("idCours") Long idCours);
    List<CoursSuivi> findBynoteFinale(@Param("noteFinale") Short noteFinale);
    List<CoursSuivi> findByRattrapage(@Param("rattrapage") Boolean noteFinale);
    CoursSuivi findByCoursAndEtudiant(Cours cours, Etudiant etudiant);
    CoursSuivi findByEtudiant(Etudiant etudiant);
    @Transactional
	void deleteByEtudiant(Etudiant etudiant);


}