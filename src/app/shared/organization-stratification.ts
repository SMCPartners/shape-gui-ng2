export class OrganizationStratification {
  id: number;
  genderMale: number;
  genderFemale: number;
  age17under: number;
  age1844: number;
  age4564: number;
  ageOver65: number;
  ethnicityHispanicLatino: number;
  ethnicityNotHispanicLatino: number;
  raceAfricanAmerican: number;
  raceAmericanIndian: number;
  raceAsian: number;
  raceNativeHawaiian: number;
  raceWhite: number;
  raceOther: number;
  organizationId: number;
  totalPatients: number;
  totalVisits: number;
  patientsHypertension: number;
  patientsDiabetes: number;
  patientsPreDiabetes: number;
  patientsHighBp: number;
  primaryCarePractice: boolean;
  fqhcLookALike: boolean;
  comHealthCenter: boolean;
  multiSpecPractice: boolean;
  pracConsortium: boolean;
  ambulatoryClinic: boolean;
  hmo: boolean;
  aco: boolean;
  pcmh: boolean;
  otherOrgDescrip: boolean;
  physicians: boolean;
  nursePrac: boolean;
  rn: boolean;
  lpn: boolean;
  pa: boolean;
  medicalAssist: boolean;
  residents: boolean;
  interns: boolean;
  communityHealthWorkers: boolean;
  trainedMotivationalInterview: boolean;
  medicarePercent: number;
  medicaidPercent: number;
  hmoPercent: number;
  ppoPercent: number;
  uninsuredSelfPercent: number;
  privatePercent: number;
  vendor: string;
  product: string;
  versionEHR: string;
  completeCEHRT: boolean;
  patientPortal: boolean;
  userId: string;
  rpDate: Date;

  constructor(id: number, genderMale: number, genderFemale: number, age17under: number, age1844: number, age4564: number, ageOver65: number, ethnicityHispanicLatino: number, ethnicityNotHispanicLatino: number, raceAfricanAmerican: number, raceAmericanIndian: number, raceAsian: number, raceNativeHawaiian: number, raceWhite: number, raceOther: number, organizationId: number, totalPatients: number, totalVisits: number, patientsHypertension: number, patientsDiabetes: number, patientsPreDiabetes: number, patientsHighBp: number, primaryCarePractice: boolean, fqhcLookALike: boolean, comHealthCenter: boolean, multiSpecPractice: boolean, pracConsortium: boolean, ambulatoryClinic: boolean, hmo: boolean, aco: boolean, pcmh: boolean, otherOrgDescrip: boolean, physicians: boolean, nursePrac: boolean, rn: boolean, lpn: boolean, pa: boolean, medicalAssist: boolean, residents: boolean, interns: boolean, communityHealthWorkers: boolean, trainedMotivationalInterview: boolean, medicarePercent: number, medicaidPercent: number, hmoPercent: number, ppoPercent: number, uninsuredSelfPercent: number, privatePercent: number, vendor: string, product: string, versionEHR: string, completeCEHRT: boolean, patientPortal: boolean, userId: string, rpDate: Date) {
    this.id = id;
    this.genderMale = genderMale;
    this.genderFemale = genderFemale;
    this.age17under = age17under;
    this.age1844 = age1844;
    this.age4564 = age4564;
    this.ageOver65 = ageOver65;
    this.ethnicityHispanicLatino = ethnicityHispanicLatino;
    this.ethnicityNotHispanicLatino = ethnicityNotHispanicLatino;
    this.raceAfricanAmerican = raceAfricanAmerican;
    this.raceAmericanIndian = raceAmericanIndian;
    this.raceAsian = raceAsian;
    this.raceNativeHawaiian = raceNativeHawaiian;
    this.raceWhite = raceWhite;
    this.raceOther = raceOther;
    this.organizationId = organizationId;
    this.totalPatients = totalPatients;
    this.totalVisits = totalVisits;
    this.patientsHypertension = patientsHypertension;
    this.patientsDiabetes = patientsDiabetes;
    this.patientsPreDiabetes = patientsPreDiabetes;
    this.patientsHighBp = patientsHighBp;
    this.primaryCarePractice = primaryCarePractice;
    this.fqhcLookALike = fqhcLookALike;
    this.comHealthCenter = comHealthCenter;
    this.multiSpecPractice = multiSpecPractice;
    this.pracConsortium = pracConsortium;
    this.ambulatoryClinic = ambulatoryClinic;
    this.hmo = hmo;
    this.aco = aco;
    this.pcmh = pcmh;
    this.otherOrgDescrip = otherOrgDescrip;
    this.physicians = physicians;
    this.nursePrac = nursePrac;
    this.rn = rn;
    this.lpn = lpn;
    this.pa = pa;
    this.medicalAssist = medicalAssist;
    this.residents = residents;
    this.interns = interns;
    this.communityHealthWorkers = communityHealthWorkers;
    this.trainedMotivationalInterview = trainedMotivationalInterview;
    this.medicarePercent = medicarePercent;
    this.medicaidPercent = medicaidPercent;
    this.hmoPercent = hmoPercent;
    this.ppoPercent = ppoPercent;
    this.uninsuredSelfPercent = uninsuredSelfPercent;
    this.privatePercent = privatePercent;
    this.vendor = vendor;
    this.product = product;
    this.versionEHR = versionEHR;
    this.completeCEHRT = completeCEHRT;
    this.patientPortal = patientPortal;
    this.userId = userId;
    this.rpDate = rpDate;
  }

}
