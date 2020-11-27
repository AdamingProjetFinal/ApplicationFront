export class Comptabilite {
    // attributs Admin
    idComptabilite:number;
    idConsultation:number;
    frais:number; // Taxe x prixCons
    gain:number; //  prixCons*Taxe/(1+Taxe)
    date:Date
}