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

    // attributs patient
    numeroSecu: string;
    medecin: Medecin;


    // TODO vérifier les champs
}

