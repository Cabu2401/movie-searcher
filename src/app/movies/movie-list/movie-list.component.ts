import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ItemObj } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  movies: ItemObj[];
  totalResults = 0;
  errorMsg = null;
  noResults = false;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.movies = this.moviesService.fetchMovies();
    this.totalResults = this.moviesService.totalResults;
  }

  onSearchMovies(strQuery: string) {
    this.noResults = false;
    this.moviesService.getMovies(strQuery).subscribe((moviesArr) => {
      this.movies = moviesArr;
      this.totalResults = this.moviesService.totalResults;
      if (this.totalResults === 0) {
        this.noResults = true;
        this.searchInput.nativeElement.value = '';
      }
    },(error: Error) => {
      this.errorMsg = error.message;
    });
  }

  onChangePage() {
    this.onSearchMovies(this.moviesService.lastStrQuery);
    window.scroll(0,0);
  }

  onKey(event: any){
    if (event.key === "Enter" && event.target.value !== ''){
      this.onSearchMovies(event.target.value);
    }
  }

}
