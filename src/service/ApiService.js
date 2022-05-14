export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '1aadd64706947cf630258d25324b3a9a';

  async getResource(query, page) {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false&region=US`
    );

    if (!res.ok) {
      throw new Error(res.status);
    }
    const result = await res.json();
    if (result.total_results === 0) {
      throw new Error('404');
    }
    return result;
  }

  async getAllMovies(query, page) {
    const res = await this.getResource(query, page);
    return res;
  }
}
