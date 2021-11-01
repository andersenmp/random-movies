<template>
  <div>
    <v-bottom-navigation
      v-model="value"
      :background-color="color"
      dark
      grow
      absolute
    >
      <v-btn @click="fetchAllLocalBoxOffice()" class="mt-2">
        <span>Office Box</span>

        <v-icon>mdi-popcorn</v-icon>
      </v-btn>

      <v-btn @click="fetchAllLocalMovies()" class="mt-2">
        <span>Rated</span>

        <v-icon>mdi-filmstrip</v-icon>
      </v-btn>

      <v-btn @click="fetchAllLocalTv()" class="mt-2">
        <span>TV</span>

        <v-icon>mdi-television-classic</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// @ is an alias to /src
export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    ...mapActions([
      "fetchLocalTv",
      "fetchLocalMovies",
      "fetchBoxOffice",
      "toggleView",
    ]),
    fetchAllLocalTv() {
      this.toggleView(false);
      this.fetchLocalTv();
    },
    fetchAllLocalMovies() {
      this.toggleView(false);
      this.fetchLocalMovies();
    },
    fetchAllLocalBoxOffice() {
      this.toggleView(false);
      this.fetchBoxOffice();
    },
  },

  computed: {
    ...mapGetters(["allMovies", "isPicked"]),
    color() {
      switch (this.value) {
        case 0:
          return "pink";
        case 1:
          return "indigo";
        case 2:
          return "purple";
        default:
          return "pink";
      }
    },
  },
};
</script>
