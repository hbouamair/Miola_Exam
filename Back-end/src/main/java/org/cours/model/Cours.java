package org.cours.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude="examen")
public class Cours {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    
    @NonNull
    private String nom;
    
    @Getter(AccessLevel.NONE)
    @ManyToOne
    @JoinColumn(name="professeur_id")
    @NonNull
    @JsonIgnoreProperties("cours")
    private Professeur professeur;
    
    
	public Professeur getProfesseur() {
    	return professeur;
    }
	
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cours")
    @JsonBackReference
	public List<CoursSuivi> coursSuivi;
    
    @OneToOne(mappedBy = "cours")
    @JsonIgnoreProperties({"cours"})
   // @JsonBackReference
	public Examen examen;


    
    
}
