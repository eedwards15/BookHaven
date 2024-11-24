import { Routes } from '@angular/router';
import { SearchComponent } from './modules/search/pages/search/search.component';
import { AddBookComponent } from './modules/books/pages/add-book/add-book.component';
import { BookDetailsComponent } from './modules/books/pages/book-details/book-details.component';
import { EditBookDetailsComponent } from './modules/books/pages/edit-book-details/edit-book-details.component';

export const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'books/new',
        component: AddBookComponent
    },
    {
        path: 'books/:id',
        component: BookDetailsComponent
    },
    {
        path: 'books/:id/edit',
        component: EditBookDetailsComponent
    }
];
