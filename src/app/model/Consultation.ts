import { Acte } from './Acte';
import { Patient } from './Patient';
import { Medecin } from './Medecin';
export class Consultation {
    id: number;
    date: Date;
    note: String;
    deplacement: boolean;
    validationMedecin: boolean;
    dureeConsultation:number;
    medecin: Medecin;
    patient: Patient;
    prixTTC: number;


    // TODO Vérifier les champs
}
