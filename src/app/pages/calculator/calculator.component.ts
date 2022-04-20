import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild("bottom") bottom: ElementRef;

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
    resultSingleList: [],
    displayedListColumns: ['fullname', 'code', 'cmnd', 'salary', 'cost'],
  }

  constructor(
    private firebase: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.firebase.collection('inform').valueChanges().subscribe(value => {
      this.singleMode.choosedPersons = [];
      this.singleMode.unchoosedPersons = value.filter(item => item['target'] == '0');
      this.singleMode.selectedChoosed = [];
      this.singleMode.selectedUnchoosed = []

      this.familyMode.choosedFamilies = [];
      this.familyMode.unchoosedFamilies = value.filter(item => item['target'] == '0');
      this.familyMode.selectedChoosed = [];
      this.familyMode.selectedUnchoosed = []
    })
  }

  calculatorSingle() {
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

  calculatorFamily() {

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
