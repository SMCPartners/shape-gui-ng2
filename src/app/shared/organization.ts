export class Organization {
  id: number;
  name: string;
  active: boolean;
  addressStreet: string;
  addressState: string;
  addressCity: string;
  addressZip: string;
  phone: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactRole: string;
  primaryContactPhone: string;
  createdBy: string;
  modifiedDt: string;
  modifiedBy: string;


  constructor(id: number, name: string, active: boolean, addressStreet: string, addressState: string, addressCity: string, addressZip: string, phone: string, primaryContactName: string, primaryContactEmail: string, primaryContactRole: string, primaryContactPhone: string, createdBy: string, modifiedDt: string, modifiedBy: string) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.addressStreet = addressStreet;
    this.addressState = addressState;
    this.addressCity = addressCity;
    this.addressZip = addressZip;
    this.phone = phone;
    this.primaryContactName = primaryContactName;
    this.primaryContactEmail = primaryContactEmail;
    this.primaryContactRole = primaryContactRole;
    this.primaryContactPhone = primaryContactPhone;
    this.createdBy = createdBy;
    this.modifiedDt = modifiedDt;
    this.modifiedBy = modifiedBy;
  }

  static convertToTableObject(orgArray: Organization[]): any[] {

    const returnArray: any[] = [];

    orgArray.forEach(org => {

      returnArray.push({
        name : org.name,
        address: `${org.addressStreet}, ${org.addressCity}, ${org.addressState}, ${org.addressZip}`,
        primaryPhone: org.primaryContactPhone,
        primaryName: org.primaryContactName,
        primaryEmail: org.primaryContactEmail,
        primaryRole: org.primaryContactRole,
        status: 'Status'
      })

    });

    return returnArray;
  }

}
