import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../books/models/book';
import { ViewBookComponent } from '../../../books/shared/view-book/view-book.component';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  standalone: true, 
  imports: [FormsModule, ViewBookComponent, CommonModule],
  providers: [BookService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public searchTerm: string = '';
  public books: Book[] = [];

  constructor(private bookService: BookService) { 
    this.bookService.getBooks(1, 10).subscribe((books) => {
      this.books = books;
    });
  }


  public search() {
    this.bookService.getBooksByTitle(this.searchTerm).subscribe((books) => {
      this.books = books;
    });
  }
}
