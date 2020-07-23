import { Observable } from 'rxjs';
import { BirthdayService } from './../service/birthday.service';
import { Birthday } from '../birthday/birthday'
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  birthdays: Observable<Birthday[]>
  pastBirthdays: Observable<Birthday[]>
  currentBirthdays: Observable<Birthday[]>
  nextBirthdays: Observable<Birthday[]>
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  constructor(
    private birthdayService: BirthdayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reloadData();
    this.pastBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        console.log(formatTempArrayDay+" "+formatTempArrayDay)
        return this.formatCurrentDate > formatTempArrayDay;
      }))
    );
    this.currentBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        console.log(formatTempArrayDay+" "+formatTempArrayDay)
        return this.formatCurrentDate == formatTempArrayDay;
      }))
    );
    this.nextBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const formatTempArrayDay = formatDate(day.date, 'yyyy-MM-dd', 'en-US');
        console.log(formatTempArrayDay+" "+formatTempArrayDay)
        return this.formatCurrentDate < formatTempArrayDay;
      }))
    );
  }

  reloadData() {
    this.birthdays = this.birthdayService.getBirthdaysList();
  }

}
