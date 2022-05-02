import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = "https://localhost:44345/api/Categories";

  constructor(
    private http: HttpClient
  ) { }

  public list(): Observable<Category[]> {
    const listUrl = `${this.categoriesUrl}`;
    return this.http.get<Category[]>(listUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getByCategoryId(brandId: number): Observable<Category> {
    const getUrl = `${this.categoriesUrl}/${brandId}`;
    return this.http.get<Category>(getUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  public edit(categoryId: number, category: Category): Observable<Category> {
    const updateUrl = `${this.categoriesUrl}/${categoryId}`;
    return this.http.put<Category>(updateUrl, category)
      .pipe(
        catchError(this.handleError)
      );
  }
  public insert(category: Category): Observable<Category> {
    const insertUrl = `${this.categoriesUrl}`;
    return this.http.post<Category>(insertUrl, category)
      .pipe(
        catchError(this.handleError)
      );
  }
  public delete(categoryId: number): Observable<Category> {
    const deleteUrl = `${this.categoriesUrl}/${categoryId}`;
    return this.http.delete<Category>(deleteUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => errMessage);
    }
    return throwError(() => error || 'Server error');
  }

}
