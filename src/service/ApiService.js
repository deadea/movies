export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '1aadd64706947cf630258d25324b3a9a';

  async getResource(query) {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&query=${query}&page=1&include_adult=false&region=US`
    );

    if (!res.ok) {
      throw new Error(`No fetch, status: ${res.status}`);
    }

    return await res.json();
  }

  async getAllMovies() {
    const res = await this.getResource('return');
    return res.results;
  }
}
