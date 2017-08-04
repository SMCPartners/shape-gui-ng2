export class MeasureInfo {

  id: number;
  active: boolean;
  denominatorDescription: string;
  description: string;
  exclusionsDescription: string;
  name: string;
  nqfId: number;
  numeratorDescription: string;
  selected: boolean;
  wellControlledNumerator: boolean;

  constructor(id: number, active: boolean, denominatorDescription: string, description: string, exclusionsDescription: string, name: string, nqfId: number, numeratorDescription: string, selected: boolean, wellControlledNumerator: boolean) {
    this.id = id;
    this.active = active;
    this.denominatorDescription = denominatorDescription;
    this.description = description;
    this.exclusionsDescription = exclusionsDescription;
    this.name = name;
    this.nqfId = nqfId;
    this.numeratorDescription = numeratorDescription;
    this.selected = selected;
    this.wellControlledNumerator = wellControlledNumerator;
  }

  static convertToTableObject(measureArray: MeasureInfo[]): any[] {

    const returnArray: any[] = [];

    measureArray.forEach(measure => {

      returnArray.push({
        nqfId: measure.nqfId,
        name: measure.name,
        description: measure.description
      })
    });
    return returnArray;
  }
}
