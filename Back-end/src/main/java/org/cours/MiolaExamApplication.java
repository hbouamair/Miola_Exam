package org.cours;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.cours.model.Cours;
import org.cours.model.CoursSuivi;
import org.cours.model.Etudiant;
import org.cours.model.Examen;
import org.cours.model.Professeur;
import org.cours.model.Resultat;
import org.cours.model.Salle;
import org.cours.model.SalleExam;
import org.cours.repository.ProfesseurRepository;
import org.cours.repository.ResultatRepository;
import org.cours.repository.SalleExamRepository;
import org.cours.repository.CoursRepository;
import org.cours.repository.CoursSuiviRepository;
import org.cours.repository.EtudiantRepository;
import org.cours.repository.ExamenRepository;
import org.cours.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"org.cours"})
public class MiolaExamApplication {
	@Autowired
	private EtudiantRepository EtudiantRepository;
	@Autowired
	private ProfesseurRepository professeurRepository;
	@Autowired
	private SalleRepository salleRepository;
	@Autowired
	private CoursRepository coursRepository;
	@Autowired
	private ExamenRepository examenRepository;
	@Autowired
	private ResultatRepository resultatRepository;
	@Autowired
	private CoursSuiviRepository coursSuiviRepository;
	@Autowired
	private SalleExamRepository salleExamRepository;

	
	public static void main(String[] args) {
		SpringApplication.run(MiolaExamApplication.class, args);

	}
	@Bean
	CommandLineRunner runner(){
		return args -> {
			Etudiant etudiant1 = new Etudiant("Ali" , "Hassan");
			Etudiant etudiant2 = new Etudiant("Najat" , "Bani");
			EtudiantRepository.save(etudiant1);
			EtudiantRepository.save(etudiant2);
			Professeur professeur1= new Professeur("Toyota",  "Corolla");
			Professeur professeur2= new Professeur("FIAT",  "PALIO");
			Professeur professeur3= new Professeur("Honda",  "CRV");
			professeurRepository.save(professeur1);
			professeurRepository.save(professeur2);
			professeurRepository.save(professeur3);
			List<Salle> salles = new ArrayList<>();
			Salle salle1=new Salle("A24",(short) 20);
			Salle salle2=new Salle("B8",(short) 10);
			salleRepository.save(salle1);
			salleRepository.save(salle2);
			salleRepository.save(new Salle("A36",(short) 25));
			/*Cours cours1=new Cours("Android");
			Cours cours2=new Cours("uml");
			Cours cours3=new Cours("java");*/
			Cours cours1=new Cours("Android",professeur1);
			Cours cours2=new Cours("UML",professeur1);
			Cours cours3=new Cours("JAVA",professeur2);
			coursRepository.save(cours1);
			coursRepository.save(cours2);
			coursRepository.save(cours3);
			CoursSuivi coursSu=new CoursSuivi(etudiant1,cours1);
			CoursSuivi coursSu2=new CoursSuivi(etudiant2,cours1);

			Examen exam1=new Examen("Tue Oct 14 2020 00:00:00 GMT+0100 (UTC+01:00)",cours1);
			List<Examen> exams = new ArrayList<Examen>();
			exams.add(exam1);
			
			SalleExam salleEx= new SalleExam(salle1,exams);
			SalleExam salleEx2= new SalleExam(salle2,exams);

			
			Resultat resultat1=new Resultat((short)17,coursSu);
			coursSu.setNoteFinale(resultat1.getNote());
			coursSuiviRepository.save(coursSu);
			coursSuiviRepository.save(coursSu2);
			examenRepository.save(exam1);
			salleExamRepository.save(salleEx);
			salleExamRepository.save(salleEx2);
			//Resultat resultat2=new Resultat(17,etudiant2,exam1);
			resultatRepository.save(resultat1);
			//resultatRepository.save(resultat2);
			/*professeur1.addCours(cours1);
			professeur1.addCours(cours2);
			professeur1.addCours(cours3);*/
			//entityManager.persist(professeur1);
		};
	}

}
