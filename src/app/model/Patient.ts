import { FicheMedicale } from './FicheMedicale';
import { Adresse } from './Adresse';
import { Medecin } from './Medecin';
export class Patient {
    // attributs utilisateur
    id:number;
    username:string;
    nom:string;
    prenom:string;
    email:string;
    password:string;
    dateNaissance:Date;
    telephone:string;
    adresse:Adresse;

    // attributs patient
    numeroSecu: string;
    medecin: Medecin;
    listFiches: FicheMedicale[];
}

