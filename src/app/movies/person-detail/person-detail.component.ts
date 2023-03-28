import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Person } from '../movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css'],
  providers: [NgbRatingConfig]
})
export class PersonDetailComponent implements OnInit {
  personData: Person;
  personId: number;
  isFetching = false;
  errorMsg = null;
  imgBaseUrl = environment.imgBaseUrl;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private configNgbRating: NgbRatingConfig ) {
    this.configNgbRating.max = 10;
    this.configNgbRating.readonly = true;
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.personId = +params['id'];
        this.moviesService.getPerson(this.personId).subscribe(resData => {
          this.isFetching = false;
          this.personData = resData;
        }, (error: Error) => {
          this.isFetching = false;
          this.errorMsg = error.name;
        });
      }
    );
  }

}
