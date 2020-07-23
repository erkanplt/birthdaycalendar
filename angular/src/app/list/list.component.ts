import { Observable } from 'rxjs';
import { BirthdayService } from './../service/birthday.service';
import { Birthday } from '../birthday/birthday'
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  constructor(
    private birthdayService: BirthdayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reloadData();
    const tempCurrent = new Date(this.formatCurrentDate);
    this.pastBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const tempArrayDay = new Date(day.date);
        return tempCurrent > tempArrayDay;
      }))
    );
    this.currentBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const tempArrayDay = new Date(day.date);
        return +tempCurrent == +tempArrayDay;
      }))
    );
    this.nextBirthdays = this.birthdays.pipe(
      map(items => items.filter((day) => {
        const tempArrayDay = new Date(day.date);
        return tempCurrent < tempArrayDay;
      }))
    );
  }
  reloadData() {
    this.birthdays = this.birthdayService.getBirthdaysList();
  }
  birthdays: Observable<Birthday[]>
  pastBirthdays: Observable<Birthday[]>
  currentBirthdays: Observable<Birthday[]>
  nextBirthdays: Observable<Birthday[]>
}
