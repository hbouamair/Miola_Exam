package org.cours.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class ResultatDTO {

    
    @NonNull
    private Short note;
    
    
    private Long coursSuiviId;
    
    private Short noteFinale;
    
    private Boolean rattrapage;
	
    private String nomCours;
    
    private String nomEtudiant;
    
    private String prenomEtudiant;
    
    
    //private Long etudiantId;

}
