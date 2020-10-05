package org.cours.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class SalleDTO {

    @NonNull
    private String nom;
    
    
    private Short nbPlaces;

    
}
