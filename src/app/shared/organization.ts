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
        id : org.id,
        name : org.name,
        address: `${org.addressStreet}, ${org.addressCity}, ${org.addressState}, ${org.addressZip}`,
        primaryPhone: org.primaryContactPhone,
        primaryName: org.primaryContactName,
        primaryEmail: org.primaryContactEmail,
        primaryRole: org.primaryContactRole,
        status: org.active ? 'Active' : 'Inactive',
        addressStreet: org.addressStreet,
        addressCity: org.addressCity,
        addressState: org.addressState,
        addressZip: org.addressZip
      })

    });

    return returnArray;
  }

  static convertTableObjectToDTO(tableObject: any): any {
    const active = tableObject.status === 'Active' ? true : false;
    return { id: tableObject.id, name: tableObject.name, addressStreet: tableObject.addressStreet,
             addressCity: tableObject.addressCity, addressState: tableObject.addressState,
             addressZip: tableObject.addressZip, primaryContactPhone: tableObject.primaryPhone,
             primaryContactName: tableObject.primaryName, primaryContactEmail: tableObject.primaryEmail,
             primaryContactRole: tableObject.primaryRole, active: active }
  }

}
