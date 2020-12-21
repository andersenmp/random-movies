import axios from 'axios';
import localMovies from "./localMovies.json"
import localTv from "./localTv.json"

const api_key = process.env.VUE_APP_API_KEY_TMDB;
const api_baseUrl = 'https://api.themoviedb.org/3';


const state = {
  movies: [],
  showPick: false,
};

const getters = {
  allMovies: state => state.movies,
  isPicked: state => state.showPick,
};

const actions = {

  async fetchLocalMovies({ commit }) {

   commit('setLocalMovies', localMovies);
    
  },

  async fetchLocalTv({ commit }) {

    commit('setLocalMovies', localTv);
     
   },

  async fetchTopRatedMovies({ commit }) {

    let responseConsolidation = [];
    let page = 0;
    let totalPages = 10;
    do {
        let response = await axios.get(
        `${api_baseUrl}/movie/top_rated?api_key=${api_key}&page=${++page}`
        );
       // totalPages = response.data.total_pages;
        responseConsolidation.push(...response.data.results);
    } while (page < totalPages)

    commit('setMovies', responseConsolidation);
    
  },
  async fetchPopularMovies({ commit }) {
    let responseConsolidation = [];
    let page = 0;
    let totalPages = 10;
    do {
        let response = await axios.get(
        `${api_baseUrl}/movie/popular?api_key=${api_key}&page=${++page}`
        );
       // totalPages = response.data.total_pages;
        responseConsolidation.push(...response.data.results);
    } while (page < totalPages)

    commit('setMovies', responseConsolidation);
  },

  toggleView({ commit }, toShow) {
    commit('togglePick', toShow);
  }

};

const mutations = {
    setMovies: (state, movies) => {
        state.movies = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            image: "https://image.tmdb.org/t/p/original" + movie.backdrop_path,
            overview: movie.overview,
            show: false,
            selected: false
        }));
    },
    setLocalMovies: (state, movies) => {
      state.movies = movies.map(movie => ({
          id: movie.id,
          title: movie.id + "." +  movie.title,
          original_title: "Rate:" + movie.rate,
          image:  movie.image,
          overview: "Year:" + movie.year,
          show: false,
          selected: false
      }));
  },
    togglePick: (state, pick) => state.showPick = pick,
};

export default {
  state,
  getters,
  actions,
  mutations
};