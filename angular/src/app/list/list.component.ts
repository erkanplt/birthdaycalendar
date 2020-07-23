import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  constructor() {
  }

  ngOnInit(): void {
    const tempCurrent=new Date(this.formatCurrentDate);
    this.pastBirthdays=this.birthdays.filter((day)=>{
      const tempArrayDay=new Date(day.date);
      return tempCurrent>tempArrayDay;
    });
    this.currentBirthdays=this.birthdays.filter((day)=>{
      const tempArrayDay=new Date(day.date);
      return +tempCurrent==+tempArrayDay;
    });
    this.nextBirthdays=this.birthdays.filter((day)=>{
      const tempArrayDay=new Date(day.date);
      return tempCurrent<tempArrayDay;
    });
  }
  
  birthdays: any[] = [
    { title: 'Büşra Aydın', date: '2020-06-27' },
    { title: 'Ali Orhan', date: '2020-07-30' },
    { title: 'Deniz Kartal', date: '2020-07-23' }
  ]
  pastBirthdays:any[]
  currentBirthdays:any[]
  nextBirthdays:any[]
}
