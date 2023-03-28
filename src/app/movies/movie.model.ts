
export interface Movie {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  original_language: string,
  status: string,
  vote_average: number,
  budget: number,
  revenue: number,
  genres: Genre[],
  credits: Credits []
}

export interface Person {
  id: number,
  name: string,
  gender: number,
  biography: string,
  birthday: string,
  deathday: string,
  place_of_birth: string,
  popularity: number,
  known_for_department: string,
  also_known_as: string[],
  profile_path: string
}

export interface Cast {
  id: number,
  name: string,
  character: string,
  profile_path: string
}

export interface Crew {
  id: number,
  name: string,
  job: string,
  profile_path: string
}

export interface Credits {
  cast: Cast[],
  crew: Crew[]
}

export interface Genre {
  id: number,
  name: string
}

export interface ApiResponseObj {
  page: number,
  results: ItemObj[],
  total_pages: number,
  total_results: number
}

export interface ItemObj {
  id: number,
  original_name: string,
  overview: string,
  poster_path: string,
  known_for: ItemObj[],
  media_type: string
}
