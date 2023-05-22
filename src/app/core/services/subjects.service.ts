import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}
  

  // For gettign books data 
  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit = 10;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }


 
  searchdata = "the+lord+of+the+rings";
  searchurl = "/search.json?title="+this.searchdata;
  // for getting search data 
  getSeachBooks(): Observable<BookResponse> {
    return this.apiService.get(this.searchurl);
  }
}
