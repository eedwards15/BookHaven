import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

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


  constructor() {
    this.book = {} as Book;
  }

  ngOnInit(): void {
    
  }

}
