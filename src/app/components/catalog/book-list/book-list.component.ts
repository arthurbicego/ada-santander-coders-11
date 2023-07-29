import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, filter, take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/Book.model';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'id',
    'image',
    'title',
    'summary',
    'publication_date',
    'publishing_company',
    'authors',
    'genres',
    'rating',
    'like',
    'review',
  ];

  dataSource: Book[] = [];

  serviceSub = new Subscription();

  searchControl = new FormControl<string>('');

  subject = new Subject<string>();

  constructor(
    private service: CatalogService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.setConfigSubject();
    this.getSearchQueryParams();

    this.searchControl.valueChanges
      .pipe(debounceTime(1000), take(1))
      .subscribe((value) => {
        this.searchControl.markAsTouched();
      });
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }
  
  searchBooks(searchValue: string): void {
    this.subject.next(searchValue);
  }

  getBooks(searchValue: string = ''): void {
    this.serviceSub = this.service.getBooks(searchValue).subscribe((resp) => {
      this.dataSource = resp;
    });
    console.log(this.dataSource);
    
  }

  setConfigSubject(): void {
    this.subject
      .pipe(
        debounceTime(1000),
        filter((value) => value.length >= 3 || value == '')
      )
      .subscribe((searchValue: string) => {
        this.getBooks(searchValue);
      });
  }

  deleteBook(id: number): void {
    this.service
      .deleteBook(id)
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.success('Success!', 'Book removed');
        this.getBooks(this.searchControl.value);
      });
  }

  getSearchQueryParams(): void {
    let searchValue: string = this.route.snapshot.queryParams['catalog'];
    this.searchControl.setValue(searchValue);
    this.getBooks(searchValue);
  }
}
