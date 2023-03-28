import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { map } from 'rxjs/operators'
import { ApiResponseObj, ItemObj, Movie, Person } from "./movie.model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class MoviesService {
  private movies: ItemObj[] = [];
  totalResults: number = 0;
  lastStrQuery: string = '';
  page: number = 1;

  constructor(private htpp: HttpClient) {}

  getMovie(movieId: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', environment.tmdbApiKey);
    searchParams = searchParams.append('append_to_response', 'credits');

    // Send Http request
    return this.htpp
      .get<Movie>(
        environment.tmdbApiURL + 'movie/' + movieId,
        { params: searchParams }
      );
  }

  getPerson(personId: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', environment.tmdbApiKey);

    // Send Http request
    return this.htpp
      .get<Person>(
        environment.tmdbApiURL + 'person/' + personId,
        { params: searchParams }
      );
  }

  fetchMovies() {
    return this.movies.slice();
  }

  getMovies(queryStr: string) {
    if (this.lastStrQuery !== queryStr) {
      this.lastStrQuery = queryStr;
      this.page = 1;
    }
    this.movies = [];
    let searchParams = new HttpParams();
    searchParams = searchParams.append('api_key', environment.tmdbApiKey);
    searchParams = searchParams.append('query', queryStr);
    searchParams = searchParams.append('page', this.page.toString());

    // Send Http request
    return this.htpp
      .get<ApiResponseObj>(
        environment.tmdbApiURL + 'search/multi',
        { params: searchParams }
      ).pipe(map(responseData => {
        for (const item of responseData.results) {
          if (item.media_type === 'movie' && this.movies.filter((i) => i.id === item.id).length === 0) {
            this.movies.push(item);
          }
          if (item.media_type === 'person') {
            if (item.known_for !== null) {
              for (const sItem of item.known_for) {
                if (sItem.media_type === 'movie' && this.movies.filter((i) => i.id === sItem.id).length === 0) {
                  this.movies.push(sItem);
                }
              }
            }
          }
        }
        this.totalResults = responseData.total_results;

        return this.movies.slice();
      }));
  }
}
