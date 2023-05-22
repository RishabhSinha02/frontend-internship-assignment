import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchedBooks : any;

  constructor(
    private subjectsService: SubjectsService
  ) {
    this.bookSearch = new FormControl('');
    this.subjectsService.getSeachBooks().subscribe((bdata) => {
      // console.log(bdata)
      // console.log(typeof(bdata))
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
    });
  }

  searchText = ""
  searchBook(val:string){
    console.log(val)
    this.searchText = val
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];
  getNumbers(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      });
  }
}
