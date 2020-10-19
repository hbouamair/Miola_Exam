package org.cours.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class CoursSuivi {
	@Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
	
    private Short noteFinale;
    
    
    private Boolean rattrapage;
	
    
    @ManyToOne
    @JoinColumn(name="etudiant_id", nullable=true)
    @NonNull
    @JsonIgnoreProperties("courssuivi")
    private Etudiant etudiant;
	
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cours_id")
    @NonNull
    private Cours cours;
    
    @OneToOne(mappedBy = "coursSuivi")
    @JsonIgnoreProperties("coursSuivi")
    private Resultat resultat;


}
