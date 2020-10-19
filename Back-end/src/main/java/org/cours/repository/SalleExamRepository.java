package org.cours.repository;

import org.cours.model.Examen;
import org.cours.model.Salle;
import org.cours.model.SalleExam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import javax.transaction.Transactional;
//@RepositoryRestResource
public interface SalleExamRepository extends JpaRepository<SalleExam,Long> {
   // List<SalleExam> findByDate(@Param("Date") Short date);
	SalleExam findBySalle(@Param("Salle") Salle salle);
	@Transactional
	void deleteByExamen(Examen examen);
	@Transactional
	void deleteBySalle(Salle salle);
	List<SalleExam> findByExamen(@Param("Examen") Examen examen);
}