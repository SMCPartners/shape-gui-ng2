export class Provider {

  name: string;
  active: boolean;
  npi: number;
  createdBy: string;
  organizationId: number;

  constructor(name: string, active: boolean, npi: number, createdBy: string, organizationId: number) {
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
        name: prov.name,
        npi: prov.npi,
        organization: prov.organizationId,
        status: prov.active ? 'Active' : 'Inactive',
      })

    });

    return returnArray;
  }
}


