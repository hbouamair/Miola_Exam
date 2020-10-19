package org.cours.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Examen {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    @NonNull
    private String dateExam;
    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cours_id")
    @NonNull
    @JsonIgnoreProperties({"cours","examen"})
    //@JsonBackReference
    private Cours cours;
    
    @ManyToMany(mappedBy="examen")
    @JsonIgnoreProperties({"examen"})
   // @JsonBackReference
	public List<SalleExam> sallesExamen;
    
    
    /*@OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;*/
    


}
