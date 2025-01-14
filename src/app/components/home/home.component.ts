import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, filter } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchedBooks : any;
  private subscription: Subscription | undefined;

  searchFor : any
  isSearched = false;
  resultFound = 0

  tempValueAuth = ""
  tempValueBook = ""

  searchText = ""

  // For Auth Search 
  searchAuth(val:string){
    this.tempValueBook = ""
    this.searchFor = "Author";
    this.searchText = val;
    console.log(this.searchText);
    this.isSearched = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.searchText = val
    this.bookSearch = new FormControl('');
    this.subscription = this.subjectsService.getSeachAuth(this.searchText).subscribe((bdata) => {
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
      this.resultFound = this.searchedBooks.numFound;
    });
  }

  // For Book Search 
  searchBook(val:string){
    this.tempValueAuth = ""
    this.searchFor = "Book";
    this.isSearched = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.searchText = val
    this.bookSearch = new FormControl('');
    this.subscription = this.subjectsService.getSeachBooks(this.searchText).subscribe((bdata) => {
      // console.log(bdata)
      // console.log(typeof(bdata))
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
      this.resultFound = this.searchedBooks.numFound;
    });
  }



  constructor(
    private subjectsService: SubjectsService
  ) {
    this.bookSearch = new FormControl('');
    this.subjectsService.getSeachBooks(this.searchText).subscribe((bdata) => {
      // console.log(bdata)
      // console.log(typeof(bdata))
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
    });
    
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
    this.bookSearch = new FormControl('');
    this.subjectsService.getSeachBooks(this.searchText).subscribe((bdata) => {

      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
    });
    
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      });
  }

  POST : any;
  page : number = 1;
  count : number = 0;
  tableSize : number = 10;
  tableSizes : any = [5,10,15,20]

  onTableDataChange(event: any){
    this.page = event;
    this.bookSearch = new FormControl('');
    this.subjectsService.getSeachBooks(this.searchText).subscribe((bdata) => {
      // console.log(bdata)
      // console.log(typeof(bdata))
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
    });
  }

  onTableSizeChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.bookSearch = new FormControl('');
    this.subjectsService.getSeachBooks(this.searchText).subscribe((bdata) => {
      // console.log(bdata)
      // console.log(typeof(bdata))
      this.searchedBooks = bdata;
      console.log(this.searchedBooks)
    });
  }
}
