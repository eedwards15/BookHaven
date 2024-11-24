import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.scss'
})
export class ViewBookComponent implements OnInit {

  @Input() book: Book;


  constructor(private router: Router) {
    this.book = {} as Book;
  }

  ngOnInit(): void {
    
  }

  navigateToEditBook() {
    this.router.navigate([`/books/${this.book.id}/edit`]);
  }

}
