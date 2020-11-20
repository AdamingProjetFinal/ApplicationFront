import { Patient } from './Patient';
import { Medecin } from './Medecin';
export class Consultation {
    id: number;
    date: Date;
    note: String;
    deplacement: boolean;
    validationMedecin: boolean;

    medecin: Medecin;
    patient: Patient;
    // TODO
    acts: number;
}
