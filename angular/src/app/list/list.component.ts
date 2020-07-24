import { Observable } from 'rxjs';
import { BirthdayService } from './../service/birthday.service';
import { Birthday } from '../birthday/birthday'
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
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
  birthdays: Observable<Birthday[]>
  pastBirthdays: Observable<Birthday[]>
  currentBirthdays: Observable<Birthday[]>
  nextBirthdays: Observable<Birthday[]>
  currentDate = new Date();
  formatCurrentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  constructor(
    private birthdayService: BirthdayService,
    private router: Router,
    private modalService: NgbModal
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
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
    this.birthdayService.createBirthday(this.birthday).subscribe(
      (data) => { },
      (error) => console.log(error)
    );
    this.birthday = new Birthday();
  }

  newProduct(): void {
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
}
