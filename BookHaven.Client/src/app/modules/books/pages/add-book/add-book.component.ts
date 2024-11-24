import { Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../models/book';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [BookService],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {

    bookForm: FormGroup = new FormGroup({});
    book: Book = {
        id: 0,
        title: '',
        genre: '',
        author: '',
        description: ''
    };

    constructor(private bookService: BookService, private fb: FormBuilder) {
        this.bookForm = this.fb.group({
          title: ['', [Validators.required, Validators.maxLength(100)]],
          author: ['', [Validators.required, Validators.maxLength(100)]],
          description: ['', [Validators.required, Validators.maxLength(500)]],
          genre: ['', [Validators.required]],
          coverImage: ['']
        });
    }

    ngOnInit() {}

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

            this.bookService.addBook(this.book).subscribe((book) => {
                console.log(book);
            });
        }
    }



}
