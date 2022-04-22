import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild("bottom") bottom: ElementRef;

  BASE_SALARY = "1490000"

  singleMode = {
    selectedPersons: [],
    choosedPersons: [],
    unchoosedPersons: [],
    selectedChoosed: [],
    selectedUnchoosed: [],
    resultList: [],
    displayedListColumns: ['fullname', 'code', 'cmnd', 'salary', 'cost'],
  }

  familyMode = {
    selectedFamilies: [],
    choosedFamilies: [],
    unchoosedFamilies: [],
    selectedChoosed: [],
    selectedUnchoosed: [],
    resultList: [],
    displayedListColumns: ['household', 'familyCode', 'count', 'baseSalary', 'cost'],
  }

  constructor(
    private auth: AuthService,
    private firebase: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!this.auth.isAuth()) {
      this.router.navigate(["/session/login"]);
    }

    this.firebase.collection('inform').valueChanges().subscribe(value => {
      this.singleMode.choosedPersons = [];
      this.singleMode.unchoosedPersons = value.filter(item => item['target'] == '0');
      this.singleMode.selectedChoosed = [];
      this.singleMode.selectedUnchoosed = []

      this.familyMode.choosedFamilies = [];
      this.familyMode.unchoosedFamilies = this.groupFamily(value.filter(item => item['target'] == '1'));
      this.familyMode.selectedChoosed = [];
      this.familyMode.selectedUnchoosed = []
    })
  }
  groupFamily(listPerson) {

    var groups = [];

    listPerson.forEach(person => {

      var idx = groups.findIndex(item => item.familyCode == person.familyCode);
      if (idx != -1) {
        groups[idx]['members'].push(person);
        groups[idx]['count'] += 1;
      } else {
        let data = {
          familyCode: person.familyCode,
          members: [],
          count: 1,
          household: person.household
        }
        data.members.push(person);
        groups.push(data);
      }
    });

    return groups;
  }

  calculatorSingle() {
    this.singleMode.resultList = [];
    this.singleMode.choosedPersons.forEach((person, index) => {
      this.singleMode.resultList.push({
        ...person,
        salary: person.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        cost: (Number.parseFloat(person.salary) * 4.5 / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      })
      if (index == this.singleMode.choosedPersons.length - 1) {
        setTimeout(() => {
          this.bottom.nativeElement.scrollIntoView();
        }, 0);
      }
    })
  }

  getCostFamily(numberMember) {

    var cost = 0;
    if (numberMember >= 1) {
      cost += Number.parseFloat(this.BASE_SALARY) * 4.5 / 100;
    }
    if (numberMember >= 2) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (70 / 100)
    }
    if (numberMember >= 3) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (60 / 100)
    }
    if (numberMember >= 4) {
      cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (50 / 100)
    }
    if (numberMember >= 5) {
      for (let i = 0; i <= (numberMember - 5); i++) {

        cost += Number.parseFloat(this.BASE_SALARY) * (4.5 / 100) * (40 / 100)
      }
    }
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  calculatorFamily() {
    this.familyMode.resultList = [];
    this.familyMode.choosedFamilies.forEach((family, index) => {
      this.familyMode.resultList.push({
        ...family,
        count: family.count,
        baseSalary: this.BASE_SALARY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        cost: this.getCostFamily(family.count)
      })
      if (index == this.singleMode.choosedPersons.length - 1) {
        setTimeout(() => {
          this.bottom.nativeElement.scrollIntoView();
        }, 0);
      }
    })
  }

  singleUnchoosed() {
    const listPersonToRemove = [];
    for (const i of this.singleMode.selectedChoosed) {
      listPersonToRemove.push(this.singleMode.choosedPersons[i]);
    }
    this.singleMode.unchoosedPersons = this.addList(this.singleMode.unchoosedPersons, listPersonToRemove);
    this.singleMode.choosedPersons = this.removeList(this.singleMode.choosedPersons, listPersonToRemove);
    this.singleMode.selectedChoosed = [];
  }

  familyUnchoosed() {
    const listFamilyToRemove = [];
    for (const i of this.familyMode.selectedChoosed) {
      listFamilyToRemove.push(this.familyMode.choosedFamilies[i]);
    }
    this.familyMode.unchoosedFamilies = this.addList(this.familyMode.unchoosedFamilies, listFamilyToRemove);
    this.familyMode.choosedFamilies = this.removeList(this.familyMode.choosedFamilies, listFamilyToRemove);
    this.familyMode.selectedChoosed = [];
  }

  singleChoosed() {
    const listPersonToAdd = [];
    for (const i of this.singleMode.selectedUnchoosed) {
      listPersonToAdd.push(this.singleMode.unchoosedPersons[i]);
    }
    this.singleMode.choosedPersons = this.addList(this.singleMode.choosedPersons, listPersonToAdd);
    this.singleMode.unchoosedPersons = this.removeList(this.singleMode.unchoosedPersons, listPersonToAdd);
    this.singleMode.selectedUnchoosed = [];
  }

  familyChoosed() {
    const listFamilyToAdd = [];
    for (const i of this.familyMode.selectedUnchoosed) {
      listFamilyToAdd.push(this.familyMode.unchoosedFamilies[i]);
    }
    this.familyMode.choosedFamilies = this.addList(this.familyMode.choosedFamilies, listFamilyToAdd);
    this.familyMode.unchoosedFamilies = this.removeList(this.familyMode.unchoosedFamilies, listFamilyToAdd);
    this.familyMode.selectedUnchoosed = [];
  }

  addList(rootList, addList) {
    if (rootList === null) {
      rootList = [];
    }
    for (const d of addList) {
      rootList.push(d);
    }
    return rootList;
  }

  removeList(rootList, removeList) {
    for (const d of removeList) {
      rootList.splice(rootList.indexOf(d), 1);
    }
    return rootList;
  }

  selectChoosedPerson(index: number) {
    if (this.singleMode.selectedChoosed.indexOf(index) < 0) {
      this.singleMode.selectedChoosed.push(index);
    } else {
      this.singleMode.selectedChoosed.splice(this.singleMode.selectedChoosed.indexOf(index), 1);
    }
  }

  selectChoosedFamily(index: number) {
    if (this.familyMode.selectedChoosed.indexOf(index) < 0) {
      this.familyMode.selectedChoosed.push(index);
    } else {
      this.familyMode.selectedChoosed.splice(this.familyMode.selectedChoosed.indexOf(index), 1);
    }
  }

  selectUnchoosedPerson(index: number) {
    if (this.singleMode.selectedUnchoosed.indexOf(index) < 0) {
      this.singleMode.selectedUnchoosed.push(index);
    } else {
      this.singleMode.selectedUnchoosed.splice(this.singleMode.selectedUnchoosed.indexOf(index), 1);
    }
  }

  selectUnchoosedFamily(index: number) {
    if (this.familyMode.selectedUnchoosed.indexOf(index) < 0) {
      this.familyMode.selectedUnchoosed.push(index);
    } else {
      this.familyMode.selectedUnchoosed.splice(this.familyMode.selectedUnchoosed.indexOf(index), 1);
    }
  }

  singleIsSelectedChoosed(i: number) {
    if (this.singleMode.selectedChoosed.indexOf(i) < 0) {
      return 'unselected';
    }
    return 'selected';
  }

  familyIsSelectedChoosed(i: number) {
    if (this.familyMode.selectedChoosed.indexOf(i) < 0) {
      return 'unselected';
    }
    return 'selected';
  }

  singleIsSelectedUnchoosed(i: number) {
    if (this.singleMode.selectedUnchoosed.indexOf(i) < 0) {
      return 'unselected';
    }
    return 'selected';
  }

  familyIsSelectedUnchoosed(i: number) {
    if (this.familyMode.selectedUnchoosed.indexOf(i) < 0) {
      return 'unselected';
    }
    return 'selected';
  }
}
