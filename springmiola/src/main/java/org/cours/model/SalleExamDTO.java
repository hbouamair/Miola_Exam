package org.cours.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class SalleExamDTO {

	
    @NonNull
    private Long examenId;
    
    @NonNull
    private Long salleId;
    
    private String nomCours;

}
