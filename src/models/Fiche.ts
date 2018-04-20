import { Guid } from "./Guid";
import { Produit } from "./Produit";
import { LigneProduit } from "./LigneProduit";
import { DateTime } from "ionic-angular";

export class Fiche {

public Id: string;
public Designation: string;
public LignesProduits: Array<LigneProduit> = new Array<LigneProduit>();
public DateEntree : DateTime;
constructor() {
    this.Id = Guid.newGuid();
}
}
