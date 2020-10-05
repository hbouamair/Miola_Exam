package org.cours.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Professeur {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    @NonNull
    private String nom;
    
    @NonNull
    private String prenom;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy="professeur",orphanRemoval=true)
    @JsonIgnoreProperties({"professeur","examen"})
    private List<Cours> cours;
    
    
   /* public void addCours(Cours courss) {
    	cours.add(courss);
    	courss.setProfesseur(this);
    }
    public void removeCours(Cours courss) {
    	cours.remove(courss);
    	courss.setProfesseur(null);
    }*/
 



}
