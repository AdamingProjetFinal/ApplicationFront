import { Patient } from './Patient';
export class FicheMedicale {
    id: number;
    nom: String;
    date: Date;
    antecedents: String;
    observations: String;
    patient: Patient;
}
