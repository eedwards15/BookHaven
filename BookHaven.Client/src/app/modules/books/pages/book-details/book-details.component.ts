import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { ViewBookComponent } from '../../shared/view-book/view-book.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    ViewBookComponent
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
    book: Book = {} as Book;

    constructor(private bookService: BookService, private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.bookService.getBookById(params['id']).subscribe(book => {
          this.book = book;
        });
      });
    }


    ngOnInit(): void {

    } 



}
