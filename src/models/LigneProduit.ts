import { Guid } from "./Guid";
import { Produit } from "./Produit";

export class LigneProduit {
/**
 *
 */
public Id: string;
public Quantite: number; 
public Fiche_Id :Guid; 
public Produit:Produit = new Produit();
// constructor() {
// this.Id = Guid.newGuid();
// }
}
