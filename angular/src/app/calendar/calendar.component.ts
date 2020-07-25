import { Birthday } from './../birthday/birthday';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import trLocale from '@fullcalendar/core/locales/tr';
import { Observable } from 'rxjs';
import { BirthdayService } from '../service/birthday.service';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  data = [];
  birthdays: Observable<Birthday[]>
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  infoEventTitle: string;
  infoEventDate: string;
  birthday: Birthday = new Birthday();
  submitted = false;
  tempDate:Date;

  constructor(private birthdayService: BirthdayService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.reloadData();

  }

  reloadData() {
    this.birthdays = this.birthdayService.getBirthdaysList();
    this.birthdays.subscribe(elements => {
      elements.forEach((day) => {
        const formatTempDate = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        if(this.formatCurrentDate>formatTempDate){
          this.data.push({ title: day.title, date: formatTempDate, color: '#DC3545'})    
        }else if(this.formatCurrentDate<formatTempDate){
          this.data.push({ title: day.title, date: formatTempDate, color: '#6C757D'})    
        }else{
          this.data.push({ title: day.title, date: formatTempDate, color: '#17A2B8'})      
        }
        
        this.calendarOptions.events = this.data;
      })
    })
  }

  calendarOptions: CalendarOptions = {
    height: 600,
    locale: trLocale,
    initialView: 'dayGridMonth',
    dateClick:this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  handleDateClick(arg){
    this.tempDate=new Date(arg.dateStr);
    document.getElementById("addBirthdayButton").click();
  }
  handleEventClick(arg) {
    this.infoEventTitle = arg.event._def.title;
    this.infoEventDate = formatDate(arg.event._instance.range.start, 'yyyy-MM-dd', 'en-US')
    document.getElementById("infoEventButton").click();
  }

  openEventView(content) {
    this.modalService.open(content);
  }

  open(content) {
    this.birthday = new Birthday();
    this.modalService.open(content);
  }

  
  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.birthday.date=this.tempDate;
    this.birthdayService.createBirthday(this.birthday).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
    this.birthday = new Birthday();
  }

  newBirthday(): void {
    this.submitted = false;
    this.birthday = new Birthday();
  }
  refresh(): void {
    window.location.reload();
  }

}
