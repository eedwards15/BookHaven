import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {

  @Input() book: Book = {} as Book;

  bookForm: FormGroup = new FormGroup({});


  constructor(private bookService: BookService, private fb: FormBuilder) {

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['book'] && changes['book'].currentValue) {
      this.bookForm = this.fb.group({
        title: [this.book.title || '', [Validators.required, Validators.maxLength(100)]],
        author: [this.book.author || '', [Validators.required, Validators.maxLength(100)]],
        description: [this.book.description || '', [Validators.required, Validators.maxLength(500)]],
        genre: [this.book.genre || '', [Validators.required]]
      });
    }
  }

  ngOnInit() {

  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.bookForm.get(controlName);
    return control?.errors?.[errorName] && control?.touched || false;
  }

  onSubmit() {
      if (this.bookForm.valid) {
          this.book.title = this.bookForm.value.title;
          this.book.author = this.bookForm.value.author;
          this.book.description = this.bookForm.value.description;
          this.book.genre = this.bookForm.value.genre;

          this.bookService.updateBook(this.book.id, this.book).subscribe((book) => {
              console.log(book);
          });
      }
  }

}
