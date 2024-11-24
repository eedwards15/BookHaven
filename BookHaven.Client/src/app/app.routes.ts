import { Routes } from '@angular/router';
import { SearchComponent } from './modules/search/pages/search/search.component';
import { AddBookComponent } from './modules/books/pages/add-book/add-book.component';

export const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'books/new',
        component: AddBookComponent
    }
];