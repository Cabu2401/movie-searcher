import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../movie.model';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  @Input() movieId: number;
  imgBaseUrl = environment.imgBaseUrl;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  onGoToMovieDetails() {
    this.router.navigate([this.movieId], {relativeTo: this.route});
  }

}
