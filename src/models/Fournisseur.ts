import { Guid } from "./Guid";

export class Client {

public Id: Guid;
public Nom : string;
public Designation: string;
public Adresse : string;
public Tel : string;
constructor() {
    this.Id = Guid.newGuid();
}
}
