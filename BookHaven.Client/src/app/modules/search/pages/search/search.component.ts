import { Component, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../books/models/book';
import { ViewBookComponent } from '../../../books/shared/view-book/view-book.component';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../../services/book.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  constructor(private bookService: BookService, private sanitizer: DomSanitizer, private router: Router) { 
    this.bookService.getBooks(1, 10).subscribe((books) => {
      this.books = books;
    });
  }


  public search() {
    let sanitizedSearchTerm = this.cleanText(this.searchTerm);
    this.bookService.getBooksByTitle(sanitizedSearchTerm).subscribe((books) => {
      this.books = books;
    });
  }


  cleanText(input: string): string {
    // Sanitize input to remove potentially dangerous HTML
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML , input) || '';
    return sanitized;
  }

  navigateToAddBook() {
    this.router.navigate(['/books/new']);
  }

  navigateToBookDetails(id: number) {
    this.router.navigate([`/books/${id}`]);
  }

}
