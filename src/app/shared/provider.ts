export class Provider {

  id: number;
  name: string;
  active: boolean;
  npi: number;
  createdBy: string;
  organizationId: number;

  constructor(id: number, name: string, active: boolean, npi: number, createdBy: string, organizationId: number) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.npi = npi;
    this.createdBy = createdBy;
    this.organizationId = organizationId;
  }

  static convertToTableObject(providerArray: Provider[]): any[] {

    const returnArray: any[] = [];

    providerArray.forEach(prov => {

      returnArray.push({
        id: prov.id,
        name: prov.name,
        npi: prov.npi,
        organization: prov.organizationId,
        status: prov.active ? 'Active' : 'Inactive',
      })

    });

    return returnArray;
  }

  static convertTableObjectToDTO(tableObject: any) {
    const active = tableObject.status === 'Active' ? true : false;
    return new Provider(tableObject.id, tableObject.name, active, tableObject.npi, '', tableObject.organization);
  }

}


