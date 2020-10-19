package org.cours.controller;

import java.util.ArrayList;
import java.util.List;

import org.cours.model.Cours;
import org.cours.model.CoursSuivi;
import org.cours.model.Etudiant;
import org.cours.model.EtudiantDTO;
import org.cours.repository.CoursRepository;
import org.cours.repository.CoursSuiviRepository;
import org.cours.repository.EtudiantRepository;
import org.cours.repository.ResultatRepository;
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
	@Autowired
    CoursRepository coursRepository;
	@Autowired
    CoursSuiviRepository coursSuiviRepository;
	@Autowired
    ResultatRepository resultatRepository;
	
    @GetMapping("/etudiants")
    Iterable<Etudiant> getAllEtudiants(){
        return etudiantRepository.findAll();
    }

    @PostMapping("/etudiants")
    Etudiant addEtudiant(@RequestBody Etudiant v){
        return etudiantRepository.save(v);
    }
    
    @PostMapping(value="/etudiants",headers="action=post-etud-cours")
    Etudiant addEtudiantWithCours(@RequestBody EtudiantDTO v){
    	System.out.println("test");
    	Etudiant etud=new Etudiant();
    	etud.setNom(v.getNom());
    	etud.setPrenom(v.getPrenom());
    	List<CoursSuivi> courssuivi = new ArrayList<CoursSuivi>();
    	List<Cours> courses = new ArrayList<Cours>();
    	etudiantRepository.save(etud);
    	for (int i=0;i<v.getCoursNoms().size();i++) {
    		courses.add(coursRepository.findByNom(v.getCoursNoms().get(i)));
    	}
    	
    	for (int i=0;i<courses.size();i++) {
    		courssuivi.add(new CoursSuivi());
    		courssuivi.get(i).setCours(courses.get(i));
    		courssuivi.get(i).setEtudiant(etud);
    	}
    	
    	coursSuiviRepository.saveAll(courssuivi);
    	etud.setCourssuivi(courssuivi);
        return etudiantRepository.save(etud);
    }
    
    boolean isThereCours(List<CoursSuivi> liste,String nomCours) {
    	for (int i=0;i<liste.size();i++) {
    		System.out.println(liste.get(i).getCours().getNom()+" "+nomCours +i);
    		if (liste.get(i).getCours().getNom().equals(nomCours)) return true;
    	}
    	return false;
    }
    
    boolean isThereCours2(Etudiant e,List<Cours> liste2) {
    	for (int i=0;i<liste2.size();i++) {
    		for (int j=0;j<e.getCourssuivi().size();j++) {
    			if(liste2.get(i).getNom().equals(e.getCourssuivi().get(j).getCours().getNom())) {
    				return true;
    			}
    		}
    	}
    	return false;
    }
    
    @PutMapping(value="/etudiants/{id}",headers="action=put-etud-cours")
    Etudiant editEtudiantByIdWithCours(@PathVariable Long id,@RequestBody EtudiantDTO v){
    	System.out.println("test");
    	Etudiant v1 = etudiantRepository.findById(id).orElse(null);
        v1.setNom(v.getNom());
        v1.setPrenom(v.getPrenom());
        
        List<CoursSuivi> courssuivi = new ArrayList<CoursSuivi>();
        List<Cours> coursInEtudiant = new ArrayList<Cours>();
    	List<Cours> courses = new ArrayList<Cours>();
    	
    	for(int i=0;i<v1.getCourssuivi().size();i++) {
    		
    		coursInEtudiant.add(v1.getCourssuivi().get(i).getCours());
    	}
    	
    	for (int i=0;i<v.getCoursNoms().size();i++) {
    		courses.add(coursRepository.findByNom(v.getCoursNoms().get(i)));
    	}
    	
    	for (int i=0;i<courses.size();i++) {
    		for (int j=0;j<v1.getCourssuivi().size();j++) {
    			//if(courses.get(i).getNom().equals(v1.getCourssuivi().get(j).getCours().getNom()))  {
    			if(!courses.contains(v1.getCourssuivi().get(j).getCours())) {
    				if(v1.getCourssuivi().get(j).getResultat()!=null)
    					resultatRepository.deleteById(v1.getCourssuivi().get(j).getResultat().getId());
    				coursSuiviRepository.deleteById(v1.getCourssuivi().get(j).getId());
    				v1.getCourssuivi().remove(j);
    				continue;
    			}
    			}
    			
    		if(!coursInEtudiant.contains(courses.get(i))) {
        		courssuivi.add(new CoursSuivi());
        		courssuivi.get(courssuivi.size()-1).setCours(courses.get(i));
        		courssuivi.get(courssuivi.size()-1).setEtudiant(v1);
        	}
    		
    		}
    	
    	
    	/*for (int i=0;i<v.getCoursNoms().size();i++) {
    		if(isThereCours(v1.getCourssuivi(),v.getCoursNoms().get(i))) {
    			System.out.println(i);
    			List<CoursSuivi> cv = new ArrayList<CoursSuivi>();
    			for(int j=0;j<courses.size();j++) {
    				System.out.println(i + " " + j);
    				//if(courses.get(j).getNom().equals(anObject))
    				cv.add(new CoursSuivi());
    	    		cv.get(j).setCours(courses.get(j));
    	    		cv.get(j).setEtudiant(v1);
    	    		//cv.get(j).setResultat(v1.getCourssuivi().get(i).getResultat());
    			}
        		
        		coursSuiviRepository.saveAll(cv);
    			v1.getCourssuivi().addAll(cv);
    		}
    		if(v.getCoursNoms().get(i)!=v1.getCourssuivi().get(i).getCours().getNom()) {
    			
    		}
            
    	}*/
    	
    	
    	/*for(int i=0;i<v1.getCourssuivi().size();i++) {
    		//System.out.println((v1.getCourssuivi().get(i).getResultat().getNote()));
    		if(v1.getCourssuivi().get(i).getResultat()!=null) {
    		resultatRepository.deleteById(v1.getCourssuivi().get(i).getResultat().getId());
    		coursSuiviRepository.deleteById(v1.getCourssuivi().get(i).getId());
    		}
    	}*/
    	
    	/*for (int i=0;i<courses.size();i++) {
    		courssuivi.add(new CoursSuivi());
    		courssuivi.get(i).setCours(courses.get(i));
    		courssuivi.get(i).setEtudiant(v1);
    		//if(v1.getCourssuivi().get(i).getCours().getNom().equals(courses.get(i).getNom()))
    		for (int j=0;j<v1.getCourssuivi().size();j++) {
    			//System.out.println(v1.getCourssuivi().get(j).getCours().getNom());
        		if (v1.getCourssuivi().get(j).getCours().getNom().equals(courses.get(i).getNom())) {
    			System.out.println(courssuivi.get(i).getCours().getNom()+ " " +v1.getCourssuivi().get(j).getCours().getNom() );
        		courssuivi.get(i).setResultat(v1.getCourssuivi().get(j).getResultat());
        		}
    		}

    	}*/
    	
    	coursSuiviRepository.saveAll(courssuivi);

    	v1.getCourssuivi().addAll(courssuivi);
        
        return etudiantRepository.save(v1);
    }

    @GetMapping("/etudiants/{id}")
    Etudiant geEtudiantById(@PathVariable Long id){
        return etudiantRepository.findById(id).orElse(null);
    }

    @PutMapping("/etudiants/{id}")
    Etudiant editEtudiantById(@PathVariable Long id,@RequestBody Etudiant v){
    	System.out.println("test");
    	Etudiant v1 = etudiantRepository.findById(id).orElse(null);
        v1.setNom(v.getNom());
        v1.setPrenom(v.getPrenom());
        return etudiantRepository.save(v1);
    }

    @DeleteMapping("/etudiants/{id}")
    void deleteEtudiant(@PathVariable Long id){
    	Etudiant etudiant=etudiantRepository.findById(id).orElse(null);
    	for (int i=0;i<etudiant.getCourssuivi().size();i++) {
    		if(etudiant.getCourssuivi().get(i).getResultat()!=null)
    		resultatRepository.deleteById(etudiant.getCourssuivi().get(i).getResultat().getId());
    	}
    	
    	coursSuiviRepository.deleteByEtudiant(etudiant);
        etudiantRepository.deleteById(id);
    }
}
