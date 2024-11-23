import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../books/models/book';
import { ViewBookComponent } from '../../../books/shared/view-book/view-book.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search',
  standalone: true, 
  imports: [FormsModule, ViewBookComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public searchTerm: string = '';
  public books: Book[] = [];


  private testbook: Book = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    genre: 'Classic Fiction'
  } as Book;

  public search() {
    console.log(this.searchTerm);
    this.books = [this.testbook];
    // TODO: call the search api

  }
}
