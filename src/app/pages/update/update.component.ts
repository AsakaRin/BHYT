import { API } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  informForm: FormGroup;
  maxDate = new Date();
  itemId;

  typeSub: Subscription;
  targetSub: Subscription;

  nationList = [
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Côte d'Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. 'Swaziland')",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ]

  phoneCodeList = [
    "93",
    "355",
    "213",
    "1-684",
    "376",
    "244",
    "1-264",
    "672",
    "1-268",
    "54",
    "374",
    "297",
    "61",
    "43",
    "994",
    "1-242",
    "973",
    "880",
    "1-246",
    "375",
    "32",
    "501",
    "229",
    "1-441",
    "975",
    "591",
    "387",
    "267",
    "55",
    "246",
    "1-284",
    "673",
    "359",
    "226",
    "257",
    "855",
    "237",
    "1",
    "238",
    "1-345",
    "236",
    "235",
    "56",
    "86",
    "61",
    "61",
    "57",
    "269",
    "682",
    "506",
    "385",
    "53",
    "599",
    "357",
    "420",
    "243",
    "45",
    "253",
    "1-767",
    "1-809",
    "1-829",
    "1-849",
    "670",
    "593",
    "20",
    "503",
    "240",
    "291",
    "372",
    "251",
    "500",
    "298",
    "679",
    "358",
    "33",
    "689",
    "241",
    "220",
    "995",
    "49",
    "233",
    "350",
    "30",
    "299",
    "1-473",
    "1-671",
    "502",
    "44-1481",
    "224",
    "245",
    "592",
    "509",
    "504",
    "852",
    "36",
    "354",
    "91",
    "62",
    "98",
    "964",
    "353",
    "44-1624",
    "972",
    "39",
    "225",
    "1-876",
    "81",
    "44-1534",
    "962",
    "7",
    "254",
    "686",
    "383",
    "965",
    "996",
    "856",
    "371",
    "961",
    "266",
    "231",
    "218",
    "423",
    "370",
    "352",
    "853",
    "389",
    "261",
    "265",
    "60",
    "960",
    "223",
    "356",
    "692",
    "222",
    "230",
    "262",
    "52",
    "691",
    "373",
    "377",
    "976",
    "382",
    "1-664",
    "212",
    "258",
    "95",
    "264",
    "674",
    "977",
    "31",
    "599",
    "687",
    "64",
    "505",
    "227",
    "234",
    "683",
    "850",
    "1-670",
    "47",
    "968",
    "92",
    "680",
    "970",
    "507",
    "675",
    "595",
    "51",
    "63",
    "64",
    "48",
    "351",
    "1-787",
    "1-939",
    "974",
    "242",
    "262",
    "40",
    "7",
    "250",
    "590",
    "290",
    "1-869",
    "1-758",
    "590",
    "508",
    "1-784",
    "685",
    "378",
    "239",
    "966",
    "221",
    "381",
    "248",
    "232",
    "65",
    "1-721",
    "421",
    "386",
    "677",
    "252",
    "27",
    "82",
    "211",
    "34",
    "94",
    "249",
    "597",
    "47",
    "268",
    "46",
    "41",
    "963",
    "886",
    "992",
    "255",
    "66",
    "228",
    "690",
    "676",
    "1-868",
    "216",
    "90",
    "993",
    "1-649",
    "688",
    "1-340",
    "256",
    "380",
    "971",
    "44",
    "1",
    "598",
    "998",
    "678",
    "379",
    "58",
    "84",
    "681",
    "212",
    "967",
    "260",
    "263",
  ]

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sharedServcie: SharedService,
    private router: Router,
    private auth: AuthService,
    private api: API) { }

  ngOnInit(): void {

    if (!this.auth.isAuth()) {
      this.router.navigate(["/session/login"]);
    }

    this.informForm = this.formBuilder.group({
      type: ['0', Validators.required],
      target: ['0', Validators.required],
      hostName: [''],
      fullname: ['', Validators.required],
      code: ['', Validators.required],
      cmnd: ['', Validators.required],
      birthday: [new Date(), Validators.required],
      gender: ['0', Validators.required],
      nation: ['Vietnam', Validators.required],
      ethnicity: [''],
      geocode: ['84', Validators.required],
      phoneNumber: ['', Validators.required],
      street: [''],
      district: [''],
      city: [''],
      dkcb: ['', Validators.required],
      guardians: [''],
      salary: ['', Validators.required],
      household: [''],
      familyCode: [''],
      phoneContact: [''],
      addressHousehold: ['']
    })

    this.typeSub = this.informForm.controls['type'].valueChanges.subscribe(value => {

      if (value == '1') {
        this.informForm.controls['target'].setValue('1');
        this.informForm.controls['target'].disable({ onlySelf: true, emitEvent: true });
      } else {
        this.informForm.controls['target'].enable({ onlySelf: true, emitEvent: true });
      }
    })

    this.targetSub = this.informForm.controls['target'].valueChanges.subscribe(value => {
      if (value == '1') {

        this.setValidaterRequired(['household', 'familyCode', 'phoneContact', 'addressHousehold']);
      } else {
        this.clearValidater(['household', 'familyCode', 'phoneContact', 'addressHousehold']);
      }
    })

    this.maxDate = new Date();

    this.route.paramMap.subscribe(params => {

      this.api.getInformById(params.get('id')).subscribe(res => {
        this.itemId = params.get('id');
        var data = res['item'];
        this.updateData({
          type: data.type + "",
          target: data.target + "",
          hostName: data.hostName,
          fullname: data.fullname,
          code: data.code,
          cmnd: data.cmnd,
          birthday: data.birthday,
          gender: data.gender + "",
          nation: data.nation,
          ethnicity: data.ethnicity,
          geocode: data.geocode,
          phoneNumber: data.phoneNumber,
          street: data.street,
          district: data.district,
          city: data.city,
          dkcb: data.dkcb,
          guardians: data.guardians,
          salary: data.salary,
          household: data.household,
          familyCode: data.familyCode,
          phoneContact: data.phoneContact,
          addressHousehold: data.addressHousehold
        });
      })
    });
  }

  updateData(data) {
    this.informForm.setValue(data);
  }

  onSubmit() {

    this.api.updateInform(this.itemId, { ...this.informForm.value, target: this.informForm.controls['target'].value, lastPayment: new Date(new Date().setMonth(1)) }).subscribe(res => {
      this.router.navigate(['/pages/dashboard']);
      this.sharedServcie.getNotification("Cập nhật thành công");
    })
  }

  onCancel() {
    this.router.navigate(['/pages/dashboard']);
  }

  onlyCapitalized(event: KeyboardEvent, control) {
    if (Number.isNaN(+event.key) || event.keyCode == 0 || event.keyCode == 32) {
      this.informForm.controls[control].setValue((this.informForm.controls[control].value + event.key).toUpperCase());
    }
    event.preventDefault();
  }

  onlyNumber(event: KeyboardEvent) {

    if (Number.isNaN(+event.key)) {
      event.preventDefault();
    }
  }

  isRequired(field: string) {
    return this.informForm.get(field).validator == Validators.required;
  }

  setValidaterRequired(listField: string[]) {

    listField.forEach(field => {
      this.informForm.get(field).setValidators(Validators.required);
      this.informForm.get(field).updateValueAndValidity();
    })
  }

  clearValidater(listField: string[]) {

    listField.forEach(field => {
      this.informForm.get(field).clearValidators();
      this.informForm.get(field).updateValueAndValidity();
    })
  }

}
