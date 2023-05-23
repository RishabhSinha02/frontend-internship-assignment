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


 

  // for getting book search data 
  getSeachBooks(searchText : string): Observable<BookResponse> {
    return this.apiService.get(`/search.json?title=${searchText}`);
  }

  // for getting author search data 
  getSeachAuth(searchAuthText : string): Observable<BookResponse> {
    return this.apiService.get(`/search.json?author=${searchAuthText}&sort=new`);
  }
}
