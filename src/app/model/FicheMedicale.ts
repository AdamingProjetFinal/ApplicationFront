import { Patient } from './Patient';
export class FicheMedicale {
    id: number;
    nom: string;
    date: Date;
    antecedents: String;
    observations: String;
    patient: Patient;
}
