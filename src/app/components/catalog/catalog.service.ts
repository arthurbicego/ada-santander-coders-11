import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book.model';
import { BookParams } from 'src/app/models/BookParams.model';


@Injectable({
  providedIn: 'root'
})

export class CatalogService {
  private _url = 'http://localhost:3000/books';

  constructor(private _http: HttpClient) {}

  getBooks(searchValue: string): Observable<Book[]> {
    let httpParams = new HttpParams({ fromObject: { catalog: searchValue } });

    return this._http.get<Book[]>(`${this._url}`, { params: httpParams });
  }

  postBook(book: Book): Observable<Book> {
    return this._http.post<Book>(this._url, book);
  }

  getBookById(id: number): Observable<Book> {
    return this._http.get<Book>(`${this._url}/${id}`);
  }

  putBook(id: number, book: Book): Observable<Book> {
    return this._http.put<Book>(`${this._url}/${id}`, book);
  }

  deleteBook(id: number) {
    return this._http.delete<void>(`${this._url}/${id}`);
  }

  patchBook() {}
}
