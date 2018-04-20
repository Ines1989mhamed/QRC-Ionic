import { Guid } from "./Guid";

export class Voitures {

public Id: Guid;
public Designation : string;
public Matricule :string;
constructor() {
    this.Id = Guid.newGuid();
}
}