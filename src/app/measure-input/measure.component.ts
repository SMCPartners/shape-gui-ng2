import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrgMeasureDetail} from "../shared/org-measure-detail";
import {MeasureInfo} from "../shared/measure-info";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { numDenValidator } from "../shared/num-den-validator";
import {OrgMeasureInfo} from "../shared/org-measure-info";
import {LoginService} from "../login/login.service";
import {HomeService} from "../home/home.service";
import {Router} from "@angular/router";
import {ToastrService} from "toastr-ng2";
import {BASEURL} from "../shared/global-variables";
import {FileItem, FileUploader} from "ng2-file-upload";


@Component({
  selector: 'sh-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent implements OnInit {

  @Input() orgMeasureDetail: OrgMeasureDetail[] = [];
  @Input() addOrgMeasureShow: boolean;
  @Output() changeAddMeasureBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addOrgMeasureSuccess: EventEmitter<string> = new EventEmitter<string>();
  @Input() measures: MeasureInfo[];
  @Input() organizationId: number;
  uploadShow: boolean = false;

  public uploader:FileUploader = new FileUploader({
    url: `http://${BASEURL}/shape-service/shape/admin/measure/add/upload`

  });
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  orgMeasureForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private homeService: HomeService,
              private toastrService: ToastrService) {
  }


  ngOnInit() {
    this.createForm();

    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
      this.uploader.authToken = `Bearer ${this.loginService.token}`;
      this.uploader.options.additionalParameter = {
        orgId: 1,
        'measure_type_1.xlsx' : 'measure_type_1.xlsx'
      };
    };

  }


  addOrgMeasure(form) {

    if (form.valid) {
      const formData = form.value;
      const addOrgMeasureForm = new OrgMeasureInfo('', formData.total.numeratorValue, formData.total.denominatorValue,
        new Date(), formData.genderMale.genderMaleNum, formData.genderMale.genderMaleDen, formData.genderFemale.genderFemaleNum,
        formData.genderFemale.genderFemaleDen, formData.age1844.age1844Num, formData.age1844.age1844Den, formData.age4564.age4564Num, formData.age4564.age4564Den,
        formData.ageOver65.ageOver65Num, formData.ageOver65.ageOver65Den, formData.ethnicityHispanicLatino.ethnicityHispanicLatinoNum,
        formData.ethnicityHispanicLatino.ethnicityHispanicLatinoDen, formData.ethnicityNotHispanicLatino.ethnicityNotHispanicLatinoNum,
        formData.ethnicityNotHispanicLatino.ethnicityNotHispanicLatinoDen, formData.raceAfricanAmerican.raceAfricanAmericanNum,
        formData.raceAfricanAmerican.raceAfricanAmericanDen, formData.raceAmericanIndian.raceAmericanIndianNum,
        formData.raceAmericanIndian.raceAmericanIndianDen, formData.raceAsian.raceAsianNum, formData.raceAsian.raceAsianDen,
        formData.raceNativeHawaiian.raceNativeHawaiianNum, formData.raceNativeHawaiian.raceNativeHawaiianDen,
        formData.raceWhite.raceWhiteNum, formData.raceWhite.raceWhiteDen, formData.raceOther.raceOtherNum,
        formData.raceOther.raceOtherDen, formData.reportPeriodYear, this.organizationId, formData.measureId, this.loginService.getUserID()
      );

      this.homeService.addOrgMeasureData(addOrgMeasureForm)
        .subscribe(response => {
          this.changeAddMeasureBoolean.emit(false);
          this.orgMeasureForm.reset();
          this.toastrService.success('Organization added successfully!', 'Success!');
          window.scrollTo(0,0);

          this.homeService.findAllMeasuresByOrganization(this.organizationId)
            .subscribe(orgMeasureDetail => {
              this.orgMeasureDetail = orgMeasureDetail;
            });
        })

    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  uploadViaExcel() {
    this.uploadShow = true;
  }

  uploadManually() {
    this.uploadShow = false;
  }

  cancelOrgMeasure() {
    this.changeAddMeasureBoolean.emit(false);
    this.orgMeasureForm.reset();
  }

  createForm() {
    this.orgMeasureForm = this.fb.group({
      total: this.fb.group({
        numeratorValue: ['', Validators.required],
        denominatorValue: ['', Validators.required]
      }, { validator: numDenValidator }),
      genderMale: this.fb.group({
        genderMaleNum: ['', Validators.required],
        genderMaleDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      genderFemale: this.fb.group({
        genderFemaleNum: ['', Validators.required],
        genderFemaleDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      age1844: this.fb.group({
        age1844Num: ['', Validators.required],
        age1844Den: ['', Validators.required],
      }, { validator: numDenValidator }),
      age4564: this.fb.group({
        age4564Num: ['', Validators.required],
        age4564Den: ['', Validators.required],
      }, { validator: numDenValidator }),
      ageOver65: this.fb.group({
        ageOver65Num: ['', Validators.required],
        ageOver65Den: ['', Validators.required],
      }, { validator: numDenValidator }),
      ethnicityHispanicLatino: this.fb.group({
        ethnicityHispanicLatinoNum: ['', Validators.required],
        ethnicityHispanicLatinoDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      ethnicityNotHispanicLatino: this.fb.group({
        ethnicityNotHispanicLatinoNum: ['', Validators.required],
        ethnicityNotHispanicLatinoDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceAfricanAmerican: this.fb.group({
        raceAfricanAmericanNum: ['', Validators.required],
        raceAfricanAmericanDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceAmericanIndian: this.fb.group({
        raceAmericanIndianNum: ['', Validators.required],
        raceAmericanIndianDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceAsian: this.fb.group({
        raceAsianNum: ['', Validators.required],
        raceAsianDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceNativeHawaiian: this.fb.group({
        raceNativeHawaiianNum: ['', Validators.required],
        raceNativeHawaiianDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceWhite: this.fb.group({
        raceWhiteNum: ['', Validators.required],
        raceWhiteDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      raceOther: this.fb.group({
        raceOtherNum: ['', Validators.required],
        raceOtherDen: ['', Validators.required],
      }, { validator: numDenValidator }),
      reportPeriodYear: ['', Validators.required],
      measureId: ['', Validators.required],
    })
  }
}
