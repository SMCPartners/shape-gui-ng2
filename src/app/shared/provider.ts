export class Provider {

  id: number;
  name: string;
  active: boolean;
  npi: number;
  createdBy: string;
  organizationId: number;
  organizationName: string;

  constructor(id: number, name: string, active: boolean, npi: number, createdBy: string, organizationId: number, organizationName: string) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.npi = npi;
    this.createdBy = createdBy;
    this.organizationId = organizationId;
    this.organizationName = organizationName;
  }

  static convertToTableObject(providerArray: Provider[]): any[] {

    const returnArray: any[] = [];

    providerArray.forEach(prov => {

      returnArray.push({
        id: prov.id,
        name: prov.name,
        npi: prov.npi,
        organization: prov.organizationName,
        organizationId: prov.organizationId,
        status: prov.active ? 'Active' : 'Inactive',
      })

    });

    return returnArray;
  }

  static convertTableObjectToDTO(tableObject: any) {
    const active = tableObject.status === 'Active' ? true : false;
    return new Provider(tableObject.id, tableObject.name, active, tableObject.npi, '', tableObject.organizationId, tableObject.organizationName);
  }

}


