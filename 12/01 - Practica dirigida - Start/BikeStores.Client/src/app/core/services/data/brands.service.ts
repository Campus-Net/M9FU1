import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand } from '../../../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private brandsUrl = "https://localhost:44345/api/Brands";

  constructor(
    private http: HttpClient
  ) { }

  public list(): Observable<Brand[]> {
    const listUrl = `${this.brandsUrl}`;
    return this.http.get<Brand[]>(listUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getByBrandId(brandId: number): Observable<Brand> {
    const getUrl = `${this.brandsUrl}/${brandId}`;
    return this.http.get<Brand>(getUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  public edit(brandId: number, brand: Brand): Observable<Brand> {
    const updateUrl = `${this.brandsUrl}/${brandId}`;
    return this.http.put<Brand>(updateUrl, brand)
      .pipe(
        catchError(this.handleError)
      );
  }
  public insert(brand: Brand): Observable<Brand> {
    const insertUrl = `${this.brandsUrl}`;
    return this.http.post<Brand>(insertUrl, brand)
      .pipe(
        catchError(this.handleError)
      );
  }
  public delete(brandId: number): Observable<Brand> {
    const deleteUrl = `${this.brandsUrl}/${brandId}`;
    return this.http.delete<Brand>(deleteUrl)
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
