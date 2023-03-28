import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  providers: [NgbRatingConfig]
})
export class MovieDetailComponent implements OnInit {
  movieData: Movie;
  movieId: number;
  isFetching = false;
  errorMsg = null;
  imgBaseUrl = environment.imgBaseUrl;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService, private configNgbRating: NgbRatingConfig ) {
    this.configNgbRating.max = 10;
    this.configNgbRating.readonly = true;
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.movieId = +params['id'];
        this.moviesService.getMovie(this.movieId).subscribe(resData => {
          this.isFetching = false;
          this.movieData = resData;
        }, (error: Error) => {
          this.isFetching = false;
          this.errorMsg = error.name;
        });
      }
    );
  }

  onGoToPersonDetails(personId: number) {
    this.router.navigate(['person', personId]);
  }

}
