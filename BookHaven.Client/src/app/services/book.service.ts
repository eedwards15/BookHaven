import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../modules/books/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5065/api/Book'; // Adjust port as needed

  constructor(private http: HttpClient) { }


  // Get all books
  getBooks(page: number, count: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${page}/${count}`);
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${title}`);
  }


  
}
