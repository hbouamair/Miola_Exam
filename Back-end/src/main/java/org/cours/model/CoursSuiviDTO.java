package org.cours.model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class CoursSuiviDTO {
	@Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
	
	
    private Short noteFinale;
    
    private Boolean rattrapage;
	
    @NonNull
    private Long coursId;
    
    @NonNull
    private Long etudiantId;
    
    private String nomCours;
    
    private String nomEtudiant;
    
    private String prenomEtudiant;
    
    //private Etudiant etudiant;
    


}
