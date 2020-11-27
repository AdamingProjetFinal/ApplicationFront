import { Adresse } from './Adresse';
import { Patient } from './Patient';
import { Consultation } from './Consultation';
import { Specialite } from './Specialite';
export class Medecin {
    id:number;
    username:string;
    password:string;
    activated:boolean;
    nom:string;
    prenom:string;
    email:string;
    prixConsultation:number
    dateNaissance:Date;
    telephone:string;
    codePublic: string;
    adresse:Adresse;
    specialite: Specialite;
    consultations: Consultation[];
    patients: Patient[];
}