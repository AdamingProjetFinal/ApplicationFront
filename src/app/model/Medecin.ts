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

    dateNaissance:Date;
    telephone:string;
    codePublic: string;
    adresse:string;// TODO creer un model adresse 
    specialite: Specialite;
    consultations: Consultation[];
    patients: Patient[];



    // "id": 1,
    // "username": null,
    // "password": null,
    // "actived": false,
    // "nom": "poiopiopio",
    // "prenom": "zaezaezae",
    // "email": "zaezae@zaezae.zeaeza",
    // "photo": null,
    // "dateNaissance": null,
    // "telephone": null,
    // "roles": [],
    // "codePublic": null,
    // "adresse": null,
    // "specialite": null,
    // "consultations": [],
    // "patients": []
    // TODO finir les champs
}