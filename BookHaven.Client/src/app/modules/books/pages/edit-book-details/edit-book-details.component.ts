import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { EditBookComponent } from '../../shared/edit-book/edit-book.component';

@Component({
  selector: 'app-edit-book-details',
  standalone: true,
  imports: [
    EditBookComponent 
  ],
  templateUrl: './edit-book-details.component.html',
  styleUrl: './edit-book-details.component.scss'
})
export class EditBookDetailsComponent implements OnInit {

  selectedBook: Book = {} as Book;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.bookService.getBookById(params['id']).subscribe(book => {
        console.log("book", book);
        this.selectedBook = book;
      });
    });


  } 

}
