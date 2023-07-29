import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/Book.model';
import { CatalogService } from '../catalog.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit{
  formBook = new FormGroup({
    image: new FormControl<string>(null),
    title: new FormControl<string>(null,  Validators.required),
    summary: new FormControl<string>(null),
    publication_date: new FormControl<string>(null),
    publishing_company:new FormControl<string>(null),
    authors: new FormControl<string[]>(null),
    genres: new FormControl<string[]>(null),
    rating: new FormControl<number>(null),
    like: new FormControl<boolean>(null),
    review: new FormControl<string>(null),
  });

  bookId: number;
  editMode = false;
  canExit = false;

  serviceSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private service: CatalogService,
    private toastService: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.verifyRoute();
  }

  verifyRoute(): void {
    const bookId = this.route.snapshot.params['id'];
    if (bookId != null) {
      this.editMode = true;
      this.bookId = bookId;
      this.getBookById();
    }
  }

  getBookById(): void {
    this.serviceSub = this.service.getBookById(this.bookId).subscribe((resp) => {
      this.fillForm(resp);
    });
  }

  fillForm(book: Book): void {
    console.log(book)
    this.formBook.patchValue({ ...book });
  }

  createBook(): void {
    this.serviceSub = this.service
      .postBook(this.formBook.getRawValue())
      .subscribe({
        next: (resp: Book) => {
          this.redirectAndShowToast();
        },
        error: (error: HttpErrorResponse) => {
          this.showError();
        },
      });
  }

  updateBook(): void {
    this.serviceSub = this.service
      .putBook(this.bookId, this.formBook.getRawValue())
      .subscribe({
        next: (resp) => {
          this.redirectAndShowToast(resp.title);
        },
        error: (error: HttpErrorResponse) => {
          this.showError();
        },
      });
  }

  showError(): void {
    this.toastService.error('Error!', 'It was not possible to update de book!');
  }

  redirectAndShowToast(name?: string): void {
    let message = 'Book registered.';

    if (name) {
      message = `Book ${name} updated!`;
    }

    this.router.navigate(['/books/catalog']).then((value) => {
      if (value) {
        this.toastService.success('Success!', message);
      }
    });
  }

  back(): void {
    this.router.navigate(['/books/catalog'], { queryParamsHandling: 'preserve' });
  }


}
