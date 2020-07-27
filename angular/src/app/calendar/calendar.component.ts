import { Birthday } from './../birthday/birthday';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import trLocale from '@fullcalendar/core/locales/tr';
import { Observable } from 'rxjs';
import { BirthdayService } from '../service/birthday.service';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  birthdaysListDatabase: Observable<Birthday[]>;
  calendarBirthdaysdata = [];
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  infoEventTitle: string;
  infoEventDate: string;
  birthdayObject: Birthday = new Birthday();
  submitted = false;
  saveTempDate: Date;
  saveYearCounter: number = 1;

  constructor(private birthdayService: BirthdayService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.birthdaysListDatabase = this.birthdayService.getBirthdaysList();
    this.birthdaysListDatabase.subscribe(elements => {
      elements.forEach((day) => {
        const formatTempDate = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        if (this.formatCurrentDate > formatTempDate) {
          this.calendarBirthdaysdata.push({ title: day.title, date: formatTempDate, color: '#DC3545' })
        } else if (this.formatCurrentDate < formatTempDate) {
          this.calendarBirthdaysdata.push({ title: day.title, date: formatTempDate, color: '#6C757D' })
        } else {
          this.calendarBirthdaysdata.push({ title: day.title, date: formatTempDate, color: '#17A2B8' })
        }
        this.calendarOptions.events = this.calendarBirthdaysdata;
      })
    })
  }

  calendarOptions: CalendarOptions = {
    height: 600,
    locale: trLocale,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  handleDateClick(arg) {
    this.saveTempDate = new Date(arg.dateStr);
    document.getElementById("addBirthdayButton").click();
  }
  
  handleEventClick(arg) {
    this.infoEventTitle = arg.event._def.title;
    this.infoEventDate = formatDate(arg.event._instance.range.start, 'yyyy-MM-dd', 'en-US')
    document.getElementById("infoEventButton").click();
  }

  openEventView(contentView) {
    this.modalService.open(contentView);
  }

  openEventAdd(contentAdd) {
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
    this.gotoCalendar();
  }

  saveWithYears(a: number) {
    this.saveTempDate.setFullYear(this.saveTempDate.getFullYear() + a);
    this.birthdayObject.date = this.saveTempDate;
    this.birthdayService.createBirthday(this.birthdayObject).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
  }

  newBirthday(): void {
    this.submitted = false;
    this.birthdayObject = new Birthday();
  }

  refreshPage(): void {
    window.location.reload();
  }

  gotoCalendar() {
    this.router.navigate(['/calendar']);
    this.refreshPage();
  }
}
