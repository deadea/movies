class ApiService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = process.env.REACT_APP_KEY;

  async getAllMovies(query, page) {
    const res = await fetch(
      `${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false&region=US`
    );
    const result = await res.json();
    return result;
  }

  async getGuestSessionId() {
    const res = await fetch(`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`);
    const result = await res.json();
    return result;
  }

  async getGuestRated(sessionId, page) {
    const res = await fetch(
      `${this._apiBase}guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
    );
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
    const result = await res.json();
    return result;
  }

  async getGenres() {
    const res = await fetch(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    const result = await res.json();
    return result;
  }
}

const apiService = new ApiService();
export default apiService;
