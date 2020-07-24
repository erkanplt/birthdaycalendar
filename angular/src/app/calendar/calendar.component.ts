import { Birthday } from './../birthday/birthday';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import trLocale from '@fullcalendar/core/locales/tr';
import { Observable } from 'rxjs';
import { BirthdayService } from '../service/birthday.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  data = [];
  birthdays: Observable<Birthday[]>

  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {

    this.reloadData();

  }

  reloadData() {
    this.birthdays = this.birthdayService.getBirthdaysList();
    this.birthdays.subscribe(elements => {
      elements.forEach((day) => {
        const formatTempDate = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        this.data.push({ title: day.title, date: formatTempDate, color: '#57de64' })
        this.calendarOptions.events = this.data;
      })
    })
  }

  calendarOptions: CalendarOptions = {
    height: 600,
    locale: trLocale,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this)
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
    console.log(this.calendarOptions.events)
  }
  

}
