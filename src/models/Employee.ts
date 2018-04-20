import { Guid } from "./Guid";

export class Employee {

public Id: Guid;
public Nom : string;
public Matricule :string;
public Prenom : string;
public Adresse : string;
public Tel : string;
constructor() {
    this.Id = Guid.newGuid();
}
}
