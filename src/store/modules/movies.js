import axios from "axios";
import localMovies from "./localMovies.json";
import localTv from "./localTv.json";


const api_key = process.env.VUE_APP_API_KEY_TMDB;
const api_baseUrl = "https://api.themoviedb.org/3";

const state = {
  movies: [],
  selectedMovies: [],
  showPick: false,
};

const getters = {
  allMovies: (state) => state.movies,
  isPicked: (state) => state.showPick,
  selectedMovies: (state) => state.selectedMovies,
};

const actions = {
  async fetchLocalMovies({ commit })
  {
    commit("setLocalMovies", localMovies);
  },

  async fetchLocalTv({ commit })
  {
    commit("setLocalTv", localTv);
  },

  async fetchBoxOffice({ commit })
  {
    let localBoxOffice = localMovies.concat(localTv);
    commit("setLocalBoxOffice", localBoxOffice);
  },

  async fetchTopRatedMovies({ commit })
  {
    let responseConsolidation = [];
    let page = 0;
    let totalPages = 10;
    do {
      let response = await axios.get(
        `${api_baseUrl}/movie/top_rated?api_key=${api_key}&page=${++page}`
      );
      // totalPages = response.data.total_pages;
      responseConsolidation.push(...response.data.results);
    } while (page < totalPages);

    commit("setMovies", responseConsolidation);
  },
  async fetchPopularMovies({ commit })
  {
    let responseConsolidation = [];
    let page = 0;
    let totalPages = 10;
    do {
      let response = await axios.get(
        `${api_baseUrl}/movie/popular?api_key=${api_key}&page=${++page}`
      );
      // totalPages = response.data.total_pages;
      responseConsolidation.push(...response.data.results);
    } while (page < totalPages);

    commit("setMovies", responseConsolidation);
  },

  toggleView({ commit }, toShow)
  {
    commit("togglePick", toShow);
  },

  selectMovie({ commit }, index)
  {
    commit("setMoviesList", index);
  },

};

const mutations = {
  setMovies: (state, movies) =>
  {
    state.movies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      image: "https://image.tmdb.org/t/p/original" + movie.backdrop_path,
      overview: movie.overview,
      show: false,
      selected: false,
    }));
    state.selectedMovies = [];
  },

  setLocalBoxOffice: (state, movies) =>
  {
    state.movies = movies.map((movie, index) => ({
      id: index,
      title: movie.id + "." + movie.title,
      original_title: "Rate:" + movie.rate,
      image: movie.image,
      overview: "Year:" + movie.year,
      show: false,
      selected: false,
    }));
    state.selectedMovies = [];
  },

  setLocalMovies: (state, movies) =>
  {
    state.movies = movies.map((movie) => ({
      id: movie.id,
      title: movie.id + "." + movie.title,
      original_title: "Rate:" + movie.rate + " | Year: " + movie.year,
      image: movie.image,
      overview: movie.overview,
      show: false,
      selected: false,
    }));
    state.selectedMovies = [];
  },
  setLocalTv: (state, movies) =>
  {
    state.movies = movies.map((movie) => ({
      id: movie.id,
      title: movie.id + "." + movie.title,
      original_title: "Rate:" + movie.rate,
      image: movie.image,
      overview: "Year:" + movie.year,
      show: false,
      selected: false,
    }));
    state.selectedMovies = [];
  },

  setMoviesList: (state, index) =>
  {
    state.selectedMovies.push(state.movies[index - 1]);
    state.movies = state.movies.filter(function (e)
    {
      return e.id != index - 1;
    });
  },
  togglePick: (state, pick) => (state.showPick = pick),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
