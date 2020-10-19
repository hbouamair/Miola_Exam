package org.cours.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude="salle")
public class SalleExam {
	
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;
    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "salle_id")
    @JsonIgnoreProperties("salleExamen")
    @NonNull
	private Salle salle;
	
    @ManyToMany(cascade = CascadeType.MERGE)
    @JsonIgnoreProperties("salleExamen")
    @NonNull
    private List<Examen> examen;
    
    




}
