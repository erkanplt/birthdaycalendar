
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BirthdayService {
  private baseUrl = 'http://localhost:8080/birthdays';

  constructor(private http: HttpClient) {}

  getBirthdaysList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createBirthday(birthday: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, birthday);
  }

  deleteBirthday(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  updateBirthday(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getBirthday(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
