package org.cours.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Etudiant {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    @NonNull
    private String nom;
    
    @NonNull
    private String prenom;

    @OneToMany(mappedBy="etudiant")
    
    private List<CoursSuivi> courssuivi;

    /*@OneToOne(cascade = CascadeType.ALL,mappedBy = "etudiant")
    @JsonIgnore
    private Resultat resultat;*/


}
