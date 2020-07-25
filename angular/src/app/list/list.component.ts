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

  birthday: Birthday = new Birthday();
  submitted = false;
  updateId: number;
  updateDate: string;
  birthdays: Observable<Birthday[]>
  pastBirthdays: Observable<Birthday[]>
  currentBirthdays: Observable<Birthday[]>
  nextBirthdays: Observable<Birthday[]>
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  saveYearCounter: number=1;

  constructor(
    private birthdayService: BirthdayService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.reloadData();
    this.pastBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate > formatTempArrayDay;
      }))
    );
    this.currentBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate == formatTempArrayDay;
      }))
    );
    this.nextBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        return this.formatCurrentDate < formatTempArrayDay;
      }))
    );
  }

  reloadData() {
    this.birthdays = this.birthdayService.getBirthdaysList();
  }

  open(content) {
    this.birthday = new Birthday();
    this.modalService.open(content);
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

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    var loopControl = true;
    for (var yearCounter = 0; yearCounter < this.saveYearCounter; yearCounter++) {
      if (loopControl) {
        this.saveWithYear(0);
        loopControl = false;
      } else {
        this.saveWithYear(1);
      }
    }
    this.birthday = new Birthday();
  }

  saveWithYear(a:number) {
    var tempBirthdayDate=new Date(this.birthday.date);
    tempBirthdayDate.setFullYear(tempBirthdayDate.getFullYear()+a)
    this.birthday.date=tempBirthdayDate;
    this.birthdayService.createBirthday(this.birthday).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
  }

  newBirthday(): void {
    this.submitted = false;
    this.birthday = new Birthday();
  }
  refresh(): void {
    window.location.reload();
  }

  deleteBirthday(id: number) {
    this.birthdayService.deleteBirthday(id).subscribe(
      (data) => {
        this.reloadData();
      },
      (error) => console.log(error)
    );
    this.refresh();
  }

  openUpdate(content, birthday: Birthday) {
    this.updateDate = formatDate(birthday.date, 'yyyy-MM-dd', 'en-US');
    this.updateId = birthday.id;
    this.birthday = birthday;
    this.modalService.open(content);
  }
  onSubmitUpdate() {
    this.updateBirthday();
  }
  updateBirthday() {
    this.birthday.date = new Date(this.updateDate);
    this.birthdayService.updateBirthday(this.updateId, this.birthday).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
    this.birthday = new Birthday();
  }

}
