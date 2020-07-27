import { Observable } from 'rxjs';
import { BirthdayService } from './../service/birthday.service';
import { Birthday } from '../birthday/birthday'
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  birthdaysListDatabase: Observable<Birthday[]>
  pastBirthdays: Observable<Birthday[]>
  currentBirthdays: Observable<Birthday[]>
  nextBirthdays: Observable<Birthday[]>
  birthdayObject: Birthday = new Birthday();
  updateTempId: number;
  updateTempTitle:string;
  updateTempDate: string;
  submitted = false;
  saveYearCounter: number=1;
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  

  constructor(
    private birthdayService: BirthdayService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.reloadData();
    this.pastBirthdays = this.birthdaysListDatabase.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate > formatTempArrayDay;
      }))
    );
    this.currentBirthdays = this.birthdaysListDatabase.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate == formatTempArrayDay;
      }))
    );
    this.nextBirthdays = this.birthdaysListDatabase.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate < formatTempArrayDay;
      }))
    );
  }

  reloadData() {
    this.birthdaysListDatabase = this.birthdayService.getBirthdaysList();
  }

  openAddBirthday(contentAdd) {
    this.birthdayObject = new Birthday();
    this.modalService.open(contentAdd);
  }

  onSubmitSave() {
    this.submitted = true;
    this.saveBirthday();
  }

  saveBirthday() {
    var loopControl = true;
    for (var yearCounter = 0; yearCounter < this.saveYearCounter; yearCounter++) {
      if (loopControl) {
        this.saveWithYears(0);
        loopControl = false;
      } else {
        this.saveWithYears(1);
      }
    }
    this.birthdayObject = new Birthday();
    this.gotoList();
  }

  saveWithYears(a:number) {
    var tempBirthdayDate=new Date(this.birthdayObject.date);
    tempBirthdayDate.setFullYear(tempBirthdayDate.getFullYear()+a)
    this.birthdayObject.date=tempBirthdayDate;
    this.birthdayService.createBirthday(this.birthdayObject).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
  }

  newBirthday(): void {
    this.submitted = false;
    this.birthdayObject = new Birthday();
  }

  deleteBirthday(id: number) {
    this.birthdayService.deleteBirthday(id).subscribe(
      (data) => {
        this.reloadData();
      },
      (error) => console.log(error)
    );
    this.gotoList();
  }

  openUpdate(contentUpdate, birthday: Birthday) {
    this.updateTempDate = formatDate(birthday.date, 'yyyy-MM-dd', 'en-US');
    this.updateTempId = birthday.id;
    this.updateTempTitle = birthday.title;
    this.birthdayObject = birthday;
    this.modalService.open(contentUpdate);
  }

  onSubmitUpdate() {
    this.updateBirthday();
  }

  updateBirthday() {
    this.birthdayObject.date = new Date(this.updateTempDate);
    this.birthdayObject.title = this.updateTempTitle;
    this.birthdayService.updateBirthday(this.updateTempId, this.birthdayObject).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
    this.birthdayObject = new Birthday();
    this.gotoList();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  gotoList() {
    this.router.navigate(['/list']);
    this.refreshPage();
  }

  refreshPage(): void {
    window.location.reload();
  }

}
