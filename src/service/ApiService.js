export default class ApiService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '1aadd64706947cf630258d25324b3a9a';

  async getResource(query, page) {
    const res = await fetch(
      `${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false&region=US`
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

  async getGuestSessionId() {
    const res = await fetch(`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const result = await res.json();
    if (result.success) {
      return result.guest_session_id;
    } else {
      throw new Error('401');
    }
  }

  async getGuestRated(sessionId, page) {
    const res = await fetch(
      `${this._apiBase}guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const result = await res.json();
    return result;
  }

  async rateMovie(movieId, sessionId, rating) {
    const res = await fetch(
      `${this._apiBase}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: rating }),
      }
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const result = await res.json();
    return result;
  }

  async getGenres() {
    const res = await fetch(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const result = await res.json();
    return result;
  }
}
