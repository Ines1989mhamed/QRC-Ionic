import { Guid } from "./Guid";

export class Evennement {

public Id: Guid;
public Designation: string;
public DateDebut : Date;
public DateFin : Date;
constructor() {
    this.Id = Guid.newGuid();
}
}
